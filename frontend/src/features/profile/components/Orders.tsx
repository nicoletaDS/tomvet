import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrders } from "../ordersSlice";

const CustomerOders = () => {
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.orders
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getOrders = async () => {
      await dispatch(fetchOrders());
    };

    getOrders();
  }, []);

  return (
    <div className="w-full mt-3 py-8 flex flex-row justify-center">
      <div className="w-3/4 bg-white rounded-xl p-4">
        <div className="flex flex-col justify-center w-full rounded-xl">
          {orders.map((order: any) => {
            return (
              <div>
                <div className="bg-white flex flex-row w-full justify-between px-6 mt-6">
                  <div>
                    <div key={order.id} className="font-semibold flex flex-row">
                      Comanda nr. {order.id} -
                      <p className="italic">
                        {order.is_delivered
                          ? ` Livrat la: ${order.delivery_date.slice(0, 10)}`
                          : " in curs de livrare"}
                      </p>
                    </div>
                    <p className="font-light">
                      Plasata in {order.created_at.slice(0, 10)}
                    </p>
                    <p className="font-light">Total {order.price}.</p>
                  </div>

                  <div className="flex flex-col items-end">
                    <Link
                      to=""
                      className="border border-gray rounded px-6 py-1 hover:bg-green mb-3 w-fit"
                    >
                      Detalii
                    </Link>
                  </div>
                </div>
                <div className="bg-helllilac h-[1px] w-full my-2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerOders;
