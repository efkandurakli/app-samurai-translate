import React, { useState } from "react";
import Header from "@components/Header";
import Body from "@components/Body";
import historyIcon from "@svgs/history.svg";
import "@styles/base.scss";
import "./App.scss";
import History from "@components/History/index";

const HISTORY_DATA = [
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  },
  {
    sourceLanguage: 'English',
    targetLanguage : 'Turkish',
    sourceText: 'hot',
    targetText: 'sıcak'
  }
]

function App() {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="App">
      <Header display={showHistory} />
      <div className={`App__content${showHistory ? "--show-history" : ""}`}>
        <div className={`App__body${showHistory ? "--show-history" : ""}`}>
          <Body />
          <div className="App__history-button">
            <img
              className="b-2 bc-alto p-5 cursor-pointer"
              src={historyIcon}
              onClick={() => setShowHistory(!showHistory)}
            />
            <p className='fs-14'>History</p>
          </div>
        </div>
        {showHistory && <History historyData={HISTORY_DATA} onCloseClick={() => setShowHistory(false)} />}
      </div>
    </div>
  );
}

export default App;
