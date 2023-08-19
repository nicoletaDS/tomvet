import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignupScreen from "./features/auth/screens/SignupScreen";
import DefaultLayout from "./features/layout/DefaultLayout";
import Layout from "./features/layout/Layout";
import HomeScreen from "./features/home/HomeScreen";
import LoginScreen from "./features/auth/screens/LoginScreen";
import Products from "./features/products/Products";
import Orders from "./features/orders";
import Profile from "./features/profile/screens/Profile";
import ProductDetails from "./features/products/ProductDetails";
import CartScreen from "./features/cart/screens/CartScreen";

import PlaceOrderScreen from "./features/cart/screens/PlaceOrderScreen";
import Calendar from "./features/calendar/Calendar";
import PetsScreen from "./features/pets/PetsScreen";
import ShippingScreen from "./features/cart/screens/ShippingScreen";
import OrderScreen from "./features/cart/screens/OrderScreen";

function App() {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route path="/inregistrare" element={<SignupScreen />}></Route>
          <Route path="/conectare" element={<LoginScreen />}></Route>
          <Route element={<Layout />}>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/produse" element={<Products />}></Route>
            <Route path="/produse/:id" element={<ProductDetails />}></Route>
            <Route path="/cos" element={<CartScreen />}>
              <Route path=":id" element={<CartScreen />} />
            </Route>
            <Route path="/transport" element={<ShippingScreen />}></Route>
            <Route
              path="/finalizarecomanda"
              element={<PlaceOrderScreen />}
            ></Route>
            <Route path="/orders/:id" element={<OrderScreen />}></Route>
            <Route path="/calendar" element={<Calendar />}></Route>
            <Route path="/profil" element={<Profile />}></Route>
            <Route path="/comenzi" element={<Orders />}></Route>
            <Route path="/animale" element={<PetsScreen />}>
              <Route path=":id" element={<PetsScreen />} />
            </Route>
          </Route>
        </Routes>
      </DefaultLayout>
    </Router>
  );
}

export default App;
