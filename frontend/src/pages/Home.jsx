import { Link, useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useGetNewProductsQuery,
} from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import MainHeader from "./Auth/MainHeader";
import ScrollToTop from "../Utils/ScrollToTop.js";

const Home = () => {
  const { keyword } = useParams();
  // const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  const { data, isLoading, isError } = useGetNewProductsQuery();

  console.log(data);

  return (
    <>
      <MainHeader />
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <Link
              to="/shop"
              onClick={ScrollToTop}
              className="bg-[#e5202b] font-bold rounded-full uppercase italic py-3 px-20 my-20 hover:bg-[#cd696e]"
            >
              Shop all products
            </Link>
          </div>

          <div>
            <h1 className="text-[3rem] ml-20 mb-4 tracking-[-3px] font-[999]">
              New Arrivals❗
            </h1>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
