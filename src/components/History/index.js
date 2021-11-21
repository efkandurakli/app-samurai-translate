import React, { useEffect, useState } from "react";
import closeIcon from "@svgs/clear.svg";
import arrowRightIcon from "@svgs/arrow_right.svg";
import arrowLeftIcon from "@svgs/arrow_left.svg";
import { useIndexedDB } from "react-indexed-db";

import "./index.scss";

const History = ({ onCloseClick }) => {
  const [historyData, setHistoryData] = useState([]);

  const { getAll, deleteRecord, clear } = useIndexedDB("history");

  const handleDelete = (deletedItem) => {
    const tempArr = [...historyData];
    const index = tempArr.indexOf(deletedItem);
    if (index > -1) {
      tempArr.splice(index, 1);
      setHistoryData(tempArr);
      deleteRecord(deletedItem.id);
    }
  };

  const handleClear = () => {
    clear().then(() => {
      setHistoryData([]);
    });
  };

  useEffect(() => {
    getAll().then((data) => {
      setHistoryData(data);
    });
  }, []);

  return (
    <div className="history">
      <div className="history__title b-b-1 bc-alto">
        <div className="disp-flex">
          <div className="arrow-left-icon" onClick={onCloseClick}>
            <img src={arrowLeftIcon} alt="arrow left" />
          </div>

          <p className="fs-28">History </p>
        </div>
        <div className="close-icon">
          <img onClick={onCloseClick} src={closeIcon} alt="close icon" />
        </div>
      </div>
      <div className="p-4 b-b-1 bc-alto" onClick={handleClear}>
        <p className="fs-14 fw-5 color-fun-blue cursor-pointer float-right">
          Clear all history
        </p>
      </div>

      {historyData
        .slice()
        .reverse()
        .map((dataItem, index) => {
          const addBorder = index < historyData.length - 1;
          return (
            <div
              key={`history-data-item-${index}`}
              className={`history__item ${addBorder ? "b-b-1 bc-alto" : ""}`}
            >
              <div className="history__item--title">
                <div className="disp-flex__center">
                  <p>{dataItem.sourceLanguage.text}</p>
                  <img src={arrowRightIcon} alt="arrow right icon" />
                  <p>{dataItem.targetLanguage.text}</p>
                </div>
                <div
                  className="close-icon"
                  onClick={() => handleDelete(dataItem)}
                >
                  <img src={closeIcon} alt="close icon" />
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
