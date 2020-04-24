import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import "./diagnosisSection.css";
import Diagnosis from "../../database/Diagnosis";
import DiagnosisModal from "./DiagnosisSection/DiagnosisModal";
import SymptomsModal from "./DiagnosisSection/SymptomsModal";
import Modal from "../common/components/Modal";

const DiagnosisSection = () => {
  const [symptomList, setSymptomList] = useState([]);
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
  const getAssessmentText = () => {
    if (assessment === false)
      return ["Loading assessment", "We are checking places you've been to"];
    if (assessment === 0)
      return [
        "Stay at Home",
        "We don't have enough data from your region to determine your risk level",
      ];
    if (assessment <= 3)
      return [
        "Moderate",
        "You have been in some places marked as a potential source of infection",
      ];

    return [
      "Call the emergency line",
      "You have had several potential contacts with infected people. Call a doctor now!",
    ];
  };
  useEffect(() => {
    Meteor.call("getSymptoms", (e, r) => {
      if (!e) setSymptomList(r);
    });
  }, []);

  useEffect(() => {
    if (user)
      Meteor.call("getAssessmentForCurrentUser", (e, r) => {
        if (!e) setAssessment(r);
      });
  }, [user]);

  const [error, setError] = useState(null);
  const [diagnosed, setDiagnosed] = useState(null);
  const [diagnosisDate, setDiagnosisDate] = useState(new Date());
  const [symptomsDate, setSymptomsDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState([]);
  const [isDirty, setDirty] = useState(false);
  const [isDModalOpen, setDModalOpen] = useState(false);
  const [isSModalOpen, setSModalOpen] = useState(false);

  const getSymptoms = () => {
    if (!symptomList.length) return "Loading";
    return symptomList
      .filter((s) => symptoms.includes(s.id))
      .map((s) => s.name)
      .join(", ");
  };

  const { isLoading } = useTracker(() => {
    if (!userId) return { isLoading: true };

    const diagnosticSub = Meteor.subscribe("diagnosticForUser");

    if (diagnosticSub.ready()) {
      let diagnostic = Diagnosis.findOne({ userId });
      if (diagnostic) {
        setDiagnosed(diagnostic.diagnosed);
        setDiagnosisDate(diagnostic.diagnosisDate);
        setSymptomsDate(diagnostic.symptomsDate);
        setSymptoms(diagnostic.symptoms);
      }
    }

    return {
      isLoading: !diagnosticSub.ready(),
    };
  }, [userId]);

  useEffect(() => {
    subtoken = PubSub.subscribe("MANAGE_DATA", (msg, data) => {
      if (data === "save" && user) {
        saveDiagnostic(diagnosed, diagnosisDate, symptomsDate, symptoms);
      }
    });
    return function cleanup() {
      PubSub.unsubscribe(subtoken);
    };
  }, [user]);

  saveDiagnostic = (diagnosed, diagnosisDate, symptomsDate, symptoms) => {
    Meteor.call(
      "addOrEditDiagnostic",
      {
        diagnosed,
        diagnosisDate,
        symptomsDate,
        symptoms,
      },
      (e, r) => {
        if (!e) setDirty(false);
        console.log(e, r);
      }
    );
  };

  return (
    <>
      {" "}
      <div className="panel">
        <div className="panel-body">
          <h4 className="heading-4">Your risk assessment</h4>
          <div>
            <h1 className="display-heading-4 space-bottom-small">
              {getAssessmentText()[0]}
            </h1>
            <div>{getAssessmentText()[1]}</div>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-body">
          <div>
            <h4 className="heading-4">Your information</h4>
            <div className="diagnosed-status">
              <span className="status text-span-9">Diagnosis: </span>
              {diagnosed === null
                ? "Not currently diagnosed"
                : diagnosed
                ? "Positive"
                : "Negative"}{" "}
              <a
                href="#"
                onClick={() => event.preventDefault() || setDModalOpen(true)}
                className="information-link"
              >
                Change this &gt;
              </a>
            </div>
            <div className="diagnosed-status">
              <span className="status text-span-9">Symptoms: </span>
              {symptoms && symptoms.length
                ? getSymptoms()
                : "No symptoms."}{" "}
              <a
                href="#"
                onClick={() => event.preventDefault() || setSModalOpen(true)}
                className="information-link"
              >
                Change this &gt;
              </a>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isDModalOpen} closeModal={() => setDModalOpen(false)}>
        <DiagnosisModal
          closeModal={() => setDModalOpen(false)}
          diagnosed={diagnosed}
          setDiagnosed={setDiagnosed}
          diagnosisDate={diagnosisDate}
          setDiagnosisDate={setDiagnosisDate}
        />
      </Modal>
      <Modal isOpen={isSModalOpen} closeModal={() => setSModalOpen(false)}>
        <SymptomsModal
          closeModal={() => setSModalOpen(false)}
          symptoms={symptoms}
          setSymptoms={setSymptoms}
          symptomsDate={symptomsDate}
          setSymptomsDate={setSymptomsDate}
          symptomList={symptomList}
        />
      </Modal>
    </>
  );
};

export default DiagnosisSection;
