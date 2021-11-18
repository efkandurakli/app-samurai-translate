import React from "react";
import swapIcon from "@svgs/swap.svg";
import clearIcon from "@svgs/clear.svg";
import copyIcon from "@svgs/copy.svg";
import stopIcon from "@svgs/stop.svg";
import microphoneIcon from "@svgs/microphone.svg";
import TextareaAutosize from "react-autosize-textarea";
import { LANGUAGES } from "@utils/constants";
import { setGoogleTranslateConfig } from "@utils/helpers";

import "./index.scss";

setGoogleTranslateConfig();

const TranslationArea = ({
  sourceText,
  targetText,
  sourceLanguage,
  targetLanguage,
  isListening,
  onMicrophoneClick,
  onSourceLanguageClick,
  onTargetLanguageClick,
  onSourceTextChange,
  onClearIconClick,
}) => {
  const getSourceValue = () => {
    return sourceText || (isListening && "Speak now") || "";
  };

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  return (
    <div className="container">
      <div className="translation-area">
        <div className="tabs b-b-1 bc-alto">
          <div className="tabs__source-languages">
            {LANGUAGES.map((language, index) => {
              const isActive = sourceLanguage.id === language.id;
              return (
                <p
                  className={`language-title p-l-4 p-r-4 p-t-2 cursor-pointer ${
                    isActive ? "b-b-2 bc-fun-blue color-fun-blue" : ""
                  }`}
                  key={`${language.id}-${index}`}
                  onClick={() => onSourceLanguageClick(language)}
                >
                  {language.text}
                </p>
              );
            })}
          </div>

          <div className="tabs__target-languages">
            <img src={swapIcon} alt="swap icon" height="40px" width="40px" />
            <div className="disp-flex p-l-5">
              {LANGUAGES.reverse().map((language, index) => {
                const isActive = targetLanguage.id === language.id;
                return (
                  <p
                    className={`language-title p-l-4 p-r-4 p-t-2 cursor-pointer ${
                      isActive ? "b-b-2 bc-fun-blue color-fun-blue" : ""
                    }`}
                    key={`${language.id}-${index}`}
                    onClick={() => onTargetLanguageClick(language)}
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
                isListening && !sourceText ? "color-shuttle-gray" : ""
              }`}
              value={getSourceValue()}
              rows={5}
              readOnly={isListening}
              onChange={(e) => onSourceTextChange(e.target.value)}
            />
            {sourceText && !isListening && (
              <div
                className="clear-icon p-r-2 cursor-pointer"
                onClick={onClearIconClick}
              >
                <img src={clearIcon} alt="clear icon" />
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
            />
          </div>
        </div>
        <div className="disp-flex">
          <div
            className="p-2 w-50-p b-r-1 bc-alto cursor-pointer"
            onClick={onMicrophoneClick}
          >
            {sourceLanguage.id !== "turkish" && (
              <img
                src={isListening ? stopIcon : microphoneIcon}
                alt="microphone icon"
              />
            )}
          </div>
          {targetText && (
            <div
              className={` ${
                targetText ? "bg-wild-sand" : ""
              } p-2 w-50-p b-r-1 bc-alto cursor-pointer`}
              onClick={() => copyTextToClipboard(targetText)}
            >
              <img className="float-right" src={copyIcon} alt="copy icon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationArea;
