import { BiLock } from "react-icons/bi";
import CardForm from "./forms/Card";
import CheckoutFooter from "./footer";
import MomoForm from "./forms/Momo";
import Selector from "./Selector";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { emptyCart, hideCart } from "../../utils/functions";
import { useState, useEffect } from "react";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";

const Body = ({ action }: { action: any }) => {
  const [
    {
      checkoutData,
      cartTotal,
      paymentMethod,
      cartItems,
      DonutItems,
      showOrder,
      showCart,
    },
    dispatch,
  ] = useStateValue();

  // Update the checkout data
  const updateCheckoutData = (key: string, val: string) => {
    dispatch({
      type: "UPDATE_CHECKOUT_DATA",
      checkoutData: {
        ...checkoutData,
        [key]: val,
      },
    });
  };

  const [loading, setLoading] = useState(false);

  const completePayment = () => {
    if (!checkoutData) return toast.error("Complete payment info");
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);

      // First empty the shopping Cart
      await emptyCart(cartItems, DonutItems, dispatch);

      // If also, hide the Cart
      // await hideCart(dispatch);

      action(false);
      toast.success(
        "Order completed successfuly with payment. Thank you for your patronage.",
        {
          position: "top-center",
          autoClose: 6000,
        }
      );
    }, 3000);

    dispatch({
      type: "TOGGLE_ORDER",
      checkoutData: checkoutData,
      showOrder: !showOrder,
    });
  };

  const handleToggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
      showCart: !showCart,
    });
  };

  useEffect(() => {
    updateCheckoutData("address", "Carnegie+Mellon+University+Pittsburgh");
  }, []);

  return (
    <div className="w-full h-full rounded-t-[2rem]  bg-cartBg flex flex-col">
      {/* Payment Selectors */}
      <Selector />
      {/* payment form  */}
      <div className="w-full p-1 px-2 rounded-lg flex flex-col">
        {paymentMethod === "mobile_money" ? <MomoForm /> : <CardForm />}
        <div className="w-full flex flex-col mb-2">
          <label
            htmlFor="number"
            className="font-bold text-sm mb-1 text-gray-100"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            className="w-full flex flex-col px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
            placeholder="Enter your Address"
            autoComplete="off"
            onChange={(e) => updateCheckoutData("address", e.target.value)}
          />
        </div>
        <div className="w-full flex items-center justify-center my-2">
          <p className="text-gray-300">
            Amount Due:{" "}
            <span className="font-bold text-white">{`$${cartTotal}`}</span>{" "}
          </p>
        </div>
        {/* pay now button */}

        <div className="w-full flex items-center justify-center mt-4">
          <motion.button
            onClick={completePayment}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 w-[90%] p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 transition-all duration-75 ease-in-out text-gray-50 text-lg my-2 hover:shadow-lg"
          >
            {!loading && <BiLock className="" />}
            {!loading ? (
              "PAY NOW"
            ) : (
              <ImSpinner3 className="animate animate-spin" />
            )}
          </motion.button>
        </div>
      </div>
      <CheckoutFooter />
    </div>
  );
};

export default Body;
