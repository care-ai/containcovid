import React, { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";

import PubSub from "pubsub-js";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

const Header = () => {
  const [buttonState, setButtonState] = useState("manage-link");

  useEffect(() => {
    subtoken = PubSub.subscribe("SET_TOP_BUTTON_STATE", (msg, data) => {
      setButtonState(data);
    });
    return function cleanup() {
      PubSub.unsubscribe(subtoken);
    };
  }, []);

  onClickAction = () => {
    switch (buttonState) {
      case "manage-link":
        FlowRouter.go("/manage-data");
        break;
      case "manage-save":
      case "share-data":
        PubSub.publish("MANAGE_DATA", "save");
        break;
      case "risk-assessment":
        PubSub.publish("MANAGE_DATA", "assess");
        break;
      case "sign-up":
        PubSub.publish("MANAGE_DATA", "signup");
        break;
    }
  };

  getButtonText = () => {
    switch (buttonState) {
      case "manage-link":
        return "Manage Data";
      case "manage-save":
        return "Save Data";
      case "share-data":
        return "Share Data";
      case "risk-assessment":
        return "Get Risk Analysis";
      case "sign-up":
        return "Sign up";
    }
  };

  return (
    <>
      <div id="Top" className="back-to-top-container">
        <div className="back-to-top-button-wrapper">
          <a href="#Top" className="button-circle bg-gray-3 w-inline-block">
            <img
              src="images/icon-arrow-up.svg"
              alt=""
              className="button-circle-icon"
            />
          </a>
        </div>
      </div>
      <div className="navbar-wrapper sticky-top">
        <div className="container">
          <div
            data-collapse="medium"
            data-animation="default"
            data-duration="400"
            className="navbar w-nav"
          >
            <div className="navbar-row">
              <div>
                <a href="/" className="navbar-1-brand w-nav-brand">
                  <h3 className="brand">
                    <span className="contain text-span-5">Contain</span>Covid
                  </h3>
                </a>
                {/* <nav role="navigation" className="nav-menu w-nav-menu">
                  <div data-delay="0" data-hover="1" className="w-dropdown">
                    <div className="nav-link row w-dropdown-toggle"></div>
                    <nav className="dropdown-list w-dropdown-list">
                      <div className="dropdown-list-wrapper">
                        <div className="dropdown-bg"></div>
                        <div className="dropdown-grid-halves">
                          <a
                            href="https://panels-template.webflow.io/#company"
                            className="dropdown-item dropdown-item-large w-inline-block"
                          >
                            <h6 className="dropdown-item-heading">
                              Company Pages
                            </h6>
                            <div className="text-small">
                              Build a detailed and informative online presence
                            </div>
                          </a>
                          <a
                            href="https://panels-template.webflow.io/#pricing"
                            className="dropdown-item dropdown-item-large w-inline-block"
                          >
                            <h6 className="dropdown-item-heading">
                              Pricing Pages
                            </h6>
                            <div className="text-small">
                              Articulate your product&#x27;s pricing options
                            </div>
                          </a>
                          <a
                            href="https://panels-template.webflow.io/#blog"
                            className="dropdown-item dropdown-item-large w-inline-block"
                          >
                            <h6 className="dropdown-item-heading">
                              Blog Pages
                            </h6>
                            <div className="text-small">
                              Engage your audience with multiple layotus.
                            </div>
                          </a>
                          <a
                            href="https://panels-template.webflow.io/#account"
                            className="dropdown-item dropdown-item-large w-inline-block"
                          >
                            <h6 className="dropdown-item-heading">
                              Account Pages
                            </h6>
                            <div className="text-small">
                              Stylish forms and utilities for your users.
                            </div>
                          </a>
                        </div>
                      </div>
                    </nav>
                  </div>
                </nav> */}
              </div>
              <div className="navbar-controls">
                <div className="navbar-buttons">
                  <div className="modal-container">
                    <div className="modal-background"></div>
                    <div className="content-width-medium modal-content">
                      <div className="panel modal-panel">
                        <div className="modal-panel-bg"></div>
                        <div className="panel-body modal-panel-body">
                          <form action="/search" className="search-form w-form">
                            <input
                              type="search"
                              className="form-input form-input-large search-modal-input w-input"
                              autoFocus={true}
                              maxLength="256"
                              name="query"
                              placeholder="Type your search"
                              id="search"
                              required=""
                            />
                            <input
                              type="submit"
                              value="Search"
                              className="button search-form-button w-button"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    aria-current="page"
                    className="button w-button w--current"
                    onClick={onClickAction}
                  >
                    {getButtonText()}
                  </button>
                </div>
                <div className="menu-button w-nav-button">
                  <img src="images/icon-menu.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
