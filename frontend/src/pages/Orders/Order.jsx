import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";


const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (order && !order.isPaid) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [order]);

  const handlePayment = async () => {
    const options = {
      key: "",
      amount: order.totalPrice * 100, 
      currency: "INR",
      name: "Beats",
      description: "Order Payment",
      order_id: order._id, 
      handler: async (response) => {
        const paymentResult = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        try {
          await payOrder({ orderId, paymentResult });
          refetch();
          toast.success("Order is paid");
        } catch (error) {
          toast.error(error?.data?.message || error.message);
        }
      },
      prefill: {
        name: order.user.username,
        email: order.user.email,
        contact: "Contact Number", 
      },
      notes: {
        address: order.shippingAddress.address,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePaymentdummy = async () => {
    try {
      const paymentResult = {
        razorpay_payment_id: "simulated_payment_id", 
        status: 'COMPLETED',
        update_time: new Date().toISOString(), 
        payer: {
          email_address: order.user.email,
        },
      };
  
      await payOrder({ orderId, paymentResult });
      refetch(); 
      toast.success("Payment simulated. Order marked as paid.");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (    
    <div className="flex flex-col justify-center items-center mx-2">
      <h1 className="text-[4rem] mb-4 capitalize tracking-[-5px] font-[999] mx-4">Payment.</h1>
      <div className="pr-4">
        <div className="border border-gray-300 mt-5 mb-5 w-[auto]">
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-auto">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>

                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        ₹ {(item.qty * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-red-500">Order:</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="text-red-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-red-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-red-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-4">
            <strong className="text-red-500">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Messsage variant="success">Paid on {order.paidAt}</Messsage>
          ) : (
            <Messsage variant="danger">Not paid</Messsage>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>₹ {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>₹ {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>₹ {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>₹ {order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}
            <button
              type="button"
              className="bg-red-500 text-white w-full py-2 m-2 rounded-md"
              onClick={handlePayment}
            >
              Pay with Razorpay
            </button>
          </div>
        )}

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}
            <button
              type="button"
              className="bg-yellow-500 text-white w-full py-2 m-2 rounded-md"
              onClick={handlePaymentdummy}
            >
              Dummy Payment
            </button>
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin &&(
          <div>
            <button
              type="button"
              className="bg-red-500 text-white w-full py-2 m-2 rounded-md"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
