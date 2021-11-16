import React, { useState, useEffect } from "react";
import swapIcon from "@svgs/swap.svg";
import clearIcon from "@svgs/clear.svg";
import copyIcon from "@svgs/copy.svg";
import stopIcon from "@svgs/stop.svg";
import microphoneIcon from "@svgs/microphone.svg";
import { useLazyTranslate } from "react-google-translate";
import "./index.scss";
import TextareaAutosize from 'react-autosize-textarea';
import { setConfig } from "react-google-translate";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

setConfig({
  clientEmail: process.env.REACT_APP_GCP_CLIENT_EMAIL,
  privateKey: process.env.REACT_APP_GCP_PRIVATE_KEY,
  projectId: process.env.REACT_APP_GCP_PROJECT_ID,
});

const TranslationArea = () => {
  const [activeSourceLanguageId, setActiveSourceLanguageId] =
    useState("english");
  const [activeTargetLanguageId, setActiveTargetLanguageId] =
    useState("turkish");

  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");

  const [isMicrophoneAccepted, setIsMicrophoneAccepted] = useState(false);

  const LANGUAGES = [
    {
      text: "ENGLISH",
      id: "english",
      iso: "en",
    },
    {
      text: "TURKISH",
      id: "turkish",
      iso: "tr",
    },
  ];

  const sourceLanguageCode = LANGUAGES.find(
    (lang) => lang.id === activeSourceLanguageId
  ).iso;
  const targetLanguageCode = LANGUAGES.find(
    (lang) => lang.id === activeTargetLanguageId
  ).iso;

  const [translate, { data, loading }] = useLazyTranslate({
    language: sourceLanguageCode,
  });

  const handleSourceLanguageClick = (id) => {
    setActiveSourceLanguageId(id);
    const targetLanguageId = LANGUAGES.find((lang) => lang.id !== id).id;
    setActiveTargetLanguageId(targetLanguageId);
  };

  const handleTargetLanguageClick = (id) => {
    setActiveTargetLanguageId(id);
    const sourceLanguageId = LANGUAGES.find((lang) => lang.id !== id).id;
    setActiveSourceLanguageId(sourceLanguageId);
  };

  const handleSourceTextChange = (text) => {
    setSourceText(text);
  };

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const handleMicrophoneClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      setSourceText("");
      startListening();
    }
  };

  const getSourceValue = () => {
    return sourceText || (listening && "Speak now") || "";
  };

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  useEffect(() => {
    if (listening) setSourceText(transcript);
    translate(sourceText, targetLanguageCode);
    if (data.length > 0) {
      setTargetText(data);
    } else {
      setTargetText("");
    }
  }, [
    sourceText,
    data,
    activeSourceLanguageId,
    activeTargetLanguageId,
    transcript,
  ]);

  return (
    <div className="container">
      <div className="translation-area">
        <div className="tabs b-b-1 bc-alto">
          <div className="tabs__source-languages">
            {LANGUAGES.map((language, index) => {
              const isActive = activeSourceLanguageId === language.id;
              return (
                <p
                  className={`language-title p-l-4 p-r-4 p-t-2 cursor-pointer ${
                    isActive ? "b-b-2 bc-fun-blue color-fun-blue" : ""
                  }`}
                  key={`${language.id}-${index}`}
                  onClick={() => handleSourceLanguageClick(language.id)}
                >
                  {language.text}
                </p>
              );
            })}
          </div>

          <div className="tabs__target-languages">
            <img src={swapIcon} height="40px" width="40px" />
            <div className="disp-flex p-l-5">
              {LANGUAGES.reverse().map((language, index) => {
                const isActive = activeTargetLanguageId === language.id;
                return (
                  <p
                    className={`language-title p-l-4 p-r-4 p-t-2 cursor-pointer ${
                      isActive ? "b-b-2 bc-fun-blue color-fun-blue" : ""
                    }`}
                    key={`${language.id}-${index}`}
                    onClick={() => handleTargetLanguageClick(language.id)}
                  >
                    {language.text}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="disp-flex" style={{ minHeight: "225px" }}>
          <div
            className="w-50-p b-r-1 bc-alto disp-flex"
            style={{ alignItems: "baseline" }}
          >
            <TextareaAutosize
              className={`text-area w-100-p ${
                listening && !sourceText ? "color-shuttle-gray" : ""
              }`}
              value={getSourceValue()}
              rows={5}
              readOnly={listening}
              onChange={(e) => handleSourceTextChange(e.target.value)}
            />
            {sourceText && !listening && (
              <div
                className="clear-icon p-r-2 cursor-pointer"
                onClick={() => {
                  setSourceText("");
                  setTargetText("");
                }}
              >
                <img src={clearIcon} />
              </div>
            )}
          </div>
          <div className={`w-50-p ${targetText ? "bg-wild-sand" : ""}`}>
            <TextareaAutosize
              className={`text-area w-100-p ${
                targetText ? "" : "color-shuttle-gray"
              }`}
              value={targetText || "Translation"}
              rows={5}
              readOnly
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>
        </div>
        <div className="disp-flex">
          <div
            className="p-2 w-50-p b-r-1 bc-alto cursor-pointer"
            onClick={handleMicrophoneClick}
          >
            <img src={listening ? stopIcon : microphoneIcon} />
          </div>
          {targetText && (
            <div
              className={` ${
                targetText ? "bg-wild-sand" : ""
              } p-2 w-50-p b-r-1 bc-alto cursor-pointer`}
              onClick={() => copyTextToClipboard(targetText)}
            >
              <img className="float-right" src={copyIcon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationArea;
