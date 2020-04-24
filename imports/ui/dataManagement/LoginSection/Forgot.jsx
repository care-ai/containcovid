import React from "react";

const ForgotPassword = ({ toggleState, email, setEmail, forgotPassword }) => {
  return (
    <div className="content-width-small">
      <div className="panel">
        <div className="panel-body">
          <div className="space-bottom">
            <h1 className="card-heading no-bottom-space text-gray-5">
              Forgot Password?
            </h1>
          </div>
          <div className="form w-form">
            <form
              className="form-vertical-2"
              onSubmit={() =>
                event.stopPropagation() ||
                event.preventDefault() ||
                forgotPassword()
              }
            >
              <input
                type="email"
                className="form-input-2 form-input-large w-input"
                maxLength={256}
                name="email"
                data-name="Email"
                placeholder="Email Address"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <input
                type="submit"
                defaultValue="Reset Password"
                data-wait="Please wait..."
                className="button button-large bg-gradient-4 w-button"
              />
            </form>
            <div className="text-small-2 form-subtext">
              <div className="text-center">
                <a
                  className="information-link"
                  onClick={(event) =>
                    event.preventDefault() || toggleState("login")
                  }
                >
                  Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
