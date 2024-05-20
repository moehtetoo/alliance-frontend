import {
    createBrowserRouter,
  } from "react-router-dom";
import Login from "./components/pages/Login";
import ErrorPage from "./components/pages/ErrorPage";
import Projects from "./components/pages/Projects";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Projects/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/login",
    element: <Login/>
  }
]);