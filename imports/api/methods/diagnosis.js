import { Meteor } from "meteor/meteor";
import Diagnosis from "../../database/Diagnosis";

Meteor.methods({
  addOrEditDiagnostic: function (diagData) {
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
