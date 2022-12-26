import React from "react";
import data from "../../static.json";
const { bookables } = data;
export default function BookablesList() {
  const group = "Rooms";

  const bookablesInGroup = bookables.filter((b) => b.group === group);

  const bookableIndex = 1;

  return (
    <ul className="bookables items-list-nav">
      {bookablesInGroup.map((b, i) => (
        <li key={b.title} className={i === bookableIndex ? "selected" : null}>
          <button className="btn">{b.title}</button>
        </li>
      ))}
    </ul>
  );
}
