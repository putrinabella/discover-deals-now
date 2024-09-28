import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductsAPI } from "../api/api-product";
import { calculatePriceWithDiscount } from "../utils/PriceWithDiscount";
import CartButton from "./CartButton";

const DetailProduct = () => {
  // Route navigate
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await fetchProductsAPI();
        const foundProduct = fetchedProducts.find(
          (prod) => prod.id === parseInt(id)
        );
        if (foundProduct) {
          setProduct(foundProduct);
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
    <div
      key={product.id}
      className="card lg:card-side bg-white shadow-xl lg:m-20 m-5"
    >
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
          <CartButton item={product} />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
