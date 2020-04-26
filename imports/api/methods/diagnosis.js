import { Meteor } from "meteor/meteor";
import Diagnosis from "../../database/Diagnosis";
import { check, Match } from "meteor/check";

Meteor.methods({
  addOrEditDiagnostic: function (diagData) {
    check(diagData, {
        diagnosed : Match.OneOf(Boolean, null),
        diagnosisDate : Date,
        symptomsDate : Date,
        symptoms : [String]
    });
    Diagnosis.upsert({ userId: this.userId }, { $set: diagData });
  },
  getSymptoms: function () {
    return [
      {
        id: "fever",
        name: "Fever",
      },
      {
        id: "dry-cough",
        name: "Dry cough",
      },
      {
        id: "fatigue",
        name: "Fatigue",
      },
      {
        id: "breath-shortness",
        name: "Shortness of breath",
      },
      {
        id: "chest-pain",
        name: "Chest pain or pressure",
      },
      {
        id: "confusion",
        name: "New confusion",
      },
      {
        id: "blue-lips",
        name: "Bluish lips or face",
      },
      {
        id: "sore-throat",
        name: "Sore throat",
      },
    ];
  },
});
