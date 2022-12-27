import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import data from "../../static.json";
const { bookables } = data;
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

  // this function will do the trick to cycle the options
  function nextBookable() {
    setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
  }

  console.log("render bookableList");
  return (
    <div>
      {/*see how to get SELECT value from the OPTION, the 'value' in the OPTION will affect selected OPTION */}
      <select value={group} onChange={(e) => setGroup(e.target.value)}>
        {groups.map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b, i) => (
          <li key={b.title} className={i === bookableIndex ? "selected" : null}>
            <button className="btn" onClick={() => setBookableIndex(i)}>
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button className="btn" onClick={nextBookable} autoFocus>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}
