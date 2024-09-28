import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProductsAPI } from "../api/api-product";
import { calculatePriceWithDiscount } from "../utils/PriceWithDiscount";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setLoading,
  setError,
} from "../features/product/productSlice";
import CartButton from "./CartButton";

const Product = () => {
  const dispatch = useDispatch();

  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Route navigate
  const navigate = useNavigate();

  useEffect(() => {
    console.log("UseEffect yang harus jalan di awal");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const fetchedProducts = await fetchProductsAPI();
        dispatch(setProducts(fetchedProducts));
      } catch (err) {
        dispatch(setError("Error fetching products"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-wrap justify-center gap-4 m-8">
      {products
        .filter((product) => product.quantity > 0) // Filter out products with quantity 0
        .map((product) => {
          const { originalPrice, discountedPrice, discountPercent } =
            calculatePriceWithDiscount(product.price);
          return (
            <div
              key={product.id}
              className="card card-normal bg-base-100 w-full sm:w-72 md:w-96 shadow-xl flex-shrink-0"
            >
              <figure className="px-5 pt-5">
                <img
                  src={product.image}
                  alt={`Gambar produk ${product.title}`}
                  className="rounded-xl h-48"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold text-2xl">
                  <a href={`/#/detail/${product.id}`} className="title">
                    {product.title}
                  </a>
                </h2>
                <div className="card-actions justify-start">
                  <div className="badge badge-secondary">
                    <p>⭐ {product.rating.rate}/5</p>
                  </div>
                  <div className="badge badge-outline">{product.category}</div>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-bold line-through mr-2">
                    ${originalPrice}
                  </span>
                  <span className="text-xl font-bold mr-2">
                    ${discountedPrice}
                  </span>
                  <span className="text-sm text-red-500">
                    -{discountPercent}% off!
                  </span>
                </div>

                <div className="desc">
                  <p>{product.description}</p>
                </div>
                <div className="mt-2 flex items-center">
                  <p
                    className={`text-sm ${
                      product.quantity < 5 ? "text-red-500" : "text-black"
                    }`}
                  >
                    Quantity: {product.quantity}
                  </p>
                  {product.quantity < 5 && (
                    <span className="ml-2 text-red-500 font-semibold">
                      Low Stock
                    </span>
                  )}
                </div>

                <div className="flex justify-between gap-2 mt-3">
                  <button
                    className="btn flex items-center flex-1"
                    onClick={() => navigate(`/detail/${product.id}`)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                      />
                    </svg>
                    <span className="flex-1 text-left">Detail</span>
                  </button>
                  <CartButton item={product} quantity={1} />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Product;
