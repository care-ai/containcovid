import React from "react";
import dayjs from "dayjs";
import classnames from "classnames";
import "./style.css";

const VisitSection = ({ data, day, removeVisit, setEditVisitId, isImport }) => {
  return (
    <div className="location-row-wrapper">
      <div
        className={classnames({
          "unsaved-location-icon": true,
          hide: !data.dirty,
        })}
      ></div>
      <div className="location-row">
        <div>
          {data.removed ? (
            <strike>{dayjs(data.start).format("M-DD-YYYY")}</strike>
          ) : (
            dayjs(data.start).format("M-DD-YYYY")
          )}
        </div>
        <div>
          {data.removed ? (
            <strike>
              {dayjs(data.start).format("h:mma")} -
              {dayjs(data.end).format("h:mma")}
            </strike>
          ) : (
            `${dayjs(data.start).format("h:mma")} - ${dayjs(data.end).format(
              "h:mma"
            )}`
          )}
        </div>
        <div>
          <strong>
            {data.removed ? <strike>{data.name}</strike> : data.name}
          </strong>{" "}
          <br />
          {data.removed ? <strike>{data.address}</strike> : data.address}
        </div>
        <div className="div-block-4">
          {!isImport ? (
            <div
              className="edit-location-button bg-gray-3"
              onClick={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                setEditVisitId(data._id);
              }}
            >
              <div className="fa-icon"></div>
            </div>
          ) : null}
          <div
            className="delete-location-button bg-gray-3"
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              removeVisit(data._id, data.removed ? false : true);
            }}
          >
            <div className="fa-icon"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitSection;
