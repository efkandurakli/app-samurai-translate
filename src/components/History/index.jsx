import React from "react";
import closeIcon from "@svgs/clear.svg";
import arrowRightIcon from "@svgs/arrow_right.svg";
import "./index.scss";

const History = ({ historyData }) => {
  return (
    <div className="history">
      <div className="history__title b-b-1 bc-alto">
        <h3 className="fs-28">History </h3>
        <div className="close-icon">
          <img src={closeIcon} />
        </div>
      </div>
      <div className="p-4 b-b-1 bc-alto">
        <p className="Google-Sans-Roboto fs-14 fw-5 color-fun-blue cursor-pointer float-right">
          Clear all history
        </p>
      </div>

      {historyData.map((dataItem, index) => {
        const addBorder = index < historyData.length - 1;
        return (
          <div
            key={`history-data-item-${index}`}
            className={`history__item ${addBorder ? "b-b-1 bc-alto" : ""}`}
          >
            <div className="history__item--title">
              <div className="disp-flex__center">
                <p>{dataItem.sourceLanguage}</p>
                <img src={arrowRightIcon} />
                <p>{dataItem.targetLanguage}</p>
              </div>
              <div className="close-icon">
                <img src={closeIcon} />
              </div>
            </div>
            <div className="p-t-2">
              <p>{dataItem.sourceText}</p>
              <p className="color-shuttle-gray">{dataItem.targetText}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
