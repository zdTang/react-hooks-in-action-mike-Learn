import React, { useReducer, Fragment } from "react";
import { FaArrowRight } from "react-icons/fa";
import reducer from "./reducer";
import data from "../../static.json";
const { bookables, sessions, days } = data;

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables,
};

export default function BookablesList() {
  // those states are guaranteed by the React to be the latest State.
  const [{ group, bookableIndex, bookables, hasDetails }, dispatch] =
    useReducer(reducer, initialState);

  //const { group, bookableIndex, bookables, hasDetails } = state; // use this one to init all STATEs, VERY GOOD!

  const groups = [...new Set(bookables.map((b) => b.group))];

  console.log("start to run function BookableList--");
  console.log("--Into BookableList");

  const bookablesInGroup = bookables.filter((b) => b.group === group);

  console.log(`group is ${group}`);
  console.dir(`bookablesInGroup is ${bookablesInGroup}`);
  console.log(`bookableIndex is ${bookableIndex}`);

  const bookable = bookablesInGroup[bookableIndex]; //the item user specified

  function changeGroup(event) {
    dispatch({ type: "SET_GROUP", payload: event.target.value });
  }

  function changeBookable(selectedIndex) {
    dispatch({ type: "SET_BOOKABLE", payload: selectedIndex });
  }

  // this function will do the trick to cycle the options
  function nextBookable() {
    dispatch({ type: "NEXT_BOOKABLE" }); // No payload
  }

  function toggleDetails() {
    dispatch({ type: "TOGGLE_HAS_DETAILS" });
  }

  console.log("render bookableList");
  return (
    <Fragment>
      <div>
        {/*bookable group List */}
        <select value={group} onChange={changeGroup}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        {/*bookable item List */}
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li key={b.id} className={i === bookableIndex ? "selected" : null}>
              <button className="btn" onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          {/*Next button */}
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
      {/*the following code displayes only bookable is true(not null) */}
      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    /*use useState to control state*/
                    onChange={toggleDetails}
                  />
                  Show Details
                </label>
              </span>
            </div>

            <p>{bookable.notes}</p>
            {/*the following code displayes only hasDetails is true(be checked) */}
            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  {/*the ordinary approach to display multiple items from a container */}
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((s) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}
