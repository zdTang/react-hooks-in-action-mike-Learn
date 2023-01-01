import { shortISO } from "./date-wrangler";

// a function for fetching data

export default function getData(url) {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error("There was a problem fetching data.");
    }
    return resp.json(); // convert the response JSON string to a Javascript Object
  });
}

export function getBookings(bookableId, startDate, endDate) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);
  const urlRoot = "http://localhost:3001/bookings";
  const query = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
  return getData(`${urlRoot}?${query}`);
}
