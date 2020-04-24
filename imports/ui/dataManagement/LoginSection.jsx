import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import toastr from "../common/toastr";
import validate from "validate.js";
import Login from "./LoginSection/Login";
import Signup from "./LoginSection/Signup";
import ForgotPwd from "./LoginSection/Forgot";

const LoginSection = () => {
  const [state, setState] = useState("login"); //login signup reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [readTC, setReadTC] = useState(false);

  const toggleState = (state) => {
    const validStates = ["login", "signup", "forgotPwd"];
    const stateStr = state;
    if (validStates.includes(stateStr)) {
      setState(stateStr);
    }
  };

  const setError = (message) => toastr.error(message);

  const signup = () => {
    if (!email || !email.length) {
      setError("You need to enter your email");
      return;
    }
    let hasEmail = validate.single(email, { presence: true, email: true });
    if (hasEmail) {
      setError("The email " + hasEmail[0]);
      return;
    }
    if (!password || !password.length) {
      setError("You need to enter your password");
      return;
    }
    if (!confirmPassword || !confirmPassword.length) {
      setError("You need to confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    Accounts.createUser({ email, password }, (e, r) => {
      if (e) setError(e.reason);
    });
  };

  const login = () => {
    if (!email || !email.length) {
      setError("You need to enter your email");
      return;
    }
    let hasEmail = validate.single(email, { presence: true, email: true });
    if (hasEmail) {
      setError("The email " + hasEmail[0]);
      return;
    }
    if (!password || !password.length) {
      setError("You need to enter your password");
      return;
    }

    Meteor.loginWithPassword(email, password, (e, r) => {
      if (e) {
        if (e.reason === "There was a problem with your login")
          setError("Wrong credentials. Please check your password.");
        else setError(e.reason);
      }
    });
  };

  const forgotPassword = () => {
    if (!email || !email.length) {
      setError("You need to enter your email");
      return;
    }

    let hasEmail = validate.single(email, { presence: true, email: true });
    if (hasEmail) {
      setError("The email " + hasEmail[0]);
      return;
    }

    Accounts.forgotPassword({ email }, (e, r) => {
      if (e) setError(e.reason);
    });
  };

  if (state === "login")
    return (
      <Login
        toggleState={toggleState}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        confirmPassword={confirmPassword}
        login={login}
      />
    );
  if (state === "signup")
    return (
      <Signup
        toggleState={toggleState}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        confirmPassword={confirmPassword}
        signup={signup}
        readTC={readTC}
        setReadTC={setReadTC}
      />
    );
  if (state === "forgotPwd")
    return (
      <ForgotPwd
        toggleState={toggleState}
        email={email}
        setEmail={setEmail}
        forgotPassword={forgotPassword}
      />
    );
};

export default LoginSection;
