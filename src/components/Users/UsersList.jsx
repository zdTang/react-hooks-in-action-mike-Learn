import React, { useState, useEffect, Fragment } from "react";
import Spinner from "../../UI/Spinner";

export default function UsersList() {
  const [users, setUsers] = useState(null);
  const [userIndex, setUserIndex] = useState(0);
  const user = users?.[userIndex]; // this syntax is beautiful

  useEffect(async () => {
    const resp = await fetch("http://localhost:3001/users");
    const data = await resp.json();
    setUsers(data);
  }, []);

  if (users === null) {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
  }

  return (
    <Fragment>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li key={u.id} className={i === userIndex ? "selected" : null}>
            <button className="btn" onClick={() => setUserIndex(i)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>

      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}
