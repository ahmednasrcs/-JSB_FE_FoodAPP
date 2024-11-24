import { useEffect, useState } from 'react'
import React from 'react';
import './App.css'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Registeration from './modules/authentication/components/Registeration/Registeration'
import Login from './modules/authentication/components/Login/Login';
import RestPass from './modules/authentication/components/RestPass/RestPass';
import CategoryData from './modules/caterories/components/CategoryData/CategoryData';
import CategoriesList from './modules/caterories/components/CategoriesList/CategoriesList';
import RecipeData from './modules/recipes/components/RecipeData/RecipeData';
import RecipesList from './modules/recipes/components/RecipesList/RecipesList';
import NotFound from './modules/shared/components/NotFound/NotFound';
import UserList from './modules/users/components/UserList/UserList';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import Dashboard from './modules/dashboard/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import ForgetPass from './modules/authentication/components/ForgetPass/ForgetPass';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute';
import RecipeForm from './modules/recipes/components/RecipeForm/RecipeForm';

function App() {

  const [loginData, setloginData] = useState(null);
  let saveLoginData = () => {
    let decodedToken = localStorage.getItem("token")
    let encodedToken = jwtDecode(decodedToken)
    setloginData(encodedToken);
  }

  useEffect(()=>{
    if (localStorage.getItem('token'))
    {
    saveLoginData()
    }
  },[])
  const Routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: 'login', element: <Login saveLoginData={saveLoginData} /> },
        { path: 'register', element: <Registeration /> },
        { path: 'forget-Pass', element: <ForgetPass /> },
        { path: 'reset-pass', element: <RestPass /> },
      ]
    },
    {
      path: 'dashboard',
      element:<ProtectedRoute loginData={loginData} >
        <MasterLayout loginData={loginData}/>
        </ProtectedRoute> ,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard loginData={loginData} /> },
        { path: 'recipes', element: <RecipesList loginData={loginData} /> },
        { path: 'recipes/new-recipe', element: <RecipeForm/> },
        { path: 'recipes/:recipeId', element: <RecipeForm /> },
        { path: 'recipe-data', element: <RecipeData /> },
        { path: 'Categories', element: <CategoriesList /> },
        { path: 'Category-data', element: <CategoryData /> },
        { path: 'users', element: <UserList /> },

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
