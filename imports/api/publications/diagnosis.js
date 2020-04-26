import { Meteor } from "meteor/meteor";
import Diagnosis from "../../database/Diagnosis";

Meteor.publish({
  diagnosticForUser: function () {
    if (!this.userId) return [];
    // @TODO Restrict fields
    return Diagnosis.find({ userId: this.userId });
  },
});
