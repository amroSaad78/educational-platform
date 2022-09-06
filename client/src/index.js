import "react-toastify/dist/ReactToastify.css";
import "./assets/css/font_awesome.css";
import "./assets/css/shared.css";
import React from "react";
import ReactDOM from "react-dom";
import store from "./stores/store";
import Main from "./components/pages/Main";
import Home from "./components/pages/Home";
import Users from "./components/pages/Users";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/Dashboard";
import AddUser from "./components/pages/AddUser";
import AuthLayout from "./layouts/Auth";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/auth" element={<Main />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/courses" element={<Home />} />
            <Route path="/media" element={<Home />} />
            <Route path="/settings" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
