import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

import MiniLoader from "../../components/MiniLoader";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false)

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    setLoader(true)

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);

      setLoader(false)

      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {

      toast.error(error?.data?.message || error.error);
      setLoader(false)

    }
  };

  return (
    <div className="container mx-auto px-4 xl:px-24">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h1 className="text-[2rem] mb-4 tracking-[-2px] font-[999]">Create Product</h1>

          {imageUrl && (
            <div className="text-center mb-4">
              {
                loader ? <MiniLoader /> 
                : 
                <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] rounded-lg object-cover"
              />
              }
            </div>
          )}

          <div className="mb-3">
            <label className="block w-full py-3 px-4 bg-gray-800 text-white text-center rounded-lg cursor-pointer font-bold transition-all hover:bg-slate-700">
              {image ? <span className="text-white">image.name</span> : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
                required
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-gray-800 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label htmlFor="price" className="block text-gray-700">Price ₹</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg bg-gray-800 text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg bg-gray-800 text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label htmlFor="brand" className="block text-gray-700">Brand</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-gray-800 text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <textarea
                className="w-full p-3 border rounded-lg bg-gray-800 text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label htmlFor="countInStock" className="block text-gray-700">Count In Stock</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg bg-gray-800 text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6">
                <label htmlFor="category" className="block text-gray-700">Category</label>
                <select
                  required
                  className="w-full p-3 border rounded-lg bg-gray-800 text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 mt-4 rounded-lg text-lg font-bold bg-red-600 text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
