// a function for fetching data

export default function getData(url) {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error("There was a problem fetching data.");
    }
    return resp.json(); // convert the response JSON string to a Javascript Object
  });
}
