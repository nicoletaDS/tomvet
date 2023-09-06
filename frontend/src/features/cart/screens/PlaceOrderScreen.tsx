import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";
import "./style/PlaceOrderScreen.css";
import { AppDispatch, RootState } from "../../../store/store";
import { addOrder } from "../../profile/ordersSlice";
import { backendURL } from "../../../utils/constants/link";

function PlaceOrderScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const userInfo = useSelector(
    (state: RootState) => state.auth.session.profile
  );
  const [error, setError] = useState<String | null>(null);

  const totalPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  const placeOrder = async () => {
    try {
      const orderItems = cart.cartItems.map((item, index) => ({
        product: item.product,
        qty: item.qty,
      }));

      const orderAction = await dispatch(
        addOrder({
          orderItems: orderItems,
          delivery_address: cart.shippingAddress,
        })
      );

      const order: any = orderAction.payload;
      console.log("in placeOrder", order);

      navigate(`/comenzi/${order.id}`);
    } catch (error) {
      console.log("ERROR:", error);
      setError((error as Error).message);
    }
  };

  return (
    <div className="placeorder">
      <div className="placeorder-title">
        <h2>Finalizare Comanda</h2>
        <CheckoutSteps step1 step2 step3 />
      </div>

      <div className="placeorder-body">
        <div className="shipping-info">
          <p>
            <strong>Informatii de contact:</strong>
            <br />
            Email: {userInfo?.email}
          </p>
          <p>
            <strong>Adresa de livrare:</strong>
            <br />
            Strada: {cart.shippingAddress.str}
            <br />
            Nr.: {cart.shippingAddress.nr}
            <br />
            Apartament.: {cart.shippingAddress.apartment}
            <br />
            Localitate: {cart.shippingAddress.city}
            <br />
            Judet: {cart.shippingAddress.county}
          </p>
          <p>
            <strong>Metoda de plata:</strong>
            <br />
            card
          </p>
        </div>

        <div className="shipping-summary">
          {cart.cartItems.length === 0 ? (
            <p>Cosul de cumparaturi este gol</p>
          ) : (
            <>
              {cart.cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                  <img src={backendURL + item.image} alt=""></img>
                  <p>
                    {item?.title}
                    <br />
                    {item.price}RON
                  </p>
                  <p>
                    Cantitate:
                    <br />
                    {item.qty}
                  </p>
                  <p>
                    Pret: <br />
                    <strong>{item.qty * item.price}RON</strong>
                  </p>
                </div>
              ))}
            </>
          )}
          <div className="flex flex-col justify-end text-end">
            <p>
              Total: <strong>{totalPrice}RON</strong>
            </p>
            {error && <p className="error">{error}</p>}
            <div className="flex flex-row mt-8 justify-end text-end">
              <Link className="return-cart" to="/cos">
                Inapoi
              </Link>
              <button
                disabled={cart.cartItems.length === 0}
                className="text-white bg-lilac rounded-full px-6 py-1 ml-5 hover:underline"
                onClick={placeOrder}
              >
                Plaseaza comanda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
