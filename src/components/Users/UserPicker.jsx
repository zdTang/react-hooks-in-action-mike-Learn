import React, { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner";

export default function UserPicker({ user, setUser }) {
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
        setUser(data[0]);
      });
  }, [setUser]);

  // Function to handle when user choose a user from dropdown list
  function handleSelect(e) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedID);
    console.log(`in UserPicker--handleSelect function`);
    console.log(`in UserPicker--select a user:`);
    console.dir(selectedUser);
    setUser(selectedUser);
  }

  //Notice the spinner will lies on the location where is supposed to display the drop down list
  if (users === null) {
    console.log(`UserPicker Spinner render!`);
    return <Spinner />;
  }
  console.log(`UserPicker render!`);
  return (
    <select className="user-picker" onChange={handleSelect} value={user?.id}>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>
  );
}
