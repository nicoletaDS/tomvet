import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store/store";
import { backendURL } from "../../../utils/constants/link";
import { getAllProducts } from "../../../app/api/productsApi";
import { payOrder } from "../../profile/ordersSlice";

function OrderScreen() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = params;
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<any>([]);

  const ordersState = useSelector((state: RootState) => state.orders);
  const { orders, error, loading }: any = ordersState;

  const [order, setOrder] = useState<any>(null);

  const orderPay = useSelector((state: RootState) => state.orderPay);
  const { loading: loadingPay } = orderPay;

  useEffect(() => {
    const pay = async () => {
      if (searchParams.get("success")) {
        const result = await dispatch(payOrder(id));
        console.log("result", result);
        setMessage("Payment successful!");
      } else if (searchParams.get("canceled")) {
        setMessage("There was an error with the payment. Please try again.");
      }
    };
    pay();
  }, [id, searchParams]);

  useEffect(() => {
    setOrder(orders.find((item: any) => item.id == id));
  }, [id, orders]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response);
      } catch (error: any) {
        console.log("Error getting products");
      }
    };

    fetchData();
  }, []);

  const getTotal = () => {
    let total = 0;
    if (order) {
      order.orderItems.map(
        (item: any, index: number) => (total = total + item.qty * item.price)
      );
    }
    return total;
  };

  return (
    <div>
      <div className="placeorder">
        <div className="text-xl font-bold text-center">
          <p>Comanda: #{id}</p>
        </div>

        {loading && <h2>Loading...</h2>}
        {error && <p className="error">{error}</p>}
        {order != null && (
          <div className="placeorder-body">
            <div className="shipping-info">
              <p>
                <strong>Informatii de contact:</strong>
                <br />
                Email:{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>
                  Detalii transport: - &nbsp;
                  {order.isDelivered ? (
                    <>Livrat in data de {order.deliveredAt}</>
                  ) : (
                    <>in curs de livrare</>
                  )}
                </strong>
                <br />
                Adresa: {order.deliveryAddress.str}, {order.deliveryAddress.nr}
                <br />
                Oras: {order.deliveryAddress.city}
                <br />
                Judet: {order.deliveryAddress.county}
              </p>
              <p>
                <strong>Metoda de plata:</strong>
                <br />
                card &nbsp;
                <br />
                <strong>
                  {order.is_paid ? (
                    <>Platit la {new Date(order.paid_at).toLocaleString()}</>
                  ) : (
                    <>Neplatit</>
                  )}
                </strong>
              </p>
            </div>

            <div className="shipping-summary">
              {order.orderItems.map((item: any, index: number) => (
                <div className="cart-item" key={index}>
                  <img
                    src={
                      backendURL +
                        products.find((x: any) => x.id == item.product)
                          ?.image || ""
                    }
                    alt="img"
                  ></img>
                  <p>
                    {item.name}
                    <br />
                    {item.price}&euro;
                  </p>
                  <p>
                    Cantitate:
                    <br />
                    {item.qty}
                  </p>
                  <p>
                    Pret: <br />
                    <strong>{item.qty * item.price} RON</strong>
                  </p>
                </div>
              ))}
              <div className="flex justify-end">
                <p>Total: {getTotal()} RON</p>
              </div>

              {message && (
                <p className="text-xl text-[#2ea72c] text-end mt-2">
                  {message}
                </p>
              )}
              {!order.is_paid && (
                <div className="flex justify-end">
                  {loadingPay && <p>Loading...</p>}
                  <form
                    action={`http://localhost:8000/api/orders/${id}/stripe/create-checkout-session`}
                    method="POST"
                  >
                    <button
                      type="submit"
                      className="text-white bg-lilac rounded-full px-6 py-2 mt-8 hover:underline"
                    >
                      Plateste acum
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderScreen;
