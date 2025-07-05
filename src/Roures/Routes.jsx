import { createBrowserRouter } from "react-router-dom";
import Root from "../Page/Root";
import Home from "../Page/Home";
import ExpenseForm from "../Page/ExpenseForm";
import DisplayData from "../Page/DisplayData";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/expense",
        element: <ExpenseForm></ExpenseForm>,
      },
            {
        path: "/expenseData",
        element: <DisplayData></DisplayData>,
      },
    ],
  },
]);

export default Routes;
