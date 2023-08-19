import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style/ShippingScreen.css";
import CheckoutSteps from "../components/CheckoutSteps";
import { AppDispatch, RootState } from "../../../store/store";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingScreen = (props: any) => {
  const cart = useSelector((state: RootState) => state.cart);
  console.log("heiiii");
  console.log(cart);
  const { shippingAddress } = cart;

  console.log(shippingAddress);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [str, setStr] = useState(shippingAddress.nr || "");
  const [nr, setNr] = useState(shippingAddress.nr || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [county, setCounty] = useState(shippingAddress.county || "");
  const [apartment, setApartment] = useState(shippingAddress.apartment || "");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await dispatch(saveShippingAddress({ str, nr, city, county, apartment }));
    navigate("/finalizarecomanda");
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-xl text-center font-bold my-3 pt-4">Transport</h1>
      <CheckoutSteps step1 step2 step3={false} />
      <div className="form-body">
        <form onSubmit={submitHandler}>
          <label className="form-item">
            Strada:
            <input
              required
              type="text"
              value={str || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStr(e.target.value)
              }
            />
          </label>

          <label className="form-item">
            Nr:
            <input
              required
              type="text"
              value={nr || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNr(e.target.value)
              }
            />
          </label>

          <label className="form-item">
            Apartament:
            <input
              required
              type="text"
              value={apartment || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setApartment(e.target.value)
              }
            />
          </label>

          <label className="form-item">
            Oras:
            <input
              required
              type="text"
              value={city || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value)
              }
            />
          </label>

          <label className="form-item">
            Judet:
            <input
              required
              type="text"
              value={county || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCounty(e.target.value)
              }
            />
          </label>

          <div className="w-full flex justify-center">
            <button
              className="bg-lilac rounded-full px-8 py-1 text-white mt-6"
              type="submit"
            >
              Mai departe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
