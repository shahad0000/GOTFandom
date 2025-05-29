import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router";  
import Layout from '../components/Layout';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Home from '../pages/Home';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/signUp", element: <SignUp /> },
        { path: "/login", element: <Login /> },
      ]
    },
  ]);

const Router = () => {
  return (
    <RouterProvider router={router} />
)
}

export default Router