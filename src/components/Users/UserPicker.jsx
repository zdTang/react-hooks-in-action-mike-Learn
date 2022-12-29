import React, { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner";

export default function UserPicker() {
  console.log(`into userPicker!`);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    console.log("UserPicker -- in the useEffect");
    fetch("http://localhost:3001/users")
      .then((resp) => resp.json())
      .then((data) => {
        console.log("here is return users in useEffect:");
        console.dir(data);
        setUsers(data);
      });
  }, []);

  //Notice the spinner will lies on the location where is supposed to display the drop down list
  if (users === null) {
    console.log(`UserPicker Spinner render!`);
    return <Spinner />;
  }
  console.log(`UserPicker render!`);
  return (
    <select>
      {users.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
}
