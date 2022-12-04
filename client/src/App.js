import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './features/auth/Login';
import SignUp from './features/auth/SignUp';
import AddCar from './features/dashboard/addCar/AddCar';
import Car from './features/dashboard/car/Car';
import Category from './features/dashboard/category/Category';
import Dashbaord from './features/dashboard/Dashbaord';
import { useDispatch } from 'react-redux';
import { loadUser } from './store/actions/authActions';
import TotalCars from './features/dashboard/TotalCars';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser())
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashbaord />} >
          <Route path="/" element={<TotalCars />} />
          <Route path="car" element={<Car />} />
          <Route path="addcar" element={<AddCar />} />
          <Route path="categories" element={<Category />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;