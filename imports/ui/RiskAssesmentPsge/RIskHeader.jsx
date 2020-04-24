import React, { useEffect } from "react";
import PubSub from "pubsub-js";

const RiskHeader = ({ assessment }) => {
  useEffect(() => {
    document
      .getElementById("assessment-div")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const getAssessmentText = () => {
    switch (assessment) {
      case "safe":
        return [
          "Stay at Home",
          "We don't have enough data from your region to determine your risk level",
        ];
      case "moderate":
        return [
          "Moderate",
          "You have been in some places marked as a potential source of infection",
        ];
      case "dangerous":
        return [
          "Call the emergency line",
          "You have had several potential contacts with infected people. Call a doctor now!",
        ];
    }
  };
  return (
    <div className="section" id="assessment-div">
      <div className="container">
        <div className="w-layout-grid grid-two-thirds">
          <div className="panel">
            <div className="panel-body">
              <h4 className="heading-5">Stay informed and help others</h4>
              <div>
                <div className="space-bottom">
                  Sign up to get notified if we learn later that you're at risk.{" "}
                  <br />
                  <br />
                  Your visits will also help scientists identify disease
                  hotspots in your area.
                </div>
              </div>
              <button
                onClick={() => {
                  PubSub.publish("MANAGE_DATA", "save");
                }}
                className="button w-button"
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="panel">
            <div className="panel-body">
              <div>
                <h4 className="heading-5">Your risk assessment</h4>
                <h1 className="display-heading-9 space-bottom-small">
                  {getAssessmentText()[0]}
                </h1>
                <div>{getAssessmentText()[1]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskHeader;
