import React from 'react'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Error from './components/utils/Error.jsx'
import Navbar from './components/utils/Navbar.jsx';


const router = createBrowserRouter([
  {
    path : "/",
    element : "h1",
    errorElement : <Error />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement : <Error />
  },
  {
    path : "/register",
    element : <Register />,
    errorElement : <Error />
  },{
    path : "/nav",
    element : <Navbar />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
