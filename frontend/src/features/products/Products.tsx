import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import BestsellerCard from "./components/BestsellerCard";
import { categories } from "../../utils/constants/Categories";
import CategoriesCard from "./components/CategoriesCard";
import { getAllProducts } from "../../app/api/productsApi";

const Products = (props: any) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const bestsellers = products.slice(0, 5);

  return (
    <div className="mx-10 mt-3 flex flex-col justify-center items-center">
      <div className="bg-helllilac rounded-xl px-6 mt-10">
        <h2 className="flex justify-center text-xl text-center font-bold my-3 pt-4">
          Bestseller
        </h2>

        <div className="flex flex-row justify-between pb-10 pr-6">
          {bestsellers.map((item: any, index: number) => (
            <BestsellerCard item={item} index={index} />
          ))}
        </div>
      </div>

      <div className="px-6 mt-10">
        <h2 className="flex justify-center text-xl text-center font-bold my-3 pt-4">
          Categorii
        </h2>

        <div className="flex flex-row justify-between pb-10 pr-6">
          {categories.map((item: any, index: number) => (
            <CategoriesCard item={item} bgColor={item.bgColor} index={index} />
          ))}
        </div>
      </div>

      <div className="px-6 mt-10">
        <h2 className="flex justify-center text-xl text-center font-bold my-3 pt-4">
          Toate produsele
        </h2>

        <div className="flex flex-row flex-wrap justify-between pb-10 pr-6 ">
          {products.map((item: any, index: number) => (
            <ProductCard item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
