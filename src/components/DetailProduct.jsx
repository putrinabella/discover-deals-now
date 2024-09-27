import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductsAPI } from "../api/api-endpoint";
import { calculatePriceWithDiscount } from "../utils/PriceWithDiscount";

const DetailProduct = () => {
  // Route navigate
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL

  useEffect(() => {
    console.log("UseEffect yang harus jalan di awal");
  }, []);

  // Get data from API
  const [product, setProduct] = useState(null); // Change to store a single product
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await fetchProductsAPI();
        // Find the product with the matching ID
        const foundProduct = fetchedProducts.find(
          (prod) => prod.id === parseInt(id)
        );
        if (foundProduct) {
          setProduct(foundProduct); // Set the specific product
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product data available.</p>;

  const { originalPrice, discountedPrice, discountPercent } =
    calculatePriceWithDiscount(product.price);

  return (
    <div className="card lg:card-side bg-white shadow-xl lg:m-20 m-5">
      <div className="lg:w-1/3 w-full">
        <figure className="p-10">
          <img
            src={product.image}
            alt={`Gambar produk ${product.title}`}
            className="rounded-xl max-h-96 max-w-full object-contain"
          />
        </figure>
      </div>

      <div className="card-body lg:w-2/3 w-full">
        <h2 className="card-title font-bold text-4xl">{product.title}</h2>
        <div className="mt-2">
          <span className="text-2xl font-bold line-through mr-2">
            ${originalPrice}
          </span>
          <span className="text-3xl font-bold mr-2">${discountedPrice}</span>
          <span className="text-lg text-red-500">-{discountPercent}% off!</span>
        </div>
        <div className="card-actions justify-start">
          <div className="badge badge-secondary p-4">
            <p className="text-lg">⭐ {product.rating.rate}/5</p>
          </div>
          <div className="badge badge-outline text-lg p-4">
            {product.category}
          </div>
        </div>
        <div className="desc-detail mt-3">
          <p>{product.description}</p>
        </div>
        <div className="card-actions justify-start mt-5">
          <label className="form-control w-2/12 max-w-xs">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label">
              <span className="label-text-alt">Input Quantity</span>
            </div>
          </label>
          <button className="btn">
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span className="flex-1 text-left">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>

    // <div className="card card-normal bg-base-100 w-full sm:w-72 md:w-96 shadow-xl flex-shrink-0">
    //   <figure className="px-5 pt-5">
    //     <img
    //       src={product.image}
    //       alt={`Gambar produk ${product.title}`}
    //       className="rounded-xl h-48"
    //     />
    //   </figure>
    //   <div className="card-body">
    //     <h2 className="card-title font-bold text-2xl">{product.title}</h2>
    //     <div className="card-actions justify-start">
    //       <div className="badge badge-secondary">
    //         <p>⭐ {product.rating.rate}/5</p>
    //       </div>
    //       <div className="badge badge-outline">{product.category}</div>
    //     </div>
    //     <div className="mt-2">
    //       <span className="text-lg font-bold line-through mr-2">
    //         ${originalPrice}
    //       </span>
    //       <span className="text-lg font-bold mr-2">${discountedPrice}</span>
    //       <span className="text-sm text-red-500">-{discountPercent}% off!</span>
    //     </div>

    //     <div className="desc">
    //       <p>{product.description}</p>
    //     </div>

    //     <div className="flex justify-between gap-2 mt-3">
    //       <button
    //         className="btn flex items-center flex-1"
    //         onClick={() => navigate(`/detail/${product.id}`)}
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="h-6 w-6 mr-2"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
    //           />
    //         </svg>
    //         <span className="flex-1 text-left">Detail</span>
    //       </button>

    //       <button className="btn flex items-center flex-1">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="h-6 w-6 mr-2"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    //           />
    //         </svg>
    //         <span className="flex-1 text-left">Add to Cart</span>
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DetailProduct;
