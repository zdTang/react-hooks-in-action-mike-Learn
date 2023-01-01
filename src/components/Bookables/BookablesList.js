import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import getData from "../../utils/api";
import Spinner from "../../UI/Spinner";

export default function BookablesList({ bookable, setBookable }) {
  console.log("start to run function BookableList--");

  // These stata will not be raised to parent as they are not necessary for other places
  // 1. Variables
  const [bookables, setBookables] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  //const nextButtonRef = useRef();

  // 2. Effects
  useEffect(() => {
    console.log("in BookableList's useEffect --");

    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        console.log("Bookables loaded successfully");
        setBookable(bookables[0]); // this state is raised and saved to BookableView
        setBookables(bookables);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });
  }, [setBookable]); // Include the external function in the dependency list.

  // 3. Handler Functions

  function changeGroup(event) {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === event.target.value
    );
    setBookable(bookablesInSelectedGroup[0]); // raise state to parent
  }

  function changeBookable(selectedBookable) {
    setBookable(selectedBookable); // raise state to parent
    console.log(`in the changeBookable function`);
    //console.log(`nextButtonRef.current is:`);
    //console.dir(nextButtonRef.current);
    //nextButtonRef.current.focus();
  }

  // this function will do the trick to cycle the options
  function nextBookable() {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length; // if no, then become 0 !
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable); // raise state to parent
  }

  // 4. ui
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
            <button className="btn" onClick={() => changeBookable(b)}>
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
