import { useRef } from "react";
import {
  FaChevronLeft,
  FaCalendarDay,
  FaChevronRight,
  FaCalendarCheck,
} from "react-icons/fa";

export default function WeekPicker({ dispatch }) {
  console.log(`In the weekPicker==`);
  const textboxRef = useRef();

  function goToDate() {
    dispatch({
      type: "SET_DATE",
      payload: textboxRef.current.value,
    });
  }
  console.log(`Render the weekPicker==`);
  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch({ type: "PREV_WEEK" })}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>
        <button className="btn" onClick={() => dispatch({ type: "TODAY" })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>
        <span>
          <input
            type="text"
            ref={textboxRef}
            defaultValue={new Date().toDateString()}
          ></input>
          <button className="go btn" onClick={goToDate}>
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => dispatch({ type: "NEXT_WEEK" })}>
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
    </div>
  );
}
