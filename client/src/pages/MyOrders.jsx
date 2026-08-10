import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { axios, user } = useAppContext();

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/order/user");

      console.log("Orders response:", data);

      if (data.success) {
        setMyOrders(data.orders || []);
      } else {
        toast.error(data.message || "Unable to fetch orders");
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  // User not logged in
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Please login to see your orders
          </h2>
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="mt-16 pb-16 px-4 md:px-10 lg:px-20">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Orders</h1>

      {/* No orders */}
      {myOrders.length === 0 ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-700">
              No orders found
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't placed any orders yet.
            </p>
          </div>
        </div>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={order._id || index}
            className="my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-5xl"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3  pb-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>

              <p className="text-sm text-gray-700">
                <span className="font-semibold">Payment:</span>{" "}
                {order.paymentType || "COD"}
              </p>

              <p className="text-sm text-gray-700">
                <span className="font-semibold">Total:</span> $
                {order.amount || 0}
              </p>
            </div>

            {/* Order Items */}
            {order.items?.map((item, itemIndex) => {
              const product = item.product;

              return (
                <div
                  key={item._id || itemIndex}
                  className={`relative bg-white text-gray-800/70 ${
                    order.items.length !== itemIndex + 1 ? "border-b" : ""
                  } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 w-full`}
                >
                  {/* Product */}
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="p-2 rounded-lg">
                      {product?.image?.[0] ? (
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/images/${product.image[0]}`}
                          alt={product?.name || "Product"}
                          className="w-16 h-16 object-contain"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      <h2 className="text-lg md:text-xl font-medium text-gray-800">
                        {product?.name || "Product unavailable"}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {product?.category || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="text-sm md:text-lg font-medium mb-4 md:mb-0">
                    <p>
                      Quantity:{" "}
                      <span className="font-normal">{item.quantity || 1}</span>
                    </p>

                    <p>
                      Status:{" "}
                      <span className="font-normal">
                        {order.status || "Pending"}
                      </span>
                    </p>

                    <p>
                      Date:{" "}
                      <span className="font-normal">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "N/A"}
                      </span>
                    </p>
                  </div>

                  {/* Amount */}
                  <p className="text-lg font-medium">
                    Amount: ${(product?.offerPrice || 0) * (item.quantity || 1)}
                  </p>
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
