import { useState } from "react";
import data from "../../static.json";
import User from "./User";
let { users } = data;

export default function UsersPage() {
  console.log("Into usersPage");
  console.dir(users);
  const [userIndex, setUserIndex] = useState(1);
  console.log(`userIndex is ${userIndex}`);

  console.log("render userList");
  return (
    <ul>
      {users.map((x) => (
        <li className="users" key={x.id}>
          <User
            styleName={x.id === userIndex ? "selectedUser" : null}
            id={x.id}
            name={x.name}
            img={x.img}
            title={x.title}
            notes={x.notes}
            onClickHandler={setUserIndex}
          />
        </li>
      ))}
    </ul>
  );
}
