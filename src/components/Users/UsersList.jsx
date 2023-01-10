import React from "react";
import Spinner from "../../UI/Spinner";
import useFetch from "../../utils/useFetch";

export default function UsersList({ user, setUser }) {
  console.log(`in the UserList===`);

  const {
    data: users = [],
    status,
    error,
  } = useFetch("http://localhost:3001/users");

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  if (status === "loading") {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
  }

  // user user.id to match selection.
  // remove the UI for user details
  return (
    <ul className="users items-list-nav">
      {users.map((u) => (
        <li key={u.id} className={u.id === user?.id ? "selected" : null}>
          <button className="btn" onClick={() => setUser(u)}>
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
