import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductsAPI } from "../api/api-product";
import { calculatePriceWithDiscount } from "../utils/PriceWithDiscount";
import QuantityControl from "./QuantityControl";

const DetailProduct = () => {
  // Route navigate
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Default quantity for add to cart
  const [quantity, setQuantity] = useState(1);

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

  // Handler to increase or decrease quantity
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

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
          <div className="badge bg-SunflowerLeafGreen p-4">
            <p className="text-lg text-white">⭐ {product.rating.rate}/5</p>
          </div>
          <div className="badge badge-outline text-lg p-4">
            {product.category}
          </div>
        </div>
        <div className="desc-detail mt-3">
          <p>{product.description}</p>
        </div>
        <QuantityControl
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
          product={product}
        />
      </div>
    </div>
  );
};

export default DetailProduct;
