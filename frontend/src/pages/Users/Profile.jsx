import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import MiniLoader from "../../components/MiniLoader";

import { useProfileMutation, useAvatarImageMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loader, setLoader] = useState(false)

  const [avatar , setAvatar] = useState("")

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const [avatarImage] = useAvatarImageMutation()

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
    setAvatar(userInfo.avatar)
  }, [userInfo.email, userInfo.username, userInfo.avatar]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
          avatar
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const uploadFileHandler = async (e) => {
    const formdata = new FormData();
    formdata.append("image", e.target.files[0]);
    setLoader(true)
    try {
      const res = await avatarImage(formdata).unwrap()
      toast.success("Avatar Updated Successfully");
      setLoader(false)
      setAvatar(res.image);
    } catch (error) {
      toast.error("Avatar Upload Faild");
      setLoader(false)
    }
  }

  return (
    <div className="container mx-auto p-4 mb-[10rem]">
      <h1 className="text-[4rem] mb-4 uppercase tracking-[-5px] font-[999]">Profile.</h1>
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          
          <form onSubmit={submitHandler}>
          <div className="mb-4">
          {avatar && (
            <div className="text-center mb-4">

              {loader ?  
              <MiniLoader />
               : 
              <img src={avatar} alt="product" 
              className="mx-auto w-60 h-60 object-cover rounded-full shadow-2xl shadow-fuchsia-200" />
              }

            </div>
          )}
            <label className="block bg-slate-900 p-4 text-white mb-2 cursor-pointer text-center rounded-xl transition-all hover:bg-slate-700">
                  {/* {avatar ? avatar.name : "Update Avatar"} */}
                  <span className="text-xl">Update Avatar</span>
              <input
                type="file"
                placeholder="Add Avatar"
                name="avatar"
                className="hidden form-input p-4 rounded-sm w-full bg-slate-500"
                accept="image/*"
                onChange={uploadFileHandler}
              />
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Update
              </button>

              <Link
                to="/userorder"
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
