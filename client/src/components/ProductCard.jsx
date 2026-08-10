import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/product/${product.category.toLowerCase()}/${product?._id}`
          );
          scrollTo(0, 0);
        }}
        className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full min-w-0"
      >
        {/* Product Image */}
        <div className="flex items-center justify-center h-48">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36 max-h-full object-contain"
            src={`${import.meta.env.VITE_BACKEND_URL}/images/${product.image[0]}`}
            alt={product.name}
          />
        </div>

        {/* Category */}
        <p className="text-gray-500 text-sm mt-2">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-gray-800 font-medium text-lg truncate">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={
                  i < 4
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt="rating"
                className="w-3 md:w-3.5"
              />
            ))}

          <p className="text-gray-400 text-sm">(4)</p>
        </div>

        {/* Price + Add Button */}
        <div className="flex items-center justify-between gap-2 mt-4">
          {/* Price */}
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-xl text-indigo-500 font-medium whitespace-nowrap">
              ${product.offerPrice}
            </span>

            <span className="text-sm text-gray-400 line-through whitespace-nowrap">
              ${product.price}
            </span>
          </div>

          {/* Cart Button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="text-indigo-500 flex-shrink-0"
          >
            {!cartItems?.[product?._id] ? (
              <button
                onClick={() => addToCart(product?._id)}
                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium cursor-pointer"
              >
                <span>🛒</span>
                Add
              </button>
            ) : (
              <div className="flex items-center border border-indigo-300 rounded h-[34px]">
                {/* Remove */}
                <button
                  onClick={() => removeFromCart(product?._id)}
                  className="cursor-pointer text-md px-2"
                >
                  -
                </button>

                {/* Quantity */}
                <span className="px-1">
                  {cartItems[product?._id]}
                </span>

                {/* Add */}
                <button
                  onClick={() => addToCart(product?._id)}
                  className="cursor-pointer text-md px-2"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
