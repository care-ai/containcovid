import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Diagnosis = new Mongo.Collection("diagnostics");

const DiagnosisSchema = new SimpleSchema({
  userId: {
    type: String,
    label: "The id of the user",
  },
  diagnosed: {
    type: Boolean,
    label: "Is this user diagnosed with COVID-19",
    defaultValue: false,
  },
  diagnosisDate: {
    type: Date,
    optional: true,
    label: "The date this user was diagnosed",
  },
  symptomsDate: {
    type: Date,
    optional: true,
    label: "The date this user first felt symptoms",
  },
  symptoms: {
    type: Array,
    optional: true,
    label: "Symptoms array",
  },
  "symptoms.$": {
    type: String,
    optional: true,
    label: "Symptom id",
  },
});

Diagnosis.attachSchema(DiagnosisSchema);

export default Diagnosis;
