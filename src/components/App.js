import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";

import BookablesPage from "./Bookables/BookablesPage";
import BookingsPage from "./Bookings/BookingsPage";
import UsersPage from "./Users/UsersPage";
import UserPicker from "./Users/UserPicker";
import { useState } from "react";
import UserContext from "./Users/UserContext";

export default function App() {
  console.log(`in the App==`);
  const [user, setUser] = useState();
  console.log(`app--user:`);
  console.dir(user);
  console.log(`render the App==`);

  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/bookings" className="btn btn-header">
                  <FaCalendarAlt />
                  <span>Bookings</span>
                </Link>
              </li>
              <li>
                <Link to="/bookables" className="btn btn-header">
                  <FaDoorOpen />
                  <span>Bookables</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className="btn btn-header">
                  <FaUsers />
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </nav>
          <UserPicker user={user} setUser={setUser} />
        </header>
        <UserContext.Provider value={user}>
          <Routes>
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/bookables" element={<BookablesPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}
