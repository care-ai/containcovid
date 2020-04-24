import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import toastr from "../common/toastr";
import { setButtonState } from "../common/utils";

import IntroSection from "./IntroSection";
import DataImportComponent from "./DataImportComponent";
import DataManagementComponent from "./DataManagementComponent";
import LoginSection from "./LoginSection";
import Modal from "../common/components/Modal";

const DataManagementPage = () => {
  let allowedStates = ["manage", "import"];
  let state = FlowRouter.getQueryParam("state");
  if (!allowedStates.includes(state)) state = null;

  const [uploadedZip, setUploadedZip] = useState(null);
  const [pageState, setPageState] = useState(state ? state : "manage"); // manage, import
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
  let subtoken;
  useEffect(() => {
    subtoken = PubSub.subscribe("MANAGE_DATA", (msg, data) => {
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
    if (!user && !isLoggingIn) {
      setShowLogin(true);
    }
  }, [user]);

  setButtonState("manage-save");

  const isImport = () => pageState === "import";

  const onFileUpload = (event) => {
    let file;
    if (event.dataTransfer) file = event.dataTransfer.files[0];
    else file = event.target.files[0];

    if (
      file.type !== "application/x-zip-compressed" &&
      file.type !== "application/zip"
    ) {
      toastr.error("You must upload a zip file");
      return;
    }

    setUploadedZip(file);

    setPageState("import");
  };

  return (
    <>
      <Modal
        isOpen={showLogin}
        closeModal={() => (user ? setShowLogin(false) : () => {})}
      >
        <LoginSection />
      </Modal>

      <IntroSection
        headerText={isImport() ? "Import your data" : "Manage your data"}
        pageState={pageState}
        setPageState={setPageState}
        onFileUpload={onFileUpload}
        user={user}
      />

      {isImport() ? (
        <DataImportComponent
          user={user}
          userId={userId}
          isLoggingIn={isLoggingIn}
          uploadedZip={uploadedZip}
          setPageState={setPageState}
        />
      ) : (
        <DataManagementComponent
          user={user}
          userId={userId}
          isLoggingIn={isLoggingIn}
        />
      )}
    </>
  );
};

export default DataManagementPage;
