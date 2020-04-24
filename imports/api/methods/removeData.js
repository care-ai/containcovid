import { Meteor } from "meteor/meteor";
import Diagnosis from "../../database/Diagnosis";
import Visits from "../../database/Visits";

Meteor.methods({
  deleteAllData: function () {
    let diag = Diagnosis.remove({ userId: this.userId });
    let vis = Visits.remove({ userId: this.userId });
  },
  deleteAccount: function () {
    Meteor.users.remove({ _id: this.userId });
  },
});
