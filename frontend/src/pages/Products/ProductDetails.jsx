import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import ScrollToTop from "../../Utils/ScrollToTop.js";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  console.log(product)

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  ScrollToTop()

  return (
    <>
      <div className="flex flex-row">
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[2rem] mx-[0.5rem]"
        >
          home
        </Link>

        <p>{"<<"}</p>

        <Link
          to="/shop"
          className="text-white font-semibold hover:underline mx-[0.5rem]"
        >
          shop
        </Link>

        <p>{"<<"}</p>

        <Link
          className="text-white font-semibold hover:underline mx-[0.5rem]"
        >
          product
        </Link>

      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] mx-[2rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[40rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] rounded-lg"
              />
              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-4xl font-semibold my-2">{product.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>

              <p className="text-5xl my-4 font-extrabold"><span className="text-red-600">₹</span> {product.price.toLocaleString("en-US")}</p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[20rem]">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {product.createAt}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>

                  <h1 className="flex items-center mb-2 w-[10rem]">
                    <FaBox className="mr-2 text-white" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap my-3">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}/>
              </div>

              <div className="flex justify-between btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-red-600 text-white py-3 w-full px-4 rounded-lg">
                  {product.countInStock === 0 ? "Out Of Stock": "Add To Cart"}
                </button>  

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-3 mr-12 ml-4 w-[4rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

          </div>            
          <div className="mt-[5rem] container flex flex-wrap items-start justify-between mx-[1rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;