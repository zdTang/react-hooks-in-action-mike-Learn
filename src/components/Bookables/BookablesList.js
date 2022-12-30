import React, { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import getData from "../../utils/api";
import Spinner from "../../UI/Spinner";

export default function BookablesList({ state, dispatch }) {
  console.log("start to run function BookableList--");
  const nextButtonRef = useRef();

  const groups = [...new Set(state.bookables.map((b) => b.group))];
  const bookablesInGroup = state.bookables.filter(
    (b) => b.group === state.group
  );
  const bookable = bookablesInGroup[state.bookableIndex]; //the item user specified
  console.log(`bookableInGroup is :===`);
  console.dir(bookablesInGroup);
  console.log(`bookableIndex is :===`);
  console.dir(state.bookableIndex);
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
  }, [dispatch]);

  // Before, the dispatch is passed within the component so that the REACT knows it
  // is identical, so it is not necessary to be a dependency.
  // But here the 'dispatch' is passed from parent.

  useEffect(() => {
    timerRef.current = setInterval(() => {
      // set a Interval and assign ID to timeRef
      console.log(`set the Interval Id is ${timerRef.current}`);
      if (state.bookables.length > 0) dispatch({ type: "NEXT_BOOKABLE" });
    }, 3000);
    return stopPresentation; // return a funtion to clean up the timer.It will run when Component un-Mount
  }, [state.bookables, dispatch]);

  function stopPresentation() {
    console.log(`clean up the Interval Id is ${timerRef.current}`);
    clearInterval(timerRef.current); // use the timer ID to clear the timer
  }

  function changeGroup(event) {
    dispatch({ type: "SET_GROUP", payload: event.target.value });
  }

  function changeBookable(selectedIndex) {
    dispatch({ type: "SET_BOOKABLE", payload: state.selectedIndex });
    console.log(`in the changeBookable function`);
    console.log(`nextButtonRef.current is:`);
    console.dir(nextButtonRef.current);
    nextButtonRef.current.focus();
  }

  // this function will do the trick to cycle the options
  function nextBookable() {
    dispatch({ type: "NEXT_BOOKABLE" }); // No payload
  }

  if (state.error) {
    return <p>{state.error.message}</p>;
  }

  if (state.isLoading) {
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
    <div>
      {/*bookable group List */}
      <select value={state.group} onChange={changeGroup}>
        {groups.map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>
      {/*bookable item List */}
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b, i) => (
          <li
            key={b.id}
            className={i === state.bookableIndex ? "selected" : null}
          >
            <button className="btn" onClick={() => changeBookable(i)}>
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        {/*Next button */}
        <button
          className="btn"
          onClick={nextBookable}
          ref={nextButtonRef}
          autoFocus
        >
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}
