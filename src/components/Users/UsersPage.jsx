import React, { useState } from "react"; // import useState
import UsersList from "./UsersList";
import UserDetails from "./UserDetails"; // import new component
//import UserContext from "./UserContext";
import { useUser } from "./UserContext";
export default function UsersPage() {
  // manage selected user state
  const [user, setUser] = useState(null);

  // get the user from context
  // Pay attention to the syntax
  const [loggedInUser] = useUser();

  // if no user has been selected in the users list,
  // select the logged in user
  const currentUser = user || loggedInUser;

  // pass currentUser to children
  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetails user={currentUser} />
    </main>
  );
}
