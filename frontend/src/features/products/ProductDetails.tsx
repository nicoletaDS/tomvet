import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./ProductScreen.css";

import Breadcrumbs from "../../app/components/custom/Breadcrumbs";
import ProductCard from "./components/ProductCard";
import { getAllProducts } from "../../app/api/productsApi";
import { backendURL } from "../../utils/constants/link";

const ProductDetails = (props: any) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const products: Product[] = await getAllProducts();
        const result: Product | undefined = products.find(
          (elem: any) => elem.id == id
        );
        setProduct(result || null);

        const related: Product[] = products.filter(
          (elem: any) =>
            elem.category === product?.category && elem.id !== product?.id
        );
        setRelatedProducts(related?.slice(0, 4) || []);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, product?.category, product?.id]);

  const addToCartHandler = () => {
    navigate(`/cos/${id}?qty=${qty}`);
  };

  return (
    <div>
      {product && (
        <Breadcrumbs>
          <Link to={product.category}>{product.category}</Link>/{product.title}
        </Breadcrumbs>
      )}

      {loading && <h2>Loading...</h2>}
      {error && <p className="error">{error}</p>}
      {product && (
        <>
          <div className="mt-6 flex flex-row px-10">
            <div className="left">
              <img
                className="max-h-[600px] w-auto"
                src={backendURL + product.image}
                alt="img"
              ></img>
            </div>

            <div className="right">
              <div className="name">{product.title}</div>

              <p className="price">
                {product.price}RON -{" "}
                <span>
                  {product.count_in_stock > 0 ? (
                    <>In Stoc</>
                  ) : (
                    <>Produs indisponibil momentan</>
                  )}
                </span>
              </p>

              {product.count_in_stock > 0 && (
                <>
                  <div className="qty">
                    <label>Cantitate:</label>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(product.count_in_stock).keys()].map((val) => {
                        return (
                          <option key={val + 1} value={val + 1}>
                            {val + 1}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <p className="mt-2 text-[14px]">
                    Total: {(qty * product.price).toFixed(2)}RON;
                  </p>
                </>
              )}

              <div className="w-fit bg-lilac rounded-full text-white py-1 px-4 mt-6">
                <button
                  disabled={product.count_in_stock > 0 ? false : true}
                  className="hover:underline"
                  onClick={addToCartHandler}
                >
                  + adaugă în coș
                </button>
              </div>
              <p className="brand">
                Descriere: <br /> {product.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col px-10 mt-10 justify-center items-center">
            <h1 className="text-xl text-center font-bold my-3 pt-4">
              Produse similare
            </h1>
            <div className="flex flex-row flex-wrap justify-between pb-10 pr-6 ">
              {relatedProducts.map((item: any, index: number) => (
                <ProductCard item={item} index={index} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
