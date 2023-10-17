import React from "react";
import ReactDOM from "react-dom/client";
import Tasks from "./pages/tasks/Index";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./main.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <main className="website-main">
      <Routes>
        <Route path="/" Component={Tasks} />
      </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>
);
