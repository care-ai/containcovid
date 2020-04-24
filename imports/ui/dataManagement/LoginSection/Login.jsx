import React from "react";

const Login = ({
  toggleState,
  email,
  setEmail,
  password,
  setPassword,
  login,
}) => {
  return (
    <div className="content-width-small">
      <div className="panel">
        <div className="panel-body">
          <div className="space-bottom">
            <h1 className="card-heading-2 text-gray-5">Welcome back!</h1>
            <div className="card-heading-2 text-gray-4">
              Sign in with your account details
            </div>
          </div>
          <div className="form w-form">
            <form
              className="form-vertical-2"
              onSubmit={() =>
                event.stopPropagation() || event.preventDefault() || login()
              }
            >
              <input
                type="email"
                className="form-input-2 form-input-large w-input"
                autofocus="true"
                maxLength={256}
                name="email"
                data-name="Email"
                placeholder="Email Address"
                id="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <div>
                <input
                  type="password"
                  className="form-input-2 form-input-large w-input"
                  maxLength={256}
                  name="Password"
                  data-name="Password"
                  placeholder="Password"
                  id="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <a
                  className="form-input-link text-small"
                  onClick={(event) =>
                    event.preventDefault() || toggleState("forgotPwd")
                  }
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="submit"
                defaultValue="Sign In"
                data-wait="Please wait..."
                className="button-4 button-large bg-gradient-4 w-button"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="text-small-2 form-subtext">
        <div className="text-center">
          Don't have an account yet?&nbsp;
          <a
            onClick={(event) => event.preventDefault() || toggleState("signup")}
            className="information-link"
          >
            Create one
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
