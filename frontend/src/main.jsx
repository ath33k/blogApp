import React from "react";
import ReactDOM from "react-dom/client";
import firebaseApp from "../utils/firebaseConfig.js";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserProvider.jsx";

console.log(import.meta.env.VITE_NODE_ENV);
// console.log(process.env.VITE_BACKEND_URL, "urlss");
console.log(import.meta.env.VITE_BACKEND_URL, "metaurl");
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
