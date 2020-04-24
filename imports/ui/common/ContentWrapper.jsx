import React from "react";

const ContentWrapper = ({ children, sectionClass, center }) => {
  
  let containerClass = (!!center) ? "container justify-content-center" : "container";
  sectionClass = ("string" === typeof sectionClass) ? "section " + sectionClass : "section";

  return (
    <div className={sectionClass}>
      <div className={containerClass}>{children}</div>
    </div>
  );
};

export default ContentWrapper;
