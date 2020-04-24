import React from "react";
import { DatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";

const DiagnosisModal = ({
  closeModal,
  diagnosed,
  setDiagnosed,
  diagnosisDate,
  setDiagnosisDate,
}) => {
  return (
    <div className="content-width-small">
      <div className="panel">
        <div className="panel-body">
          <form
            className="form-2 form-3"
            onSubmit={(event) =>
              event.preventDefault() || event.stopPropagation() || closeModal()
            }
          >
            <label htmlFor="test-result">Test result</label>
            <label className="w-checkbox checkbox-field">
              <input
                checked={diagnosed === null}
                onChange={() => setDiagnosed(null)}
                type="checkbox"
                value={"not-diagnosed"}
                name="test-result"
                className="w-checkbox-input checkbox"
              />
              <span className="checkbox-label w-form-label">Not taken</span>
            </label>
            <label className="w-checkbox checkbox-field">
              <input
                checked={diagnosed === false}
                onChange={() => setDiagnosed(false)}
                type="checkbox"
                value={"not-diagnosed"}
                name="test-result"
                className="w-checkbox-input checkbox"
              />
              <span className="checkbox-label w-form-label">Negative</span>
            </label>
            <label className="w-checkbox checkbox-field">
              <input
                checked={diagnosed === true}
                onChange={() => setDiagnosed(true)}
                type="checkbox"
                value={"not-diagnosed"}
                name="test-result"
                className="w-checkbox-input checkbox"
              />
              <span className="checkbox-label w-form-label">Positive</span>
            </label>

            <label htmlFor="test-date">Test result date</label>
            <DatePicker
              classes={{
                root: "space-bottom",
              }}
              InputProps={{
                classes: { root: "w-input" },
                disableUnderline: true,
              }}
              name="test-date"
              value={dayjs(diagnosisDate)}
              onChange={(date) => setDiagnosisDate(date)}
            />
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

export default DiagnosisModal;
