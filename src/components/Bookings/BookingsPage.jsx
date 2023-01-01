import { useState } from "react";
import Bookings from "./Bookings";
import BookablesList from "../Bookables/BookablesList";

export default function BookingsPage() {
  const [bookable, setBookable] = useState(null);
  return (
    <main className="bookings-page">
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <Bookings bookable={bookable} />
    </main>
  );
}
