export default function reducer(state, action) {
  switch (action.type) {
    case "SET_GROUP":
      return {
        ...state,
        group: action.payload, // update STATE with Payload passed by ACTION
        bookableIndex: 0,
      };
    case "SET_BOOKABLE":
      return {
        ...state,
        bookableIndex: action.payload, // update STATE with Payload passed by ACTION
      };
    case "TOGGLE_HAS_DETAILS":
      return {
        ...state,
        hasDetails: !state.hasDetails, //  toggle the detail button, generate new State based on previous state
      };
    case "NEXT_BOOKABLE":
      const count = state.bookables.filter(
        (b) => b.group === state.group
      ).length;
      console.log("in the NEXT_BOOKABLE");
      console.dir(state);
      console.log(`the count is ${count}`);
      console.log(`the bookable Index is ${(state.bookableIndex + 1) % count}`);
      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count, // assign a new index
      };
    case "FETCH_BOOKABLES_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: false,
        bookables: [], //clear the bookable when requesting new data
      };
    case "FETCH_BOOKABLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        bookables: action.payload, //pass the loaded bookables to the reducer via the payload
      };
    case "FETCH_BOOKABLES_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload, //pass the error to the reducer via the payload
      };
    default:
      return state;
  }
}
