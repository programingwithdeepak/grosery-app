import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { axios } = useAppContext();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch orders error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex-1 h-[95vh] overflow-y-auto p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">Orders List</h1>

      {orders.length === 0 ? (
        <div className="flex items-center justify-center h-60">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order, index) => (
            <div
              key={order._id || index}
              className="border border-gray-200 rounded-lg p-5 grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr_1fr] gap-6 items-center"
            >
              {/* Products */}
              <div className="flex items-start gap-4">
                {order.items?.[0]?.product?.image?.[0] ? (
                  <img
                    className="w-12 h-12 object-cover rounded opacity-80"
                    src={`${backendUrl}/images/${order.items[0].product.image[0]}`}
                    alt="product"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                    No Image
                  </div>
                )}

                <div className="text-sm">
                  {order.items?.map((item, itemIndex) => (
                    <p key={item._id || itemIndex} className="mb-1">
                      {item.product?.name || "Product unavailable"}

                      <span
                        className={`text-indigo-500 ml-1 ${
                          item.quantity < 2 ? "hidden" : ""
                        }`}
                      >
                        x {item.quantity}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="text-sm">
                <p className="font-medium mb-1">
                  {order.address?.firstName} {order.address?.lastName}
                </p>

                <p className="text-gray-600">
                  {order.address?.street}, {order.address?.city},{" "}
                  {order.address?.state}, {order.address?.zipcode},{" "}
                  {order.address?.country}
                </p>
              </div>

              {/* Amount */}
              <p className="font-medium text-base text-black/70">
                ${order.amount}
              </p>

              {/* Order Details */}
              <div className="flex flex-col text-sm gap-1">
                <p>
                  Method:{" "}
                  <span className="text-gray-600">{order.paymentType}</span>
                </p>

                <p>
                  Date:{" "}
                  <span className="text-gray-600">
                    {order.orderDate ||
                      (order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A")}
                  </span>
                </p>

                <p>
                  Payment:{" "}
                  <span
                    className={
                      order.isPaid ? "text-green-600" : "text-orange-500"
                    }
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
