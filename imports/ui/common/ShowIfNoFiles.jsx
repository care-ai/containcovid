import React, { useState, useEffect } from "react";
import PubSub from "pubsub-js";

const ShowIfNoFiles = ({ children }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    subtoken = PubSub.subscribe("SET_TOP_BUTTON_STATE", (msg, data) => {
      setState(data);
    });
    return function cleanup() {
      PubSub.unsubscribe(subtoken);
    };
  }, []);

  const shouldShow = () =>
    state !== "share-data" && state !== "risk-assessment";

  return shouldShow() ? children : null;
};

export default ShowIfNoFiles;
