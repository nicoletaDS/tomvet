import { Link } from "react-router-dom";
import { orders } from "../../../utils/constants/Orders";

const CustomerOders = () => {
  return (
    <div className="mx-10 mt-3 flex flex-row">
      <p>heiiii</p>
      {/* <Profile />

      <div className="w-3/4 ml-6 bg-white rounded p-4">
        <p className="text-lg">Comenzile mele</p>
        <div className="bg-gray w-full h-[2px] mt-2" />

        <div className="flex flex-col justify-start">
          {orders.map((order: any) => {
            const supplier = suppliers.find(
              (x: any) => x.user?.id === order.supplier
            );
            return (
              <div>
                <div className="flex flex-row justify-between px-6 mt-6">
                  <div>
                    <div key={order.id} className="font-semibold flex flex-row">
                      Comanda nr. {order.id} -
                      <p className="italic">
                        {order.status === "to_deliver"
                          ? " in curs de livrare"
                          : order.status === "delivered"
                          ? " livrat"
                          : " anulat"}
                      </p>
                    </div>
                    <p className="font-light">Plasata pe {order.created_at}</p>
                    <p className="font-light">
                      Total {order.price}. Livrat de{" "}
                      {supplier?.user?.first_name} {supplier?.user?.last_name}
                    </p>
                  </div>

                  <div className="flex flex-col items-end">
                    <Link
                      to=""
                      className="border border-gray rounded px-6 py-1 hover:bg-green mb-3 w-fit"
                    >
                      Detalii
                    </Link>
                    {order.status === "to_deliver" ? (
                      <Link
                        to=""
                        className="border border-gray rounded px-6 py-1 hover:border-red"
                      >
                        Anuleaza
                      </Link>
                    ) : order.status === "delivered" ? (
                      <Link
                        to=""
                        className="border border-gray rounded px-6 py-1 w-fit hover:bg-green"
                      >
                        Acorda recenzie
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="bg-gray w-full h-[2px] mt-2" />
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default CustomerOders;
