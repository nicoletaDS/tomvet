import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";
import "./style/PlaceOrderScreen.css";
import { AppDispatch, RootState } from "../../../store/store";
import { addOrder } from "../../orders/ordersSlice";

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

      navigate(`/orders/${order.id}`);
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
            <strong>Shipping address:</strong>
            <br />
            Address: {cart.shippingAddress.address}
            <br />
            City: {cart.shippingAddress.city}
            <br />
            Postal Code: {cart.shippingAddress.postalCode}
            <br />
            Country: {cart.shippingAddress.country}
          </p>
          <p>
            <strong>Payment method:</strong>
            <br />
            card
          </p>

          {error && <p className="error">{error}</p>}
          <button
            disabled={cart.cartItems.length === 0}
            className="text-white bg-lilac rounded-full px-4 py-1 hover:underline"
            onClick={placeOrder}
          >
            Place Order
          </button>
          <Link className="return-cart" to="/cart">
            Return to cart
          </Link>
        </div>

        <div className="shipping-summary">
          {cart.cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                  <img src={item.image} alt=""></img>
                  <p>
                    {item?.title}
                    <br />
                    {item.price}RON
                  </p>
                  <p>
                    Qty:
                    <br />
                    {item.qty}
                  </p>
                  <p>
                    Price: <br />
                    <strong>{item.qty * item.price}RON</strong>
                  </p>
                </div>
              ))}
            </>
          )}
          <div className="price">
            <p>
              Total: <strong>{totalPrice}RON</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
