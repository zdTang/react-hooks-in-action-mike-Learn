import React, { useState, Fragment } from "react";
import { FaArrowRight } from "react-icons/fa";
import data from "../../static.json";
const { bookables, sessions, days } = data;
const groups = [...new Set(bookables.map((b) => b.group))];

console.log("start to run function BookableList--");
export default function BookablesList() {
  // Here to learn how to use SET to get unified value

  console.log("--Into BookableList");
  //const group = "Rooms";
  const [group, setGroup] = useState("Rooms");
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(0);

  //   function changeBookable(selectedIndex) {
  //     bookableIndex = selectedIndex;
  //     console.log(selectedIndex);
  //   }
  console.log(`group is ${group}`);
  console.dir(`bookablesInGroup is ${bookablesInGroup}`);
  console.log(`bookableIndex is ${bookableIndex}`);

  const bookable = bookablesInGroup[bookableIndex]; //the item user specified
  const [hasDetails, setHasDetails] = useState(false);

  //
  function changeGroup(event){
    setGroup(event.target.value);// Here to get the value of OPTION
    setBookableIndex(0);
  }


  // this function will do the trick to cycle the options
  function nextBookable() {
    setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
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
              <button className="btn" onClick={() => setBookableIndex(i)}>
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
                    onChange={() => setHasDetails((has) => !has)}
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
