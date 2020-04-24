import { Meteor } from "meteor/meteor";
import dayjs from "dayjs";
import Visits from "../../database/Visits";
import Diagnosis from "../../database/Diagnosis";

const OVERFLOW_LIMIT = 1800000000;
const TO_SUBSTRACT = 4294967296;
const TO_DIVIDE = 10000000;

const parseLonLat = (number) => {
  if (number > OVERFLOW_LIMIT) number = number - TO_SUBSTRACT;

  return number / TO_DIVIDE;
};

Meteor.methods({
  importNewVisits: function (visits, diagnosed) {
    if (!this.userId) throw new Meteor.Error("You need to be logged in");
    console.log(diagnosed);
    if (!diagnosed) diagnosed = false;

    let parsedVisits = visits.map((v) => ({
      visitId: v._id + "-" + this.userId,
      location: {
        type: "Point",
        coordinates: [
          parseLonLat(v.location.longitudeE7),
          parseLonLat(v.location.latitudeE7),
        ],
        placeId: v.location.placeId,
        address: v.location.address,
        name: v.location.name,
      },
      duration: {
        start: parseInt(v.duration.startTimestampMs),
        end: parseInt(v.duration.endTimestampMs),
      },
      placeConfidence: v.placeConfidence,
      visitConfidence: v.visitConfidence,
      userId: this.userId,
    }));

    if (!parsedVisits.length) throw new Meteor.Error("No visits to import");

    Diagnosis.upsert(
      { userId: this.userId },
      { $set: { userId: this.userId, diagnosed } }
    );

    parsedVisits.forEach((v) => {
      let vis = Visits.findOne({ visitId: v.visitId });

      if (!vis) Visits.insert(v);
    });

    return `Inserted ${visits.length} visits`;
  },
  saveVisits: function (visits, diagnosed) {
    if (!this.userId) throw new Meteor.Error("You need to be logged in");
    if (!diagnosed) diagnosed = false;

    if (!visits.length) throw new Meteor.Error("No visits to import");

    let parsedVisits = visits.map(
      (v) =>
        console.log(v) || {
          visitId: v.visitId,
          location: {
            type: "Point",
            coordinates: [...v.location.coordinates],
            placeId: v.location.placeId,
            address: v.location.address,
            name: v.location.name,
          },
          duration: { ...v.duration },
          placeConfidence: v.placeConfidence,
          visitConfidence: v.visitConfidence,
          userId: this.userId,
          dirty: v.dirty,
          removed: v.removed,
        }
    );

    Meteor.users.update(
      {
        _id: this.userId,
      },
      {
        $set: {
          "profile.diagnosed": diagnosed,
        },
      }
    );

    parsedVisits.forEach((v) => {
      if (v.removed) Visits.remove({ visitId: v.visitId });
      else Visits.upsert({ visitId: v.visitId }, { $set: v });
    });

    return `Inserted or modified ${visits.length} visits`;
  },
  getAssessment: function (visits) {
    let parsedVisits = visits.map((v) => ({
      placeId: v.location.placeId,
      start: parseInt(v.duration.startTimestampMs),
      end: parseInt(v.duration.endTimestampMs),
    }));

    parsedVisits.forEach((pv) => {
      pv.placeExists = Visits.findOne({
        "location.placeId": pv.placeId,
        "duration.end": {
          $gt: dayjs(pv.start).subtract(1, "day").toDate().getTime(),
        },
      });
    });

    return parsedVisits.filter((pv) => pv.placeExists).length;
  },
  getAssessmentForCurrentUser: function () {
    let visits = Visits.find({
      userId: this.userId,
    }).fetch();

    let parsedVisits = visits.map((v) => ({
      placeId: v.location.placeId,
      start: parseInt(v.duration.start),
      end: parseInt(v.duration.end),
    }));

    parsedVisits.forEach((pv) => {
      pv.placeExists = Visits.findOne({
        "location.placeId": pv.placeId,
        "duration.end": {
          $gt: dayjs(pv.start).subtract(1, "day").toDate().getTime(),
        },
      });
    });

    return parsedVisits.filter((pv) => pv.placeExists).length;
  },
  getAllVisits: function () {
    let visits = Visits.find().fetch();
    console.log(visits.length);
    return visits.map((v) => ({
      _id: v._id,
      name: v.location.name,
      lat: v.location.coordinates[1],
      lng: v.location.coordinates[0],
    }));
  },
});
