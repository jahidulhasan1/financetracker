import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./pages/auth";
import { Dashboard } from "./pages/dashboard";
import Header from "./components/Header";
import Home from "./pages/Home";

export const routerV = createBrowserRouter([
  {
    path: "/",
    // element:  <Home />
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default function App() {


  return (
    <div>
      <Header />
      <RouterProvider router={routerV}></RouterProvider>
    </div>
  );
}
