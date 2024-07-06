import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* <AdminMenu /> */}
          <div className="overflow-x-auto mt-10">
            <table className="min-w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/5 p-3 text-left">ITEMS</th>
                  <th className="w-1/5 p-3 text-left">ID</th>
                  <th className="w-1/5 p-3 text-left">USER</th>
                  <th className="w-1/5 p-3 text-left">DATE</th>
                  <th className="w-1/5 p-3 text-left">TOTAL</th>
                  <th className="w-1/5 p-3 text-left">PAID</th>
                  <th className="w-1/5 p-3 text-left">DELIVERED</th>
                  <th className="w-1/5 p-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-3">
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-3">{order._id}</td>
                    <td className="p-3">{order.user ? order.user.username : "N/A"}</td>
                    <td className="p-3">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                    <td className="p-3">₹{order.totalPrice}</td>
                    <td className="p-3">
                      {order.isPaid ? (
                        <p className="text-center bg-green-400 text-white p-1 rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="text-center bg-red-400 text-white p-1 rounded-full">
                          Pending
                        </p>
                      )}
                    </td>
                    <td className="p-3">
                      {order.isDelivered ? (
                        <p className="text-center bg-green-400 text-white p-1 rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="text-center bg-red-400 text-white p-1 rounded-full">
                          Pending
                        </p>
                      )}
                    </td>
                    <td className="p-3">
                      <Link to={`/order/${order._id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded">More</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default OrderList;
