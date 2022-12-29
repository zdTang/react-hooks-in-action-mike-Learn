import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("elements mount!");
root.render(<App />);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
