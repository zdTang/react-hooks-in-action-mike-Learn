import DB from "../../static.json";
import { addDays, shortISO } from "../../utils/date-wrangler";
const { sessions } = DB;
const sessionNames = sessions;

// mapping the day and session indexes to dates and session names
export function getGrid(bookable, startDate) {
  const dates = bookable.days
    .sort()
    .map((d) => shortISO(addDays(startDate, d))); // use the day numbers to create dates for the week

  const sessions = bookable.sessions.map((i) => sessionNames[i]);

  const grid = {};

  sessions.forEach((session) => {
    grid[session] = {};
    dates.forEach(
      (date) =>
        (grid[session][date] = {
          session,
          date,
          bookableId: bookable.id,
          title: "",
        })
    );
  });
  console.log(`in getGrid function--grid`);
  console.dir(grid);
  return { grid, dates, sessions };
}

// Transform the array of bookings into the handy lookup object p181
export function transformBookings(bookingsArray) {
  return bookingsArray.reduce((bookings, booking) => {
    const { session, date } = booking;
    if (!bookings[session]) {
      bookings[session] = {};
    }
    console.log(`in transformBookings Function`);
    bookings[session][date] = booking;
    console.dir(bookings);
    return bookings;
  }, {});
}
