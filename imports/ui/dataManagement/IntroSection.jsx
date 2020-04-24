import React, { useState } from "react";
import classNames from "classnames";
import PageHeader from "../common/PageHeader";
import DiagnosisSection from "./DiagnosisSection";

const IntroSection = ({
  headerText = "This is the page header",
  setPageState,
  onFileUpload,
  user,
  pageState,
}) => {
  const [isDraggedOver, setDraggedOver] = useState(false);
  return (
    <div>
      <PageHeader text={headerText} />
      <div>
        <div className="container">
          <div
            className={
              pageState === "manage" ? "w-layout-grid grid-two-thirds" : ""
            }
          >
            <div id="w-node-fcb9b2037ea0-5fbd8d85" className="panel">
              <div className="panel-body">
                <div>
                  <h4 className="heading-4">Keep your data up to date</h4>
                  <div className="text-block">
                    Upload data with Google Takeout.{" "}
                    <a href="#" className="information-link">
                      Learn&nbsp;how&nbsp;&gt;
                    </a>
                  </div>
                </div>
                <div
                  className={classNames({
                    "div-block": true,
                    "upload-div": true,
                    "dragged-over": isDraggedOver,
                  })}
                  onDragOver={(event) => {
                    setDraggedOver(true);
                    event.preventDefault();
                  }}
                  onDragLeave={(event) => {
                    setDraggedOver(false);
                    event.preventDefault();
                  }}
                  onDrop={(event) => {
                    onFileUpload(event);
                    setDraggedOver(false);
                    event.preventDefault();
                  }}
                  onClick={() =>
                    document.getElementById("fileupload-zip").click()
                  }
                >
                  <p className="upload-text manage-data">
                    Upload data by dragging it here
                    <input
                      type="file"
                      accept=".zip"
                      id="fileupload-zip"
                      onChange={onFileUpload}
                      style={{ display: "none" }}
                    />
                  </p>
                </div>
              </div>
            </div>
            {pageState === "manage" ? <DiagnosisSection /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
