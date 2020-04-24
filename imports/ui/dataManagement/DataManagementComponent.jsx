import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import toastr from "../common/toastr";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { setButtonState } from "../common/utils";

import PubSub from "pubsub-js";
import Loader from "react-loader";
import Visits from "../../database/Visits";
import dayjs from "dayjs";

import VisitSection from "./VisitSection";
import EditVisitSection from "./EditVisitSection";
import AddVisitSection from "./AddVisitSection";
import _ from "lodash";
import EmptyTextMessageRow from "./EmptyTextMessageRow";
import Modal from "../common/components/Modal";
import DeleteData from "./DeleteData";

const getEmptyVisit = () => ({
  _id: Random.id(),
  visitId: Random.id(),
  location: {
    type: "Point",
    coordinates: [0, 0],
    placeId: "",
    address: "",
    name: "",
  },
  duration: {
    start: 0,
    end: 0,
  },
  placeConfidence: 0,
  visitConfidence: 0,
  userId: Meteor.userId(),
  dirty: true,
});

const DataManagementComponent = ({
  user,
  userId,
  isLoggingIn,
  renderState,
}) => {
  const [files, setFiles] = useState([]);
  const [editVisitId, setEditVisitId] = useState(null);
  const [isAddingVisit, setIsAddingVisit] = useState(false);
  const [showDeleteData, setShowDeleteData] = useState(false);
  const [shouldUpload, setShouldUpload] = useState(false);

  useEffect(() => {
    if (user && shouldUpload) saveData(files);
  }, [user, shouldUpload, files]);

  const isInput = () => renderState === "input-data";

  useEffect(() => {
    if (renderState === "input-data" && files.length)
      setButtonState("share-data");
    else if (renderState === "input-data") setButtonState("manage-link");
    else setButtonState("manage-save");
  }, [files]);

  let subtoken;

  useEffect(() => {
    subtoken = PubSub.subscribe("MANAGE_DATA", (msg, data) => {
      if (user) {
        saveData(files);
      } else {
        setShouldUpload(true);
      }
    });
    return function cleanup() {
      PubSub.unsubscribe(subtoken);
    };
  }, [files, user]);

  const { loaded } = useTracker(() => {
    if (!userId) return { loaded: true };
    if (!isInput()) {
      const visitsSubscription = Meteor.subscribe("visitsForUser");

      if (visitsSubscription.ready()) {
        let visits = Visits.find({ userId }).fetch();
        setFiles(visits);
      }
      return {
        loaded: visitsSubscription.ready(),
      };
    } else {
      return { loaded: true };
    }
  }, [userId]);

  const getVisits = (visits) => {
    let final = visits.map((mp) => ({
      key: mp._id,
      _id: mp._id,
      name: mp.location.name,
      address: mp.location.address,
      start: new Date(parseInt(mp.duration.start)),
      end: new Date(parseInt(mp.duration.end)),
      removed: mp.removed,
      dirty: mp.dirty,
    }));

    sorted = _.sortBy(final, (f) => dayjs(f.start)).reverse();

    return sorted;
  };

  const editVisit = (visitId, changes) => {
    let fileArray = [...files];
    visitIndex = files.findIndex((f) => f._id === visitId);

    fileArray[visitIndex] = {
      ...fileArray[visitIndex],
      ...changes,
      ...{ dirty: true },
    };
    setFiles(fileArray);
    toastr.success("Visit modified");
  };

  const addVisit = (visit) => {
    let fileArray = [...files];

    let newVisit = { ...getEmptyVisit(), ...visit };

    setFiles([...fileArray, newVisit]);
    setIsAddingVisit(false);
    toastr.success("Visit added");
  };

  const saveData = (files) => {
    let visits = files.filter((f) => f.dirty);
    let diagnosed = true;
    Meteor.call("saveVisits", visits, diagnosed, (e, r) => {
      if (!e) {
        setFiles(
          [...files]
            .filter((f) => !f.removed)
            .map((v) => ({ ...v, dirty: false }))
        );
        toastr.success("Visits saved");
        setShouldUpload(false);

        if (isInput()) FlowRouter.go("/manage-data");
      }
      console.log(e, r);
    });
  };

  const removeVisitFromFiles = (visitId, remove) => {
    let visits = [...files];
    let visit = visits.find((v) => v._id === visitId);

    if (remove) {
      visit.removed = true;
      visit.dirty = true;
      toastr.success("Visit marked for removal");
    } else {
      visit.removed = false;
      visit.dirty = false;
      toastr.success("Visit will not be removed");
    }

    setFiles(visits);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="location-day">
          {!user && !isInput() ? (
            <EmptyTextMessageRow message="You must be logged in to see your history" />
          ) : (
            <>
              <div className="location-day-header">
                <h3 className="heading-2 location-day">
                  {!isInput
                    ? "Where You&#x27;ve Been"
                    : "Places you've been in the past two weeks"}
                </h3>
                &nbsp;
                <button
                  onClick={() => setIsAddingVisit(true)}
                  className="add-location-button w-button"
                >
                  Add a visit
                </button>
              </div>
              <Modal
                isOpen={isAddingVisit}
                closeModal={() => setIsAddingVisit(false)}
              >
                <AddVisitSection
                  addVisit={addVisit}
                  setIsAddingVisit={setIsAddingVisit}
                />
              </Modal>
              <div className="panel">
                <div className="panel-body locations-panel">
                  <div className="location-row location-title-row">
                    <div>Date</div>
                    <div>Time</div>
                    <div>Place</div>
                  </div>
                  <Loader loaded={loaded}>
                    {files.length ? (
                      <>
                        {getVisits(files).map((dv) =>
                          editVisitId === dv._id ? (
                            <Modal
                              key={dv._id}
                              isOpen={true}
                              closeModal={() => setEditVisitId(null)}
                            >
                              <EditVisitSection
                                key={`ev-${dv._id}`}
                                data={dv}
                                editVisit={editVisit}
                                setEditVisitId={setEditVisitId}
                              />
                            </Modal>
                          ) : (
                            <VisitSection
                              key={`el-${dv._id}`}
                              data={dv}
                              removeVisit={removeVisitFromFiles}
                              setEditVisitId={setEditVisitId}
                              isImport={false}
                            />
                          )
                        )}
                      </>
                    ) : !isInput() ? (
                      <EmptyTextMessageRow message="You have no visits in your account" />
                    ) : null}
                    {!isInput() ? (
                      <div className="delete-date">
                        <a
                          href="#"
                          className="red-link-delete"
                          onClick={(event) =>
                            event.preventDefault() || setShowDeleteData(true)
                          }
                        >
                          Delete data
                        </a>
                      </div>
                    ) : null}
                    <Modal
                      isOpen={showDeleteData}
                      closeModal={() => setShowDeleteData(false)}
                    >
                      <DeleteData setShowDeleteData={setShowDeleteData} />
                    </Modal>
                  </Loader>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataManagementComponent;
