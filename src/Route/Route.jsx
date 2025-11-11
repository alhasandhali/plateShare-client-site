import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AvaiableAllFoods from "../pages/AvaiableAllFoods/AvaiableAllFoods";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import CreateNewFood from "../pages/CreateNewFood/CreateNewFood";
import ManageMyFoods from "../pages/ManageMyFoods/ManageMyFoods";
import MyFoodRequest from "../pages/MyFoodRequest/MyFoodRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <NotFoundPage></NotFoundPage>,
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
        element: <FoodDetails></FoodDetails>,
      },
      {
        path: "/create-food",
        element: <CreateNewFood />,
      },
      {
        path: "/manage-my-foods",
        element: <ManageMyFoods></ManageMyFoods>,
      },
      {
        path: "/my-food-requests",
        element: <MyFoodRequest></MyFoodRequest>,
      },
    ],
  },
]);
