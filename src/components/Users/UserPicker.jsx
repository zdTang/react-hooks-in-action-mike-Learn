import React, { useEffect } from "react";
import Spinner from "../../UI/Spinner";
import { useUser } from "./UserContext"; // import the custom hooker
import useFetch from "../../utils/useFetch";

export default function UserPicker() {
  console.log(`into userPicker!`);

  const {
    data: users = [],
    status,
    error,
  } = useFetch("http://localhost:3001/users");

  const [user, setUser] = useUser();

  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  // Function to handle when user choose a user from dropdown list
  function handleSelect(e) {
    const selectedID = parseInt(e.target.value);
    const selectedUser = users.find((u) => u.id === selectedID);
    console.log(`in UserPicker--handleSelect function`);
    console.log(`in UserPicker--select a user:`);
    console.dir(selectedUser);
    setUser(selectedUser);
  }

  //Notice the spinner will lies on the location where is supposed to display the drop down list
  if (status === "loading") {
    console.log(`UserPicker Spinner render!`);
    return <Spinner />;
  }

  if (status === "error") {
    return <span>Error!--{error.message}</span>;
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
