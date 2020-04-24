import React from "react";

const PartnersSection = () => {
  return (
    <div className="section">
      <div className="container grid-container">
        <div
          data-w-id="365e45c7-d41a-d997-d38f-5fe86b1236f7"
          className="panel section bg-gradient-4"
        >
          <div className="panel-body-2 align-content-center">
            <div className="content-width-extra-large">
              <div className="space-bottom-large">
                <h3 className="white-heading display-inline">
                  We're working with the best health institutions
                </h3>
                <h3 className="large-light-white-heading display-inline">
                  {" "}
                  to trace and stop the pandemic.
                </h3>
              </div>
              <div className="brand-row align-content-left">
                <img
                  src="images/FAVPNG_university-of-california-berkeley-logo-brand-white_FS1eEGd1.png"
                  width={200}
                  srcSet="images/FAVPNG_university-of-california-berkeley-logo-brand-white_FS1eEGd1-p-500.png 500w, images/FAVPNG_university-of-california-berkeley-logo-brand-white_FS1eEGd1-p-800.png 800w, images/FAVPNG_university-of-california-berkeley-logo-brand-white_FS1eEGd1-p-1080.png 1080w, images/FAVPNG_university-of-california-berkeley-logo-brand-white_FS1eEGd1.png 1204w"
                  sizes="(max-width: 479px) 70vw, 200px"
                  alt
                  className="brand-image"
                />
                <img
                  src="images/mit2.png"
                  height={50}
                  alt
                  className="brand-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
