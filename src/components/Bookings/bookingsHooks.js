import { shortISO } from "../../utils/date-wrangler";
import useFetch from "../../utils/useFetch";
import { transformBookings } from "./grid-builder";
import { useMemo } from "react";
import { getGrid } from "./grid-builder";

export function useBookings(bookableId, startDate, endDate) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";
  const queryString = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;

  // it is worthy to learn this pattern to construct a query string
  const query = useFetch(`${urlRoot}?${queryString}`);

  // Learn this pattern, very concise
  // here the 'data' return from useFetch will still be there
  return {
    bookings: query.data ? transformBookings(query.data) : {},
    ...query,
  };
}

export function useGird(bookable, startDate) {
  return useMemo(
    () => (bookable ? getGrid(bookable, startDate) : {}),
    [bookable, startDate]
  );
}
