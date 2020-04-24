import React from "react";
const PageHeader = ({ text }) => {
  return (
    <div className="section">
      <div className="container justify-content-center">
        <div className="center-content content-width-large">
          <h2 className="display-heading-2 no-bottom-space">{text}</h2>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
