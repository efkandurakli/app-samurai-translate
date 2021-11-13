import React, { useState } from "react";
import icon from "@svgs/swap.svg";
import "./index.scss";

const TranslationArea = () => {
  const [activeSourceLanguageId, setActiveSourceLanguageId] =
    useState("english");
  const [activeTargetLanguageId, setActiveTargetLanguageId] =
    useState("turkish");

  const LANGUAGES = [
    {
      text: "ENGLISH",
      id: "english",
    },
    {
      text: "TURKISH",
      id: "turkish",
    },
  ];

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

  return (
    <div className="translation-area">
      <div className="tabs b-b-1 bc-alto">
        <div className="tabs__source-languages p-t-2">
          {LANGUAGES.map((language, index) => {
            const isActive = activeSourceLanguageId === language.id;
            return (
              <p
                className={`p-l-4 p-r-4 cursor-pointer ${
                  isActive ? "b-b-2 bc-fun-blue" : ""
                }`}
                key={`${language.id}-${index}`}
                onClick={() => handleSourceLanguageClick(language.id)}
              >
                {language.text}
              </p>
            );
          })}
        </div>

        <div className="tabs__target-languages p-t-2">
          <img src={icon} height="40px" width="40px" />
          <div className="disp-flex p-l-5">
            {LANGUAGES.map((language, index) => {
              const isActive = activeTargetLanguageId === language.id;
              return (
                <p
                  className={`p-l-4 p-r-4 cursor-pointer ${
                    isActive ? "b-b-2 bc-fun-blue" : ""
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
      <div className="disp-flex h-200-px">
        <div className="w-50-p b-r-1 bc-alto"></div>
        <div className="w-50-p"></div>
      </div>
    </div>
  );
};

export default TranslationArea;
