import React from "react";
import FaqQuestion from "./FaqSection/FaqQuestion";

const DataQuestion = () => {
  return (
    <>
      Yes - you can choose to remove any data from our database at any time.
      Just go to the{" "}
      <a href="/manage-data" className="information-link">
        manage data
      </a>{" "}
      page and click the delete button.
    </>
  );
};

const DataAccessQuestion = () => {
  return (
    <>
      Only select scientists and health officials have access to this data. You
      can view the list{" "}
      <a href="#" className="information-link">
        here
      </a>
      .
    </>
  );
};

const FaqSection = () => {
  return (
    <div className="section">
      <div className="container grid-container">
        <div className="content-width-extra-large">
          <div className="w-layout-grid faq-grid">
            <div
              id="w-node-76834ecf8d93-058c04a5"
              className="content-width-small"
            >
              <div className="space-bottom-large">
                <h3 className="display-heading-4 text-gray-5">
                  Frequently Asked Questions
                </h3>
              </div>
              <div>
                <h5 className="text-gray-4">More Questions?</h5>
                <div className="text-gray-4">Get in touch with us at</div>
                <a
                  href="mailto:info@containcovid.org"
                  className="information-link bold"
                >
                  info@containcovid.org
                </a>
              </div>
            </div>
            <div className="accordion-list">
              <FaqQuestion
                question="Will people know who I am?"
                answer="No - your data is completely anonymized before it's shared. In addition, we will never share details of any of your visits with a regular user - only scientists and health officials."
              />
              <FaqQuestion
                question="Can I take my data down?"
                answer={<DataQuestion />}
              />
              <FaqQuestion
                question="Who has access to my data?"
                answer={<DataAccessQuestion />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
