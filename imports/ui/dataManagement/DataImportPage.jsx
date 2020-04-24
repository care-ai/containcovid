import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import toastr from "../common/toastr";
import _ from "lodash";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import DataImportComponent from "./DataImportComponent";
import LoginSection from "./LoginSection";
import Modal from "../common/components/Modal";
import SectionHeaderImport from "./DataImportSection/SectionHeaderImport";
import UploadBoxSection from "./DataImportSection/UploadBoxSection";
import ShareDataSection from "./DataImportSection/ShareDataSection";

const DataImportPage = () => {
  const [uploadedZip, setUploadedZip] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

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
    if (user) setTimeout(() => FlowRouter.go("/manage-data"), 100);
  }, [user]);
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
  };

  const SubHeader = () => {
    return (
      <>
        If you don't have Google timeline enabled, you can{" "}
        <a href="/input-data" className="information-link">
          enter your data manually
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
        header="Upload Your Google Location History"
        subHeader={<SubHeader />}
      />
      <UploadBoxSection
        headerText={"Upload your "}
        pageState={"import"}
        onFileUpload={onFileUpload}
        user={user}
      />
      <DataImportComponent
        user={user}
        userId={userId}
        isLoggingIn={isLoggingIn}
        uploadedZip={uploadedZip}
      />
      <ShareDataSection />
    </>
  );
};

export default DataImportPage;
