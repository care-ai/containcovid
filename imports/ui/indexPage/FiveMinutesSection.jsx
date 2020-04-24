import React from "react";

const FiveMinutesSection = () => {
  return (
    <div className="section">
      <div className="container">
        <div data-w-id="bd4612df-6537-9f3f-d1a4-338fd31cc005" className="panel">
          <div className="panel-body">
            <div className="content-width-extra-large">
              <div className="w-layout-grid grid-three-fourths">
                <div className="panel-2">
                  <img src="images/silent.svg" width={300} alt />
                </div>
                <div className="panel-body panel-body-small">
                  <div className="display-heading-4">
                    <span className="text-gray-5">
                      It takes 5 minutes.
                      <br />
                    </span>
                    <span>No app needed.</span>
                  </div>
                  <div>
                    <strong>If you use Google maps</strong>, it's likely that
                    Google already has your location history stored.
                    ContainCovid allows you to use that data to help others.
                    Learn how{" "}
                    <a href="#" className="information-link">
                      here
                    </a>
                    .<span>‍</span>
                    <br />
                  </div>
                  <div className="text-block-7">
                    <span />
                    <strong>Otherwise</strong>, you can quickly share your
                    visits manually{" "}
                    <a href="#" className="information-link">
                      here
                    </a>
                    .<br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiveMinutesSection;
