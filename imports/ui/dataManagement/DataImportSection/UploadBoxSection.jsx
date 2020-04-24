import React, { useState } from "react";
import classNames from "classnames";
import TutorialBox from "./TutorialBox";
import ModalVideo from "react-modal-video";

const UploadBoxSection = ({
  headerText = "This is the page header",
  onFileUpload,
  pageState,
}) => {
  const [isDraggedOver, setDraggedOver] = useState(false);
  const [gtTutorialOpen, setGtTutorialOpen] = useState(false);

  return (
    <>
      <div className="container">
        <div className="w-layout-grid grid-two-thirds">
          <div id="w-node-12fecc39add9-68d2f631" className="panel">
            <div className="panel-body">
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
          <TutorialBox setGtTutorialOpen={setGtTutorialOpen} />
          <div class="panel">
            <div class="panel-body">
              <iframe src="https://takeout.google.com/settings/takeout"></iframe>
            </div>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="vimeo"
        isOpen={gtTutorialOpen}
        videoId="374410050"
        onClose={() => setGtTutorialOpen(false)}
      />
    </>
  );
};

export default UploadBoxSection;
