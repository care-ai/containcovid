import React, { useState } from "react";

const FaqQuestion = ({ question, answer }) => {
  const [isOpen, setOpen] = useState(false);

  const bodyStyle = {
    display: isOpen ? "block" : "none",
  };

  const translateStyle = {
    transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(${
      isOpen ? 90 : 0
    }deg) skew(0deg, 0deg)`,
    transformStyle: "preserve-3d",
  };

  return (
    <div className="panel">
      <div className="panel-body accordion">
        <div className="accordion-head" onClick={() => setOpen(!isOpen)}>
          <h5 className="accordion-head-text">{question}</h5>
          <div className="icon-circle-small bg-gray-3">
            <img
              src="images/icon-chevron-right-small-white.svg"
              alt
              className="icon-small"
              style={translateStyle}
            />
          </div>
        </div>
        <div className="accordion-body" style={bodyStyle}>
          <div>{answer}</div>
        </div>
      </div>
    </div>
  );
};

export default FaqQuestion;
