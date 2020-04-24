import React, { useState } from "react";
import dayjs from "dayjs";
import Autocomplete from "react-google-autocomplete";
import { DateTimePicker } from "@material-ui/pickers";

import toastr from "../common/toastr";

const AddVisitSection = ({ addVisit, setIsAddingVisit }) => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [place, setPlace] = useState(null);

  const saveVisit = () => {
    let visit = {};
    if (!place) {
      toastr.error("You need to add a place for your visit");
      return;
    }
    let name = place.address_components[0].long_name;
    let address = place.formatted_address;
    let placeId = place.place_id;
    let coordinates = [
      place.geometry.location.lng(),
      place.geometry.location.lat(),
    ];

    visit.location = {
      coordinates,
      placeId,
      address,
      name,
    };
    visit.duration = {
      start: start.getTime(),
      end: end.getTime(),
    };

    addVisit(visit);
  };

  const setEndDate = (date) => {
    let parsedDate = dayjs(date).toDate();
    if (start > parsedDate)
      setStart(new Date(parsedDate.getTime() - 10 * 60 * 1000));
    setEnd(parsedDate);
  };

  const setStartDate = (date) => {
    let parsedDate = dayjs(date).toDate();

    if (end < parsedDate)
      setEnd(new Date(parsedDate.getTime() + 10 * 60 * 1000));
    setStart(parsedDate);
  };

  return (
    <div className="content-width-small">
      <div className="panel">
        <div className="panel-body">
          <form
            onSubmit={(event) =>
              event.stopPropagation() || event.preventDefault() || saveVisit()
            }
          >
            <div className="places-autocomplete">
              <label>Location: </label>
              <Autocomplete
                className="w-input"
                onPlaceSelected={(place) => {
                  setPlace(place);
                }}
                types={["geocode"]}
              />
            </div>
            <div className="start-date">
              {" "}
              <label>Start date: </label>
              <DateTimePicker
                classes={{
                  root: "space-bottom date-time",
                }}
                InputProps={{
                  classes: { root: "w-input" },
                  disableUnderline: true,
                }}
                value={dayjs(start)}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="end-date">
              <label>End date: </label>
              <DateTimePicker
                classes={{
                  root: "space-bottom date-time",
                }}
                InputProps={{
                  classes: { root: "w-input" },
                  disableUnderline: true,
                }}
                value={dayjs(end)}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="buttons addVisit">
              <button
                type="reset"
                className="button cancel w-button w--current"
                onClick={() => setIsAddingVisit(false)}
              >
                Cancel
              </button>
              <button type="submit" className="button save w-button w--current">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVisitSection;
