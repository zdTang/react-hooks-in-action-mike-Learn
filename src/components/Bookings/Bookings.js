import { useState, useReducer } from "react";
import { getWeek } from "../../utils/date-wrangler";
import WeekPicker from "./WeekPicker";
import BookingsGrid from "./BookingsGrid";
import BookingDetails from "./BookingDetails";
import weekReducer from "./weekReducer";

export default function Bookings({ bookable }) {
  console.log(`in Bookings====`);
  console.dir(`bookable is :`);
  console.dir(bookable);
  const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);
  const [booking, setBooking] = useState(null);
  console.dir(`week is :`);
  console.dir(week);
  console.dir(`booking is:`);
  console.dir(booking);
  console.log(`render Booking=====`);
  return (
    <div className="bookings">
      <div>
        <WeekPicker dispatch={dispatch} />
        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>
      <BookingDetails bookable={bookable} booking={booking} />
    </div>
  );
}
