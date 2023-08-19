import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/store";

function OrderScreen() {
  const params = useParams();
  const { id } = params;
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");

  const ordersState = useSelector((state: RootState) => state.orders);
  const { orders, error, loading }: any = ordersState;

  const [order, setOrder] = useState<any>(null);

  const orderPay = useSelector((state: RootState) => state.orderPay);
  const { loading: loadingPay } = orderPay;

  useEffect(() => {
    if (searchParams.get("success")) {
      // modifica plata in be- setIsPayed
      setMessage("Payment successful!");
    } else if (searchParams.get("canceled"))
      setMessage("There was an error with the payment. Please try again.");
  }, [searchParams]);

  useEffect(() => {
    setOrder(orders.find((item: any) => item.id == id));
  }, [id, orders]);

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
                {/* <strong>{order.isPaid ? <>Paid on {order.paidAt}</> : <>Not Paid</>}</strong> */}
              </p>
            </div>

            <div className="shipping-summary">
              {order.orderItems.map((item: any, index: number) => (
                <div className="cart-item" key={index}>
                  <img src={item.image} alt=""></img>
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
                    <strong>{item.qty * item.price}&euro;</strong>
                  </p>
                </div>
              ))}
              <div className="float-right mt-4">
                <p>
                  Total: <strong>{order.totalPrice || 0}&euro;</strong>
                </p>
              </div>

              {message && <p className="text-xl text-[#2ea72c]">{message}</p>}
              {!order.isPaid && (
                <div>
                  {loadingPay && <p>Loading...</p>}
                  <form
                    action={`/api/orders/${id}/stripe/create-checkout-session`}
                    method="POST"
                  >
                    <button
                      type="submit"
                      className="text-white w-full bg-lilac rounded-full px-6 py-2 mt-8 float-right hover:underline"
                    >
                      Plateste comanda
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
