import React from "react";
import dayjs from "dayjs";
import Autocomplete from "react-google-autocomplete";
import { DateTimePicker } from "@material-ui/pickers";

const EditVisitSection = ({ data, day, editVisit, setEditVisitId }) => {
  const editPlace = (place) => {
    let name = place.address_components[0].long_name;
    let address = place.formatted_address;
    let placeId = place.place_id;
    let coordinates = [
      place.geometry.location.lng(),
      place.geometry.location.lat(),
    ];

    let editedPlace = {
      ...data,
      location: {
        ...data.location,
        placeId,
        address,
        name,
        coordinates,
      },
    };

    editVisit(data._id, editedPlace);
  };
  const editTime = (time, type) => {
    let parsedDate = dayjs(time).toDate();

    let duration = { start: data.start.getTime(), end: data.end.getTime() };
    duration[type] = parsedDate.getTime();

    if (type === "start" && duration.end < duration.start)
      duration.end = duration.start + 10 * 60 * 1000;
    if (type === "end" && duration.start > duration.end)
      duration.start = duration.end - 10 * 60 * 1000;

    editVisit(data._id, {
      ...data,
      duration: { ...data.duration, ...duration },
    });
  };

  return (
    <div className="content-width-small">
      <div className="panel">
        <div className="panel-body">
          <form
            onSubmit={(event) =>
              event.preventDefault() ||
              event.stopPropagation() ||
              setEditVisitId(null)
            }
          >
            <div className="places-autocomplete">
              <label>Location: </label>
              <Autocomplete
                className="w-input"
                onPlaceSelected={(place) => {
                  editPlace(place);
                }}
                types={["geocode"]}
                placeholder={data.name}
              />
            </div>
            <div className="start-date">
              {" "}
              <label>Start date: </label>
              <DateTimePicker
                classes={{
                  root: "space-bottom",
                }}
                InputProps={{
                  classes: { root: "w-input" },
                  disableUnderline: true,
                }}
                value={dayjs(data.start)}
                onChange={(date) => editTime(date, "start")}
              />
            </div>
            <div className="end-date">
              <label>End date: </label>
              <DateTimePicker
                classes={{
                  root: "space-bottom",
                }}
                InputProps={{
                  classes: { root: "w-input" },
                  disableUnderline: true,
                }}
                value={dayjs(data.end)}
                onChange={(date) => editTime(date, "end")}
              />
            </div>

            <div className="buttons">
              <button type="submit" className="button w-button w--current">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVisitSection;
