import React from "react";
import icon from '@svgs/clear.svg';
import "./index.scss";

const TextArea = ({ value, onChange }) => {
  return (
    <div className='disp-flex'>
      <textarea className="text-area" value={value} onChange={onChange} />
    <img src={icon} />
    </div>
  );
};

export default TextArea;
