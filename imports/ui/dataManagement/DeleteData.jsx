import React from "react";
import { useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import toastr from "../common/toastr";

const DeleteData = ({ setShowDeleteData }) => {
  const [confirm, setConfirm] = useState(false);
  const [operation, setOperation] = useState(null);

  const startOperation = (operation) => {
    setOperation(operation);
    setConfirm(true);
  };

  const runOperation = () => {
    switch (operation) {
      case "delete-data":
        deleteData();
        break;
      case "delete-account":
        deleteAccount();
        break;
      case "delete-both":
        deleteData();
        deleteAccount();
        break;
      default:
    }
  };

  const deleteData = () => {
    Meteor.call("deleteAllData", (e, r) => {
      console.log(e, r);
      if (!e) {
        toastr.success("Data removed");
        setShowDeleteData(false);
      }
    });
  };

  const deleteAccount = () => {
    Meteor.call("deleteAccount", (e, r) => {
      console.log(e, r);

      if (!e) {
        Meteor.logout();
        toastr.success("Account removed.");
        setShowDeleteData(false);
        FlowRouter.go("/");
      }
    });
  };

  return (
    <div className="content-width-small">
      <div className="panel">
        <div className="panel-body">
          <div className="space-bottom">
            <h1 className="card-heading-2 text-gray-5">Delete your data!</h1>
            {confirm ? (
              <>
                <div className="text-gray-4">
                  This operation is not reversible
                </div>
                <button
                  onClick={() => runOperation()}
                  className="button-4 button-large bg-gradient-4 w-button"
                >
                  Delete data
                </button>
              </>
            ) : (
              <>
                <div className=" text-gray-4 space-bottom">
                  This will remove your data from the server. You can remove
                  only the data, only the account or both.
                </div>
                <div className=" space-bottom">
                  <button
                    onClick={() => startOperation("delete-data")}
                    className="button-4 button-large bg-gradient-4 w-button"
                  >
                    Delete data
                  </button>
                </div>
                <div className=" space-bottom">
                  <button
                    onClick={() => startOperation("delete-account")}
                    className="button-4 button-large bg-gradient-4 w-button"
                  >
                    Delete account
                  </button>
                </div>
                <div className=" space-bottom">
                  <button
                    onClick={() => startOperation("delete-both")}
                    className="button-4 button-large bg-gradient-4 w-button"
                  >
                    Delete both
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteData;
