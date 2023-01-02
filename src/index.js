import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";

/*===========
Here to display or hide debug information!
=========== */
//console.log = function () {};
//console.dir = function () {};
//================================

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("elements mount!");
root.render(<App />);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
