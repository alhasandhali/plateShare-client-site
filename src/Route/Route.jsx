import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import AvaiableAllFoods from "../pages/AvaiableAllFoods/AvaiableAllFoods";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import CreateNewFood from "../pages/CreateNewFood/CreateNewFood";
import ManageMyFoods from "../pages/ManageMyFoods/ManageMyFoods";
import MyFoodRequest from "../pages/MyFoodRequest/MyFoodRequest";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/available-foods",
        Component: AvaiableAllFoods,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoutes>
            <FoodDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/create-food",
        element: (
          <PrivateRoutes>
            <CreateNewFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoutes>
            <ManageMyFoods />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-food-requests",
        element: (
          <PrivateRoutes>
            <MyFoodRequest />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
