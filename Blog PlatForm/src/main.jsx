import { createBrowserRouter, RouterProvider} from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import Categories from "./Components/Categories.jsx";
import Tags from "./Components/Tags.jsx";
import Profile from "./Components/Profile.jsx";
const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
       
        {
          path: "/categories",
          element: <Categories />,
        },
        {
            path : "/tags",
            element : <Tags />
        },
        {
            path : "/profile",
            element : <Profile />
        }
      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={AppRouter} />
  );
  