import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import ModalVideo from "react-modal-video";
import ContentWrapper from "./common/ContentWrapper";
import "react-modal-video/css/modal-video.min.css";

var TutorialPage = () => {
  const [gtTutorialOpen, setGtTutorialOpen] = useState(false);
  const [mnTutorialOpen, setMnTutorialOpen] = useState(false);

  return (
    <div>
      <div className="section hero-section">
        <div className="container">
          <h1 className="display-heading-3">You can help end this.</h1>
          <div className="space-bottom">
            <h3 className="display-inline text-gray-4">
              ContainCovid helps you anonymously self-report your location
              history to
            </h3>
            <h3 className="display-inline">
              &nbsp;help scientists stop the spread of COVID-19.
            </h3>
          </div>
        </div>
      </div>
      <div className="section">
        <ModalVideo
          channel="vimeo"
          isOpen={gtTutorialOpen}
          videoId="374410050"
          onClose={() => setGtTutorialOpen(false)}
        />
        <ModalVideo
          channel="vimeo"
          isOpen={mnTutorialOpen}
          videoId="374410050"
          onClose={() => setMnTutorialOpen(false)}
        />
        <div className="container grid-container">
          <div
            data-w-id="e7d68696-7e31-29a9-81fc-1dedf7655742"
            className="w-layout-grid grid-two-thirds reverse panel-height-large"
          >
            <div className="panel bg-gradient-7">
              <div className="background-image-wrapper">
                <div className="quote-background-image" />
              </div>
              <div className="panel-body panel-body-large align-content-center">
                <div className="center-content content-width-medium">
                  <p className="upload-text">
                    View the Google Takeout tutorial
                  </p>
                  <button
                    onClick={() => setGtTutorialOpen(true)}
                    className="circle-large-2 video-circle-large w-inline-block w-lightbox"
                  >
                    <img src="images/video-play.svg" alt="" />
                  </button>
                  <div className="html-embed w-embed w-script">
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n.upload-btn-wrapper {\n  position: relative;\n  overflow: hidden;\n  display: inline-block;\n}\n.btn {\n  border: 2px dashed white;\n  color: white;\n  background-color: transparent;\n  padding: 8px 20px;\n  border-radius: 5px;\n  font-size: 20px;\n}\n.upload-btn-wrapper input[type=file] {\n  font-size: 100px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  opacity: 0;\n}\n",
                      }}
                    />
                    <div className="upload-btn-wrapper">
                      <a
                        href="/manage-data"
                        className="button manual-entry-page-button w-button"
                      >
                        Upload your Google timeline data.
                      </a>
                    </div>
                  </div>
                  <div className="display-heading-5" />
                </div>
              </div>
            </div>
            <div className="panel">
              <div className="panel-body">
                <div className="space-bottom-large">
                  <h5 className="panel-subheading text-primary-4">
                    Option 1:
                    <span className="circle text-span-6"> Google import</span>
                  </h5>
                  <h3 className="card-heading display-inline">
                    Anonymously upload your google location history.
                  </h3>
                </div>
                <div>
                  <ul className="w-list-unstyled">
                    <li className="bordered-list-item-small">
                      <div className="row row-align-center">
                        <div className="circle-large circle-small bg-gray-3">
                          <h5 className="no-bottom-space">1</h5>
                        </div>
                        <div className="space-left-small">
                          Download your location history from{" "}
                          <a href="http://google.com/takeout" className="link">
                            google.com/takeout{" "}
                          </a>
                          by following the tutorial video on the right.
                        </div>
                      </div>
                    </li>
                    <li className="bordered-list-item-small">
                      <div className="row row-align-center">
                        <div className="circle-large circle-small bg-gray-3">
                          <h5 className="no-bottom-space">2</h5>
                        </div>
                        <div className="space-left-small">
                          Drag the .zip file into the box on the right. You'll
                          be taken to a preview page.
                          <a
                            href="http://google.com/takeout"
                            className="link"
                          />
                        </div>
                      </div>
                    </li>
                    <li className="bordered-list-item bordered-list-item-small">
                      <div className="row row-align-center">
                        <div className="circle-large circle-small bg-gray-3">
                          <h5 className="no-bottom-space">3</h5>
                        </div>
                        <div className="space-left-small">
                          <span className="remove">Remove</span> all locations
                          you don't want to report.
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row row-align-center">
                        <div className="circle-large circle-small bg-gray-3">
                          <h5 className="no-bottom-space">4</h5>
                        </div>
                        <div className="space-left-small">
                          <span className="submit">Submit</span> to send data to
                          health officials and scientists.
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <h3 className="panel-subheading text-primary-3 option">Option 2</h3>
          <div
            data-w-id="f89d456c-a2a6-021c-24b6-584a4f45757c"
            className="w-layout-grid grid-two-thirds reverse panel-height-large"
          >
            <div className="panel bg-gradient-7">
              <div className="background-image-wrapper">
                <div className="quote-background-image" />
              </div>
              <div className="panel-body panel-body-large align-content-center">
                <div className="center-content content-width-medium">
                  <p className="upload-text">View the manual entry tutorial</p>
                  <button
                    onClick={() => setMnTutorialOpen(true)}
                    href="#"
                    className="circle-large-2 video-circle-large w-inline-block w-lightbox"
                  >
                    <img src="images/video-play.svg" alt="" />
                  </button>
                  <a
                    href="/manage-data"
                    className="button manual-entry-page-button w-button"
                  >
                    Manual Entry Page
                  </a>
                </div>
              </div>
            </div>
            <div className="panel">
              <div className="panel-body">
                <div className="space-bottom-large">
                  <h3 className="card-heading display-inline">
                    Input your data manually.
                  </h3>
                </div>
                <div>
                  <ul className="w-list-unstyled">
                    <li className="bordered-list-item-small">
                      <div className="row row-align-center">
                        <div className="circle-large circle-small bg-gray-3">
                          <h5 className="no-bottom-space">1</h5>
                        </div>
                        <div className="space-left-small">
                          Go to the <a href="/manage-data">manual entry page</a>
                          .
                          <a href="http://google.com/takeout" />
                        </div>
                      </div>
                    </li>
                    <li className="bordered-list-item bordered-list-item-small">
                      <div className="row row-align-center">
                        <div className="circle-large circle-small bg-gray-3">
                          <h5 className="no-bottom-space">2</h5>
                        </div>
                        <div className="space-left-small">
                          <span className="remove">Add</span> all public
                          locations you remember.{" "}
                          <span className="preview">Preview</span> the exact
                          data we will send.
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row row-align-center">
                        <div className="circle-large circle-small bg-gray-3">
                          <h5 className="no-bottom-space">3</h5>
                        </div>
                        <div className="space-left-small">
                          <span className="submit">Submit</span> to send data to
                          health officials and save lives.
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container grid-container">
          <div className="panel section">
            <div className="panel-body align-content-center">
              <div className="content-width-extra-large">
                <div className="space-bottom-large">
                  <h3 className="large-heading display-inline">
                    You’re our best shot.
                  </h3>
                  <h3 className="large-heading display-inline text-gray-4">
                    {" "}
                    <br />
                    <br />
                    Thank you for your strength and generosity during this
                    crisis. <br />
                    <br />
                    <span className="large-heading">
                      Let's work together
                    </span>{" "}
                    to understand how this disease spreads so we can prevent it
                    from happening to millions of others.
                    <br />
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
