import React from "react";

const EmptyTextMessageRow = ({ message }) => {
  return (
    <div className="location-row-inner">
      <div style={{ flex: 1, textAlign: "center" }}>{message}</div>
    </div>
  );
};

export default EmptyTextMessageRow;
