import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import { Link } from "react-router-dom";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
   <>
     
    <div className="container mx-auto mt-8">
      <div> <div>
        <Link to="/"
          className="text-white font-semibold hover:underline ml-3">
          Go Back
        </Link>
      </div>
        <h1 className="text-[4rem] mb-4 uppercase tracking-[-5px] font-[999] relative ">favorites.</h1>
      </div>
      <div className="flex flex-wrap justify-center items-center pb-2">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  </> 
  );
};

export default Favorites;