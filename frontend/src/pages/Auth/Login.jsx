import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [toggle, setToggle] = useState(false)

  const toggling = (e) => {
    e.preventDefault();
    setToggle(!toggle)
  }

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      // console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <section className="flex item-center justify-center flex-wrap">
        <div className="mx-4 mb-20 mt-[1rem] bg-black p-10 rounded-3xl w-[30rem]">

          <h1 className="text-[2.5rem] mb-4 capitalize tracking-[-3px] font-[850]">Login</h1>

          <form onSubmit={submitHandler} className="container w-full">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 p-2 border rounded-xl w-full"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white flex justify-between"
              >
                Password
                <button className="text-xl" type="button" onClick={toggling}>{toggle ? "🙈" : "🐵"}</button>
              </label>
              <input
                type={toggle ? "text" : "password"}
                id="password"
                required
                className="mt-1 p-2 border rounded-xl w-full"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-xl cursor-pointer w-full transition-all hover:bg-red-700"
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white text-center">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-red-500 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;