import React from "react";
import HeroButton from "../common/components/HeroButton";

const TopSection = () => {
  return (
    <div className="section top-section">
      <div className="container grid-container">
        <div data-w-id="3af57891-2292-d289-c2e6-3f71479680c4" className="panel">
          <div className="panel-body align-content-center">
            <div className="content-width-extra-large">
              <div className="row">
                <h5 className="panel-subheading text-primary-4">
                  Quick Start{" "}
                  <span className="text-gray-4">
                    | Location-based contact tracing
                  </span>
                </h5>
              </div>
              <h3 className="display-heading-4 text-gray-5 space-bottom-large">
                Have You Been Diagnosed With COVID-19?
              </h3>
              <div
                data-w-id="dbc8dd30-9089-b6d7-43a2-924e85941332"
                className="w-layout-grid grid-halves"
              >
                <HeroButton
                  title="Yes"
                  subtitle="Learn how you can help scientists stop this pandemic."
                  link="/patient"
                />
                <HeroButton
                  title="No"
                  subtitle="Get notified if we detect you are at risk."
                  link="/risk-assessment"
                />
              </div>
            </div>
            <h5 className="panel-subheading text-primary-4 fa-icon learn-more">
              <span className="learn-more-text"> learn more </span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
