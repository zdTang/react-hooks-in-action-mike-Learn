import React, { useEffect, Fragment } from "react";
import Spinner from "../../UI/Spinner";
import moment from "moment/moment";

import { useBookings, useGird } from "./bookingsHooks";

export default function BookingsGrid({ week, bookable, booking, setBooking }) {
  console.log(`in the Bookings Grid==`);

  const { bookings, status, error } = useBookings(
    bookable?.id,
    week.start,
    week.end
  );
  const { grid, sessions, dates } = useGird(bookable, week.start);

  console.log(`bookingsGrid--dates:`);
  console.dir(dates);

  useEffect(() => {
    console.log(`in the Bookings Grid--Effect--deselect booking`);
    setBooking(null);
  }, [bookable, week.start, setBooking]);

  // CELL: mapping bookings to Calendar
  function cell(session, date) {
    const cellData = bookings?.[session]?.[date] || grid[session][date];

    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : null}
        onClick={status === "success" ? () => setBooking(cellData) : null}
      >
        {cellData.title}
      </td>
    );
  }

  if (!grid) {
    return <p>Waiting for bookable and week details...</p>;
  }

  return (
    <Fragment>
      {status === "error" && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}
      <table
        className={
          status === "success" ? "bookingsGrid active" : "bookingsGrid"
        }
      >
        <thead>
          <tr>
            <th>
              <span className="status">
                <Spinner />
              </span>
            </th>
            {dates.map((d) => (
              <th key={d}>
                {moment(d, "YYYY-MM-DD").format("ddd MMM DD YYYY")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map((date) => cell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
