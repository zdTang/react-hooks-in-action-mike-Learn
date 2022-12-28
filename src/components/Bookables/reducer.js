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
      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count, // assign a new index
      };
    default:
      return state;
  }
}
