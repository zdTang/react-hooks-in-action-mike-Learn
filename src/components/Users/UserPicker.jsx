import db from "../../static.json";
const { users } = db;
export default function UserPicker() {
  return (
    <select>
      {users.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
}
