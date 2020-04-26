import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import toastr from "../common/toastr";
import _ from "lodash";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { setButtonState } from "../common/utils";

import LoginSection from "../dataManagement/LoginSection";
import Modal from "../common/components/Modal";
import SectionHeaderImport from "../dataManagement/DataImportSection/SectionHeaderImport";
import UploadBoxSection from "../dataManagement/DataImportSection/UploadBoxSection";
import ShareDataSection from "../dataManagement/DataImportSection/ShareDataSection";
import DataImportComponent from "../dataManagement/DataImportComponent";
import RiskHeader from "./RIskHeader";
import ShowIfNoFiles from "../common/ShowIfNoFiles";

const RiskAssessmentPage = () => {
  const [uploadedZip, setUploadedZip] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [assessment, setAssessment] = useState(false);

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
  useEffect(() => {
    if (user) setTimeout(() => FlowRouter.go("/manage-data"), 100);
  }, [user]);
  let subtoken;

  useEffect(() => {
    subtoken = PubSub.subscribe("MANAGE_DATA", (msg, data) => {
      console.log(user, isLoggingIn, assessment);
      if (!user && !isLoggingIn && assessment) {
        setShowLogin(true);
      }
    });
    return function cleanup() {
      PubSub.unsubscribe(subtoken);
    };
  }, [user, isLoggingIn, assessment]);

  useEffect(() => {
    if (user) {
      setShowLogin(false);
    }
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
        We can also notify you if we learn more about your area in the future.
      </>
    );
  };

  return (
    <>
      <Modal isOpen={showLogin} closeModal={() => setShowLogin(false)}>
        <LoginSection />
      </Modal>
      <SectionHeaderImport
        header="Check if You're at Risk"
        subHeader={<SubHeader />}
      />
      {assessment ? (
        <RiskHeader assessment={assessment} />
      ) : (
        <>
          <ShowIfNoFiles>
            <UploadBoxSection
              headerText={"Upload your "}
              pageState={"import"}
              onFileUpload={onFileUpload}
              user={user}
            />
          </ShowIfNoFiles>
          <DataImportComponent
            isAssessing={assessment === false}
            setAssessment={setAssessment}
            user={user}
            userId={userId}
            isLoggingIn={isLoggingIn}
            uploadedZip={uploadedZip}
          />{" "}
        </>
      )}
      <ShareDataSection />
    </>
  );
};

export default RiskAssessmentPage;
