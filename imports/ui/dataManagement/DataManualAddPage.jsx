import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import _ from "lodash";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { setButtonState } from "../common/utils";

import DataManagementComponent from "./DataManagementComponent";
import LoginSection from "./LoginSection";
import Modal from "../common/components/Modal";
import ShareDataSection from "./DataImportSection/ShareDataSection";
import SectionHeaderImport from "./DataImportSection/SectionHeaderImport";

const DataManualAddPage = () => {
  const [showLogin, setShowLogin] = useState(false); // manage, import

  const { user, userId, isLoggingIn } = useTracker(() => {
    const user = Meteor.user();
    const userId = Meteor.userId();
    const isLoggingIn = Meteor.loggingIn();

    return {
      user,
      userId,
      isLoggingIn,
    };
  });

  setButtonState("manage-link");

  let subtoken;
  useEffect(() => {
    subtoken = PubSub.subscribe("MANAGE_DATA", (msg, data) => {
      console.log("Getting data");
      if (!user && !isLoggingIn) {
        setShowLogin(true);
      }
    });
    return function cleanup() {
      PubSub.unsubscribe(subtoken);
    };
  }, [user, isLoggingIn]);

  useEffect(() => {
    if (user) {
      setShowLogin(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) setTimeout(() => FlowRouter.go("/manage-data"), 100);
  }, [user]);

  const SubHeader = () => {
    return (
      <>
        If you have Google timeline enabled, you can also{" "}
        <a href="/import-data" className="information-link">
          import your data
        </a>
        .
      </>
    );
  };

  return (
    <>
      <Modal isOpen={showLogin} closeModal={() => setShowLogin(false)}>
        <LoginSection />
      </Modal>
      <SectionHeaderImport
        header="Enter the places you've been."
        subHeader={<SubHeader />}
      />
      <DataManagementComponent
        renderState={"input-data"}
        user={user}
        userId={userId}
        isLoggingIn={isLoggingIn}
      />
      <ShareDataSection />
    </>
  );
};

export default DataManualAddPage;
