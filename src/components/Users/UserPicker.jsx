import db from "../../static.json";
const { users } = db;
console.log(users);

export default function UserPicker() {
  return (
    <select>
      {users.map((x) => (
        <option key={x.id} value={x.name}>
          {x.name}
        </option>
      ))}
    </select>
  );
}
