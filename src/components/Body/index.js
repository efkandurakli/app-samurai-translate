import React, { useEffect, useState, useCallback } from "react";
import TranslationArea from "@components/TranslationArea";
import { useLazyTranslate } from "@utils/google-translate";
import { useIndexedDB } from "react-indexed-db";
import { debounce } from "lodash";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { LANGUAGES } from "@utils/constants";

const Body = ({ historyItem }) => {
  const [sourceText, setSourceText] = useState("");

  const [searchedText, setSearchedText] = useState("");

  const debouncedSearch = useCallback(
    debounce((text) => {
      setSearchedText(text);
    }, 500),
    []
  );

  const debouncedHistoryUpdate = useCallback(
    debounce((sourceText, targetText, srcLang, trgtLang) => {
      if (sourceText && targetText)
        add({
          sourceLanguage: srcLang,
          targetLanguage: trgtLang,
          sourceText,
          targetText,
        });
    }, 2000),
    []
  );

  const [sourceLanguage, setSourceLanguage] = useState(LANGUAGES[0]);
  const [targetLanguage, setTargetLanguage] = useState(LANGUAGES[1]);

  const { add } = useIndexedDB("history");

  const [translate, { data }] = useLazyTranslate({
    language: sourceLanguage.iso,
  });

  const handleMicrophoneClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      checkPermissionsAndStartListening();
    }
  };

  const checkPermissionsAndStartListening = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
    } else {
      const permissions = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      permissions
        .then(() => {
          resetTranscript();
          SpeechRecognition.startListening({ continuous: true });
        })
        .catch(() => {
          alert("You need to accept permission to be able to use microphone");
        });
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

  const handleSwapIconClick = () => {
    const sourceLanguageTemp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguageTemp);
  };

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    setSourceText(transcript);
  }, [transcript]);

  useEffect(() => {
    if (sourceText) debouncedSearch(sourceText);
    else setSearchedText("");
  }, [sourceText]);

  useEffect(() => {
    debouncedHistoryUpdate(searchedText, data, sourceLanguage, targetLanguage);
  }, [data]);

  useEffect(() => {
    translate(searchedText, targetLanguage.iso);
  }, [searchedText, translate, sourceLanguage]);

  useEffect(() => {
    if (historyItem) {
      setTargetLanguage(historyItem.targetLanguage);
      setSourceLanguage(historyItem.sourceLanguage);
      setSourceText(historyItem.sourceText);
    }
  }, [historyItem]);

  return (
    <div>
      <div className="h-100-px b-b-1 bc-alto bg-black-haze" />
      <TranslationArea
        sourceText={sourceText}
        targetText={searchedText ? data : ""}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        isListening={listening}
        onMicrophoneClick={handleMicrophoneClick}
        onSourceLanguageClick={handleSourceLanguageClick}
        onTargetLanguageClick={handleTargetLanguageClick}
        onSourceTextChange={handleSourceTextChange}
        onClearIconClick={handleClearIconClick}
        onSwapIconClick={handleSwapIconClick}
      />
    </div>
  );
};

export default Body;
