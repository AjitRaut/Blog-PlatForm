import { createBrowserRouter, RouterProvider} from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import Categories from "./Components/Categories.jsx";
const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
       
        {
          path: "/categories",
          element: <Categories />,
        },
      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={AppRouter} />
  );
  