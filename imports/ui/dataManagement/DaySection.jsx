import React from "react";
import VisitSection from "./VisitSection";
import EditVisitSection from "./EditVisitSection";
import "react-datepicker/dist/react-datepicker.css";

const DaySection = ({
  files,
  removeVisit,
  editVisit,
  isImport,
  editVisitId,
  setEditVisitId,
}) => {
  return (
    <>
      {files.map((dv) =>
        editVisitId === dv._id ? (
          <EditVisitSection
            key={`ev-${dv._id}`}
            data={dv}
            editVisit={editVisit}
            setEditVisitId={setEditVisitId}
          />
        ) : (
          <VisitSection
            key={`el-${dv._id}`}
            data={dv}
            removeVisit={removeVisit}
            setEditVisitId={setEditVisitId}
            isImport={isImport}
          />
        )
      )}
    </>
  );
};

export default DaySection;
