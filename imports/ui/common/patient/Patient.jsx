import React from "react";

const PatientPage = () => {
  return (
    <div>
      <div className="section">
        <div className="container grid-container">
          <div>
            <div className="panel-body">
              <div className="content-width-extra-large">
                <div className="display-heading-7">
                  <span className="text-gray-5 text-gray-5">
                    Anonymously Share Where You've Been.
                    <br />
                  </span>
                  Help Save Lives.
                </div>
                <div>
                  <ul className="w-list-unstyled">
                    <li>
                      <a
                        href="/import-data"
                        className="input-type-list-option top w-inline-block"
                      >
                        <div className="row row-align-center">
                          <div className="badge bg-gradient-4">Option 1</div>
                          <div className="input-type-heading">
                            Import your Google Location History data. We'll show
                            you how.{" "}
                            <span className="fa-icon text-gray-5"></span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/input-data"
                        className="input-type-list-option w-inline-block"
                      >
                        <div className="row row-align-center">
                          <div className="badge bg-gradient-4">Option 2</div>
                          <div className="input-type-heading">
                            Report the places you've been manually.{" "}
                            <span className="fa-icon text-gray-5"></span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div
            data-w-id="74b83b38-2002-ad20-5b63-5849f065a831"
            className="panel"
          >
            <div className="panel-body align-content-center">
              <div className="content-width-extra-large">
                <div className="w-layout-grid grid-three-fourths">
                  <div
                    id="w-node-d48bcb047eab-c2bd8d88"
                    className="fa-icon edit-add-delete-icon text-gray-5"
                  >
                    
                  </div>
                  <div className="panel-body">
                    <h5 className="panel-subheading text-primary-4">
                      Your Data, Your Choice.
                    </h5>
                    <div className="display-heading-4 text-gray-5">
                      Edit, Add, and Delete your data in the Manage Data portal.
                    </div>
                    <p className="no-bottom-space">
                      We recommend removing personal and work addresses before
                      sharing. We will never upload any data without your
                      permission.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container grid-container">
          <div className="panel">
            <div className="panel-body align-content-center section">
              <div className="content-width-extra-large">
                <div>
                  <h4 className="thank-you-note">
                    Thank you for your strength and generosity during this
                    crisis. <br />
                    <br />
                    <span className="text-gray-4">Let's work together</span>
                    <span className="text-gray-4">
                      {" "}
                      to understand this disease so we can prevent it from
                      happening to millions of others.
                    </span>
                    <br />
                    <br />
                    You're our best shot.
                    <br />
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
