import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/Home/App.jsx";
import Layout from "./Layout.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import About from "./pages/About/About.jsx";
import AddVehicle from "./pages/AddVehicle/AddVehicle.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import CreateCommunity from "./pages/CreateCommunity/CreateCommunity.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/about", element: <About />},
      { path: "/add-vehicle", element: <AddVehicle /> },
      { path: "/profile", element: <Profile /> },
      {path: "/create-community", element: <CreateCommunity /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);