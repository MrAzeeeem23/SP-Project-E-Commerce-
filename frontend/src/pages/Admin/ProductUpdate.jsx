import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

import MiniLoader from "../../components/MiniLoader";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const [loader, setLoader] = useState(false)
  
  // const [enable, setEnable] = useState(false)

  // console.log("State: ", image)

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);
      
      const data = await updateProduct({ productId: params._id, formData }).unwrap();
      
      if (data?.error) {
        toast.error(data.error, "Product Update Faild");
      } else {
        toast.success("Product updated successfully");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
    uploadFileHandler()
  };
  
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    setLoader(true)

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
      setLoader(false)
    } catch (err) {
      toast.error("Image upload failed");
      setLoader(false)
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;

      const { data } = await deleteProduct(params._id).unwrap();
      toast.success(`"${data.name}" has been deleted`);
      navigate("/admin/allproductslist");

    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 xl:px-24">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h1 className="text-[2rem] mb-4 tracking-[-2px] font-[999]">Update / Delete Product</h1>

          {image && (
            <div className="text-center mb-4">
              {
                loader ? <MiniLoader />
                 : 
                <img src={image} alt="product" className="mx-auto w-60 h-60 object-cover rounded-lg" />
              }
            </div>
          )}

          <div className="mb-3">
            <label className="block w-full text-center py-2 px-4 bg-gray-800 text-white rounded-lg cursor-pointer transition-all hover:bg-slate-700">
              {image ? image.name : "Upload image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className=""
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg bg-gray-800 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="price" className="block text-gray-700">Price</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg bg-gray-800 text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-2 border rounded-lg bg-gray-800 text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="brand" className="block text-gray-700">Brand</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg bg-gray-800 text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <textarea
                className="w-full p-2 border rounded-lg bg-gray-800 text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label htmlFor="countInStock" className="block text-gray-700">Count In Stock</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg bg-gray-800 text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="category" className="block text-gray-700">Category</label>
                <select
                  required
                  className="w-full p-2 border rounded-lg bg-gray-800 text-white"
                  value={category}
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

            <div className="flex space-x-4">
              <button
                type="submit"
                // disabled={enable ? true : false}
                className="py-2 px-4 rounded-lg text-white font-bold bg-green-600"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-2 px-4 rounded-lg text-white font-bold bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;