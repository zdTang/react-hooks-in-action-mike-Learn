import React, { useState } from "react";
import data from "../../static.json";
const { bookables } = data;
export default function BookablesList() {
  console.log("--Into BookableList");
  const group = "Rooms";

  const bookablesInGroup = bookables.filter((b) => b.group === group);

  let [bookableIndex, setBookableIndex] = useState(1);

  //   function changeBookable(selectedIndex) {
  //     bookableIndex = selectedIndex;
  //     console.log(selectedIndex);
  //   }
  console.log(bookableIndex);
  console.log("render bookableList");
  return (
    <ul className="bookables items-list-nav">
      {bookablesInGroup.map((b, i) => (
        <li key={b.title} className={i === bookableIndex ? "selected" : null}>
          <button className="btn" onClick={() => setBookableIndex(i)}>
            {b.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
