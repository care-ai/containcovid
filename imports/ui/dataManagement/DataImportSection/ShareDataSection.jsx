import React, { useState, useEffect } from "react";
import PubSub from "pubsub-js";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { useTracker } from "meteor/react-meteor-data";
import ActionButton from "../../common/ActionButton";

const ShareDataSection = () => {
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
    state === "share-data" || state === "risk-assessment";

  if (!shouldShow()) return <></>;
  return (
    <div className="section">
      <div className="container">
        <div className="panel">
          <div className="panel-body confirmation-panel-body">
            <h4 className="share-data-section-heading">
              When you're ready, you can share your data.
              <br />
            </h4>
            <ActionButton state={state} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareDataSection;
