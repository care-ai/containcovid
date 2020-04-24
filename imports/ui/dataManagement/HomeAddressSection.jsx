import React from "react";
import dayjs from "dayjs";

const HomeAddressSection = ({ visit, removeVisit }) => {
  return (
    <div className="location-day">
      <div className="location-row-inner home-address">
        <div className="places-autocomplete">
          {visit.removed ? (
            <strike>{visit.location.name}</strike>
          ) : (
            visit.location.name
          )}
        </div>
        <div className="places-autocomplete">
          {visit.removed ? (
            <strike>{visit.location.address}</strike>
          ) : (
            visit.location.address || "Unknown address"
          )}
        </div>
        <div className="buttons">
          <button
            className="remove-location-button w-button"
            onClick={removeVisit}
          >
            {visit.removed ? "Add" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeAddressSection;
