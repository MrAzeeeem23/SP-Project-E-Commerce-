import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStore } from "react-icons/fa";
// import "./style.css"

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 mt-[450px] flex justify-center items-center p-10 w-[100%]">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[90%] lg:w-[70%] md:w-[80%] sm:w-[90%] w-full"
        >
          {products.map(({ image, _id, name, price, brand }) => (
            <div key={_id}>
              <img
                src={image}
                alt={name}
                className="w-full rounded-lg object-cover h-[20rem] sm:h-[25rem] md:h-[30rem]"
              />
              <div className="mt-4 flex flex-col sm:flex-row justify-between">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-lg font-semibold">{name}</h2>
                  <p className="text-md">₹ {price}</p>
                </div>
                <div className="flex items-center">
                  <FaStore className="mr-2 text-gray-700" />
                  <span className="text-md font-medium">Brand: {brand}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
