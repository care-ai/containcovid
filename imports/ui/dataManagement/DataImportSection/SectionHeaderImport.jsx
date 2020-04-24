import React from "react";

const SectionHeaderImport = ({ header, subHeader }) => {
  return (
    <div className="section">
      <div className="container justify-content-center">
        <div className="center-content content-width-large">
          <h2 className="import-data-header">{header}</h2>
          <p>{subHeader}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionHeaderImport;
