import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style/CartScreen.css";
import Breadcrumbs from "../../../app/components/custom/Breadcrumbs";
import { products } from "../../../utils/constants/ProductsData";
import { AppDispatch, RootState } from "../../../store/store";
import { addToCart, removeFromCart } from "../slices/cartSlice";

function CartScreen(props: any) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // get the selected quantity from the url
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    const updateCart = async () => {
      if (id) {
        await dispatch(addToCart({ id, qty }));
      }
    };
    updateCart();
  }, [dispatch, id, qty]);

  const removeFromCartHandler = async (itemId: any) => {
    await dispatch(removeFromCart(itemId));
  };

  const checkoutHandler = () => {
    navigate("/login", {
      state: { redirect: "/transport" },
    });
    navigate("/transport");
  };

  return (
    <div>
      <Breadcrumbs>Cosul meu</Breadcrumbs>
      <div className="cart">
        <h1 className="title">Cosul meu</h1>
        {cartItems.length === 0 ? (
          <p>
            Inca nu ai produse in cosul de cumparaturi.{" "}
            <Link className="no-items" to="/produse">
              Cumpara acum.
            </Link>
          </p>
        ) : (
          <form className="cart-form">
            <table className="cart-items">
              <thead>
                <tr>
                  <th className="first">PRODUS</th>
                  <th>PRET</th>
                  <th>CANTITATE</th>
                  <th className="last" colSpan={2}>
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: any) => (
                  <tr className="cart-item" key={item.product}>
                    <td className="product-item">
                      <button
                        className="remove"
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        x
                      </button>
                      <Link to={`/products/${item.product}`}>
                        <img src={item.image} alt={item.name}></img>
                        <span className="product-item-details">
                          {item.title}
                        </span>
                      </Link>
                    </td>

                    <td className="price" data-title="Price">
                      <span className="money">{item.price}RON</span>
                    </td>
                    <td className="quantity" data-title="Quantity">
                      <select
                        value={item.qty}
                        onChange={async (e) =>
                          await dispatch(
                            addToCart({
                              id: item.product,
                              qty: Number(e.target.value),
                            })
                          )
                        }
                      >
                        {[...new Array(item.count_in_stock).keys()].map(
                          (val) => {
                            return (
                              <option key={val + 1} value={val + 1}>
                                {val + 1}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </td>
                    <td className="total" data-title="Total">
                      <span className="money">
                        {(item.price * item.qty).toFixed(2)}RON
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-totals">
              <p className="mt-4 text-xl">
                {cartItems
                  .reduce(
                    (acc: any, item: any) => acc + item.price * item.qty,
                    0
                  )
                  .toFixed(2)}{" "}
                RON
              </p>
              <button
                type="button"
                className="bg-lilac w-fit px-4 py-1 rounded-full text-white"
                onClick={checkoutHandler}
              >
                Mai departe
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CartScreen;
