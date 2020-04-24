import React from "react";
import { DatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";

const SymptomsModal = ({
  closeModal,
  symptoms = [],
  setSymptoms,
  symptomsDate,
  setSymptomsDate,
  symptomList,
}) => {
  const toggleSymptoms = (event) => {
    let sym = [...symptoms];

    let foundSym = sym.includes(event.target.value);

    if (foundSym) sym.splice(sym.indexOf(event.target.value), 1);
    else sym = [...sym, event.target.value];

    setSymptoms(sym);
  };
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
            {" "}
            <label htmlFor="symptomsDate">First symptoms date</label>
            <DatePicker
              classes={{
                root: "space-bottom",
              }}
              InputProps={{
                classes: { root: "w-input" },
                disableUnderline: true,
              }}
              name="symptomsDate"
              value={dayjs(symptomsDate)}
              onChange={(date) => setSymptomsDate(date)}
            />
            <br />
            <label>Symptoms</label>
            {symptomList.map((s) => {
              return (
                <label key={s.id} className="w-checkbox checkbox-field">
                  <input
                    checked={symptoms.indexOf(s.id) > -1}
                    onChange={toggleSymptoms}
                    type="checkbox"
                    value={s.id}
                    name="symptoms"
                    className="w-checkbox-input checkbox"
                  />
                  <span className="checkbox-label w-form-label">{s.name}</span>
                </label>
              );
            })}
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

export default SymptomsModal;
