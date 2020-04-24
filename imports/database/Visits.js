import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Visits = new Mongo.Collection("visits");

const Location = new SimpleSchema({
  type: {
    type: String,
    defaultValue: "Point",
  },
  coordinates: {
    type: Array,
    maxCount: 2,
    minCount: 2,
    label: "Longitude and latitude. Eg: [10.12312213, -17.4323125]",
  },
  "coordinates.$": Number,
  placeId: {
    type: String,
    label: "Google maps placeID",
  },
  address: {
    type: String,
    label: "Google maps identified address",
    optional: true,
  },
  name: {
    type: String,
    label: "Google maps place name",
    optional: true,
  },
});

const Duration = new SimpleSchema({
  start: {
    type: Number,
    label: "Start timestamp in miliseconds",
  },
  end: {
    type: Number,
    label: "End timestamp in miliseconds",
  },
});

const VisitsSchema = new SimpleSchema({
  visitId: {
    type: String,
    label: "Unique ID based on start and end ms dates and userId",
  },
  location: {
    type: Location,
    label: "Location visited",
  },
  duration: {
    type: Duration,
    label: "Time interval in ms for this visit",
  },
  placeConfidence: {
    type: String,
    label: "Google provided confidence in place",
  },
  visitConfidence: {
    type: Number,
    label: "Google provided confidence in visit",
  },
  userId: {
    type: String,
    label: "User ID",
  },
});

Visits.attachSchema(VisitsSchema);

if (Meteor.isServer) {
  Visits.rawCollection().createIndex({ visitId: -1 });
  Visits.rawCollection().createIndex({ userId: -1 });
  Visits.rawCollection().createIndex({ "duration.start": -1 });
  Visits.rawCollection().createIndex({ "duration.end": -1 });
  Visits.rawCollection().createIndex({ "location.placeId": -1 });
  Visits.rawCollection().createIndex({ location: "2dsphere" });
}
export default Visits;
