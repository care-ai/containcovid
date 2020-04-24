import { Meteor } from "meteor/meteor";
import Visits from "../../database/Visits";

Meteor.publish({
  visitsForUser: function () {
    if (!this.userId) return [];

    return Visits.find(
      { userId: this.userId },
      { sort: { "duration.end": -1 } }
    );
  },
});
