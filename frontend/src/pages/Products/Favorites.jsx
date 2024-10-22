import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import { Link } from "react-router-dom";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);
  return (
   <>
    <div className="container mx-auto mt-8">
      <div>
        <h1 className="text-[4rem] mb-4 capitalize tracking-[-5px] font-[999] relative ">favorites.</h1>
      </div>
      <div className="flex flex-wrap justify-center items-center pb-2">

        {favorites.length === 0 ? 
        <span className="text-[1.5rem] mb-2 mt-4 tracking-[-1.5px] font-[700] relative ">You don't have any favorite item. 💔</span>
        : 
        favorites.map((product) => (
          <Product key={product._id} product={product} /> 

        ))
        }
        
      </div>
    </div>
  </> 
  );
};

export default Favorites;