import React, { useState } from "react";

const TutorialBox = ({ setGtTutorialOpen }) => {
  return (
    <>
      <div className="panel">
        <div className="tutorial-video-wrapper center-content">
          <p className="upload-text-2">View the tutorial</p>
          <a
            onClick={(e) => e.preventDefault() || setGtTutorialOpen(true)}
            className="circle-large-2 video-circle-large w-inline-block w-lightbox"
          >
            <img src="images/video-play.svg" alt />
          </a>
        </div>
        <div className="panel-body">
          <ul className="w-list-unstyled">
            <li className="bordered-list-item-small">
              <div className="row row-align-center">
                <div className="circle-large-3 circle-small bg-gray-3">
                  <h5 className="no-bottom-space">1</h5>
                </div>
                <div className="space-left-small">
                  Download your location history from{" "}
                  <a
                    href="http://google.com/takeout"
                    className="information-link"
                  >
                    google.com/takeout{" "}
                  </a>
                  (shown in this video tutorial).
                </div>
              </div>
            </li>
            <li className="bordered-list-item-small">
              <div className="row row-align-center">
                <div className="circle-large-3 circle-small bg-gray-3">
                  <h5 className="no-bottom-space">2</h5>
                </div>
                <div className="space-left-small">
                  Drag the .zip file into the box above.
                  <a href="http://google.com/takeout" className="link-2" />
                </div>
              </div>
            </li>
            <li className="bordered-list-item-small">
              <div className="row row-align-center">
                <div className="circle-large-3 circle-small bg-gray-3">
                  <h5 className="no-bottom-space">3</h5>
                </div>
                <div className="space-left-small">
                  <span className="remove">Remove</span> all locations you don't
                  want to report.
                </div>
              </div>
            </li>
            <li>
              <div className="row row-align-center">
                <div className="circle-large-3 circle-small bg-gray-3">
                  <h5 className="no-bottom-space">4</h5>
                </div>
                <div className="space-left-small">
                  <span className="submit">Submit</span> to send data to health
                  officials and scientists.
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TutorialBox;
