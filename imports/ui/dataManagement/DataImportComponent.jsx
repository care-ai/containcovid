import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import Loader from "react-loader";
import toastr from "../common/toastr";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { setButtonState } from "../common/utils";

import VisitSection from "./VisitSection";
import HomeAddressSection from "./HomeAddressSection";
import PubSub from "pubsub-js";
import dayjs from "dayjs";

import _ from "lodash";
import EmptyTextMessageRow from "./EmptyTextMessageRow";

const DataImportComponent = ({
  user,
  uploadedZip,
  isAssessing,
  setAssessment,
  setPageState,
}) => {
  const [files, setFiles] = useState([]);
  const [homeAddresses, setHomeAddresses] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [shouldUpload, setShouldUpload] = useState(false);

  useEffect(() => {
    if (!isAssessing && files.length) setButtonState("share-data");
    else if (isAssessing && files.length) setButtonState("risk-assessment");
    else setButtonState("manage-link");
  }, [files]);

  useEffect(() => {
    if (user && shouldUpload) uploadData(files);
  }, [user, shouldUpload, files]);

  let subtoken;
  useEffect(() => {
    if (uploadedZip) {
      readZipFile(uploadedZip);
      setProcessing(true);
    }
  }, [uploadedZip]);

  useEffect(() => {
    subtoken = PubSub.subscribe("MANAGE_DATA", (msg, data) => {
      if (isAssessing && data === "assess") {
        getAssessment(files);
      } else if (user) {
        uploadData(files);
      } else {
        setShouldUpload(true);
      }
    });
    return function cleanup() {
      PubSub.unsubscribe(subtoken);
    };
  }, [files, user, isAssessing]);

  const getVisits = (visits) => {
    let final = visits.map((mp) => ({
      key: mp._id,
      _id: mp._id,
      name: mp.location.name,
      address: mp.location.address,
      start: new Date(parseInt(mp.duration.startTimestampMs)),
      end: new Date(parseInt(mp.duration.endTimestampMs)),
      full: mp,
      removed: mp.removed,
    }));

    sorted = _.sortBy(final, (f) => dayjs(f.start)).reverse();

    return sorted;
  };

  const readJSONFile = (array) => {
    let filtered = array.filter((otl) => otl.placeVisit);

    let mapped = filtered
      .map((f) => f.placeVisit)
      .filter(
        (f) =>
          parseInt(f.duration.endTimestampMs) >
          new Date().getTime() - 8 * 7 * 24 * 60 * 60 * 1000 //8 weeks
      )
      .map((f) => ({
        _id: f.duration.startTimestampMs + "-" + f.duration.endTimestampMs,
        removed: false,
        ...f,
      }));

    let homeAd = _.uniqBy(
      mapped.filter((m) => m.location.semanticType === "TYPE_HOME"),
      (a) => a.location.placeId
    );

    setHomeAddresses(homeAd);
    setFiles(mapped);
    setProcessing(false);
  };

  const readZipFile = (file) => {
    zip.createReader(new zip.BlobReader(file), function (reader) {
      reader.getEntries(function (entries) {
        //we only need last two months
        let year = dayjs().format("YYYY");
        let currentMonth = dayjs().format("MMMM").toUpperCase();
        let lastMonth = dayjs()
          .subtract(1, "month")
          .format("MMMM")
          .toUpperCase();

        let files = entries.filter(
          (e) =>
            e.filename.search(`${year}_${currentMonth}`) > -1 ||
            e.filename.search(`${year}_${lastMonth}`) > -1
        );

        if (!files.length) {
          toastr.error(
            "The zip file is either not a google takeout file or it is old. Please follow the instructions on exporting a proper archive."
          );
          setProcessing(false);

          return;
        }
        let arr = [];
        // needs error messages when data is empty
        //hacky but a quick fix
        switch (files.length) {
          case 0:
            break;
          case 1:
            files[0].getData(new zip.TextWriter(), function (text) {
              arr = arr.concat(JSON.parse(text).timelineObjects);
              readJSONFile(arr);
            });
            break;
          case 2:
            files[0].getData(new zip.TextWriter(), function (text) {
              arr = arr.concat(JSON.parse(text).timelineObjects);
              files[1].getData(new zip.TextWriter(), function (text) {
                arr = arr.concat(JSON.parse(text).timelineObjects);
                readJSONFile(arr);
              });
            });
            break;
        }
      });
    });
  };

  const getAssessment = (files) => {
    let visits = files.filter((v) => !v.removed);
    if (!visits.length) {
      toastr.error("You need at least one visit!");
      return;
    }

    Meteor.call("getAssessment", visits, (e, r) => {
      if (!e) {
        if (r === 0) setAssessment("safe");
        if (r > 0 && r <= 3) setAssessment("moderate");
        if (r > 3) setAssessment("dangerous");

        setButtonState("sign-up");
      }
    });
  };

  const uploadData = (files) => {
    if (!user) return;
    let visits = files.filter((v) => !v.removed);
    if (!visits.length) return;

    Meteor.call("importNewVisits", visits, !isAssessing, (e, r) => {
      if (!e) {
        toastr.success("Visits saved");
        setFiles([]);
        setShouldUpload(false);
        if (setPageState) setPageState("manage");
        else FlowRouter.go("/manage-data");
      } else {
        console.log(e);
      }
    });
  };

  const removeVisitFromFiles = (visitId, remove) => {
    let visits = [...files];
    let visit = visits.find((v) => v._id === visitId);

    if (remove) visit.removed = true;
    else visit.removed = false;
    setFiles(visits);
  };

  const removeAddressInBulk = (visitId, remove) => {
    let visits = [...files];
    let visit = visits.find((v) => v._id === visitId);

    visits.forEach((v) => {
      if (v.location.placeId === visit.location.placeId) {
        if (remove) v.removed = true;
        else v.removed = false;
      }
    });

    setFiles(visits);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="location-day">
          {files.length ? (
            <>
              <div className="location-day-header">
                <h3 id="edit-data" className="heading-2 add-location-header">
                  {!isAssessing ? "Edit Your Data Donation" : "Edit Data"}
                </h3>
              </div>
              <Loader loaded={!processing}>
                <>
                  {homeAddresses.length ? (
                    <div className="section">
                      <div className="container">
                        <h3 className="heading-2 no-bottom-space">
                          Home address detected
                        </h3>
                        <p className="paragraph">
                          We found an address identified as home address in the
                          data. Do you want to remove it from everywhere?
                        </p>
                        {homeAddresses.map((fd) => (
                          <HomeAddressSection
                            key={fd._id}
                            visit={fd}
                            removeVisit={() =>
                              removeAddressInBulk(
                                fd._id,
                                fd.removed ? false : true
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <div className="panel">
                    <div className="panel-body locations-panel">
                      <div className="location-row location-title-row">
                        <div>Date</div>
                        <div>Time</div>
                        <div>Place</div>
                        <div id="w-node-3fd041fd35c6-16dc0643">Address</div>
                      </div>
                      {!files.length ? (
                        <EmptyTextMessageRow message="Import a Google Takeout zip file to get your history" />
                      ) : null}
                      {getVisits(files).map((dv) => (
                        <VisitSection
                          key={`el-${dv._id}`}
                          data={dv}
                          removeVisit={removeVisitFromFiles}
                          isImport={true}
                        />
                      ))}
                    </div>
                  </div>
                </>
              </Loader>{" "}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DataImportComponent;
