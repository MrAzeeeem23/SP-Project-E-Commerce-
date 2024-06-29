import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import "./style.css"

const SmallProduct = ({ product }) => {
  return (
    <div className="bg-black side-cut my-8 w-[20rem] mx-[1rem] p-3 transition hover:scale-105">
      <Link to={`/product/${product._id}`}>
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
          <h2 className="justify-between items-center">
            <div><i><b>{product.name}</b></i></div>
            <span >
              ₹{product.price}
            </span>
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default SmallProduct;