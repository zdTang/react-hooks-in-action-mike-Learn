import React, { useState } from "react";
import { FaUserInjured } from "react-icons/fa";
import db from "../../static.json";
const { users } = db;
export default function UsersList() {
  const [userIndex, setUserIndex] = useState(0);

  return (
    <>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <>
            <li key={u.id} className={i === userIndex ? "selected" : null}>
              <button className="btn" onClick={() => setUserIndex(i)}>
                {u.name}
              </button>
            </li>
          </>
        ))}
      </ul>
      {userIndex >= 0 && (
        <div>
          <div className="userName">{users[userIndex].name}</div>
          <div className="userDetail">
            <h2 className="userTitle">{users[userIndex].title}</h2>
            <hr></hr>
            <div>{users[userIndex].notes}</div>
          </div>
        </div>
      )}
    </>
  );
}
