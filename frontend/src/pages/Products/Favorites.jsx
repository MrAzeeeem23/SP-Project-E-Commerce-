import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import { Link } from "react-router-dom";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
   <>
      <div>
        <Link to="/"
          className="text-white font-semibold hover:underline ml-3">
          Go Back
        </Link>
      </div>
    <div className="ml-auto flex flex-col justify-center items-center">
      <h1 className="text-lg font-bold mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  </> 
  );
};

export default Favorites;