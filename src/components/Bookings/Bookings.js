import { useState, useReducer } from "react";
import { getWeek } from "../../utils/date-wrangler";
import WeekPicker from "./WeekPicker";
import BookingsGrid from "./BookingsGrid";
import BookingDetails from "./BookingDetails";
import weekReducer from "./weekReducer";

export default function Bookings({ bookable }) {
  //useReducer, 2nd para: arguments, 3td para: Initial function(lazy loading)
  const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);
  const [booking, setBooking] = useState(null);

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
