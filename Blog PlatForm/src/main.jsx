import { createBrowserRouter, RouterProvider} from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import UserProfile from "./Components/UserProfile.jsx";
const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
       
        {
            path : "/UserProfile",
            element : <UserProfile />
        }
      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={AppRouter} />
  );
  