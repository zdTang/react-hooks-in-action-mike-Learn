import React, { useReducer, Fragment, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import reducer from "./reducer";
import getData from "../../utils/api";
import data from "../../static.json";
import Spinner from "../../UI/Spinner";
const { sessions, days } = data;

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [], // set bookable to an empty array
  isLoading: false,
  error: false,
};

export default function BookablesList() {
  console.log("start to run function BookableList--");
  const [
    { group, bookableIndex, bookables, hasDetails, isLoading, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const bookable = bookablesInGroup[bookableIndex]; //the item user specified
  console.log(`bookableInGroup is :===`);
  console.dir(bookablesInGroup);
  console.log(`bookableIndex is :===`);
  console.dir(bookableIndex);
  console.log(`bookable is :===`);
  console.dir(bookable);

  const timerRef = useRef(null); // Assign a ref to the timerRef variable
  useEffect(() => {
    console.log("in BookableList's useEffect --");
    dispatch({ type: "FETCH_BOOKABLES_REQUEST" });
    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        console.log("Bookables loaded successfully");
        dispatch({ type: "FETCH_BOOKABLES_SUCCESS", payload: bookables });
      })
      .catch((error) =>
        dispatch({ type: "FETCH_BOOKABLES_ERROR", payload: error })
      );
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      // set a Interval and assign ID to timeRef
      console.log(`set the Interval Id is ${timerRef.current}`);
      if (bookables.length > 0) dispatch({ type: "NEXT_BOOKABLE" });
    }, 3000);
    return stopPresentation; // return a funtion to clean up the timer.It will run when Component un-Mount
  }, [bookables]);

  function stopPresentation() {
    console.log(`clean up the Interval Id is ${timerRef.current}`);
    clearInterval(timerRef.current); // use the timer ID to clear the timer
  }

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

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    console.log("run spinner...");
    return (
      <p>
        <Spinner />
        Loading bookables...
      </p>
    );
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
                <button className="btn" onClick={stopPresentation}>
                  Stop
                </button>
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
