import { useState } from 'react'
import React from 'react';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import Registeration from './modules/authentication/components/Registeration/Registeration'
import ChangePass from './modules/authentication/components/ChangePass/ChangePass'
import Login from './modules/authentication/components/Login/Login';
import RestPass from './modules/authentication/components/RestPass/RestPass';
import CategoryData from './modules/caterories/components/CategoryData/CategoryData';
import CategoriesList from './modules/caterories/components/CategoriesList/CategoriesList';
import RecipeData from './modules/recipes/components/RecipeData/RecipeData';
import ReciprsList from './modules/recipes/components/ReciprsList/ReciprsList';
import DeleteConfirmation from './modules/shared/components/DeleteConfirmation/DeleteConfirmation';
import Header from './modules/shared/components/Header/Header';
import Sidebar from './modules/shared/components/Sidebar/Sidebar';
import NotFound from './modules/shared/components/NotFound/NotFound';
import NoData from './modules/shared/components/NoData/NoData';
import Navbar from './modules/shared/components/Navbar/Navbar';
import UserList from './modules/users/components/UserList/UserList';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import Dashboard from './modules/dashboard/Dashboard/dashboard';
import { ToastContainer } from 'react-toastify';
import ForgetPass from './modules/authentication/components/ForgetPass/ForgetPass';

function App() {
  const Routes = createBrowserRouter([
    {
      path:'',
      element:<AuthLayout/>,
      errorElement: <NotFound/>,
      children:[
        {index:true,element:<Login/>},
        {path:'login',element:<Login/>},
        {path:'register',element:<Registeration/>},
        {path:'forget-Pass',element:<ForgetPass/>},
        {path:'reset-pass',element:<RestPass/>},
      ]  
    },
    {
      path:'dashboard',
      element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Dashboard/>},
        {path:'recipes',element:<ReciprsList/>},
        {path:'recipe-data',element:<RecipeData/>},
        {path:'Categories',element:<CategoriesList/>},
        {path:'Category-data',element:<CategoryData/>},
        {path:'users',element:<UserList />},

      ]  
    }
    ])


  return (
    <>
                    <ToastContainer />
                    <RouterProvider router={Routes}></RouterProvider>
    </>
  )
}

export default App
