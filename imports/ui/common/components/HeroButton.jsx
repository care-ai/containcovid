import React from "react";

const HeroButton = ({ title, subtitle, link }) => {
  return (
    <a href={link} className="panel diagnosis-selection-panel w-inline-block">
      <div className="panel-body diagnosis-panel-body">
        <div className="space-bottom">
          <h1 className="display-heading-2 diagnosis-header">{title} &gt;</h1>
          <div className="text-white-grey-4 diagnosis-text">{subtitle}</div>
        </div>
      </div>
    </a>
  );
};

export default HeroButton;
