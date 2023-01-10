import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
//import getData from "../../utils/api";
import Spinner from "../../UI/Spinner";
import useFetch from "../../utils/useFetch";

export default function BookablesList({ bookable, setBookable }) {
  console.log(`in BookablesList----`);
  console.log(`para bookable is:`);
  console.dir(bookable);

  const {
    data: bookables = [],
    status,
    error,
  } = useFetch("http://localhost:3001/bookables");

  // These stata will not be raised to parent as they are not necessary for other places
  // 1. Variables

  console.log(`bookables from useFetch is:`);
  console.dir(bookables);

  const group = bookable?.group;
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  // 2. Effects
  useEffect(() => {
    console.log("in BookableList's useEffect --");
    console.log(`bookables[0] is:`);
    console.dir(bookables[0]);

    setBookable(bookables[0]);
  }, [bookables, setBookable]);

  // 3. Handler Functions

  function changeGroup(event) {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === event.target.value
    );
    setBookable(bookablesInSelectedGroup[0]); // raise state to parent
  }

  // this function will do the trick to cycle the options
  function nextBookable() {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length; // if no, then become 0 !
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable); // raise state to parent
  }

  // 4. ui
  if (status === "error") {
    return <p>{error.message}</p>;
  }

  if (status === "loading") {
    console.log("run spinner...");
    return (
      <p>
        <Spinner />
        Loading bookables...
      </p>
    );
  }
  console.log("render bookableList==");
  return (
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
        {bookablesInGroup.map((b) => (
          <li key={b.id} className={b.id === bookable.id ? "selected" : null}>
            <button className="btn" onClick={() => setBookable(b)}>
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
          // ref={nextButtonRef}
          autoFocus
        >
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}
