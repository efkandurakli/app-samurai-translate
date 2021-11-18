import React, { useEffect, useState } from "react";
import TranslationArea from "@components/TranslationArea";
import { useLazyTranslate } from "react-google-translate";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { LANGUAGES } from "@utils/constants";

const Body = () => {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");

  const [sourceLanguage, setSourceLanguage] = useState(LANGUAGES[0]);
  const [targetLanguage, setTargetLanguage] = useState(LANGUAGES[1]);

  const [translate, { data }] = useLazyTranslate({
    language: sourceLanguage.iso,
  });

  const handleMicrophoneClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
      resetTranscript();
    }
  };

  const handleSourceLanguageClick = (language) => {
    const trgtLang = LANGUAGES.find((lang) => lang.id !== language.id);
    setSourceLanguage(language);
    setTargetLanguage(trgtLang);
  };

  const handleTargetLanguageClick = (language) => {
    const srcLang = LANGUAGES.find((lang) => lang.id !== language.id);
    setTargetLanguage(language);
    setSourceLanguage(srcLang);
  };

  const handleSourceTextChange = (text) => {
    setSourceText(text);
  };

  const handleClearIconClick = () => {
    setSourceText("");
  };

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (sourceText) translate(sourceText, targetLanguage.iso);
    else setTargetText("");
  }, [sourceText]);

  useEffect(() => {
    if (data && sourceText) setTargetText(data);
    else setTargetText("");
  }, [data]);

  useEffect(() => {
    setSourceText(transcript);
  }, [transcript]);

  return (
    <div>
      <div className="h-100-px b-b-1 bc-alto bg-alabaster" />
      <TranslationArea
        sourceText={sourceText}
        targetText={targetText}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        isListening={listening}
        onMicrophoneClick={handleMicrophoneClick}
        onSourceLanguageClick={handleSourceLanguageClick}
        onTargetLanguageClick={handleTargetLanguageClick}
        onSourceTextChange={handleSourceTextChange}
        onClearIconClick={handleClearIconClick}
      />
    </div>
  );
};

export default Body;
