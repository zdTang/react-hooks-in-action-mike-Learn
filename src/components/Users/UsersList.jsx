import React, { useState } from "react";
import db from "../../static.json";
const { users } = db;
export default function UsersList() {
  const [userIndex, setUserIndex] = useState(0);

  return (
    <ul className="users items-list-nav">
      {users.map((u, i) => (
        <li key={u.id} className={i === userIndex ? "selected" : null}>
          <button className="btn" onClick={() => setUserIndex(i)}>
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
