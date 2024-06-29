import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[25rem] mx-[2rem] p-3 relative transition hover:scale-105">
      <Link to={`/product/${product._id}`}>
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded"
        />
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span>
              ₹ {product.price}
            </span>
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default Product;