import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Header from "./components/Header";
import Body from "./routes/Body";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Shimmer from "./components/Shimmer";

const About = lazy(() => import("./routes/About"));
const Experince = lazy(() => import("./routes/Experience"));
const Education = lazy(() => import("./routes/Education"));
const Projects = lazy(() => import("./routes/Projects"));

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <React.StrictMode>
            <Body />
          </React.StrictMode>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Shimmer />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/experience",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Experince />
          </Suspense>
        ),
      },
      {
        path: "/education",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Education />
          </Suspense>
        ),
      },
      {
        path: "/projects",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Projects />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<RouterProvider router={appRouter} />);
