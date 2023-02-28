import { BiLock } from "react-icons/bi";
import CardForm from "./forms/Card";
import CheckoutFooter from "./footer";
import MomoForm from "./forms/Momo";
import Selector from "./Selector";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { emptyCart } from "../../utils/functions";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";




// import React from 'react'
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";



const Body = ({ action }: { action: any }) => {
  const [
    { checkoutData, cartTotal, paymentMethod, cartItems, DonutItems, showContactForm, showOrder, showCart },
    dispatch,
  ] = useStateValue();
  const [loading, setLoading] = useState(false);


  // const completePayment = () => {
  //   dispatch({
  //     type: "TOGGLE_ORDER",
  //     showOrder: !showOrder,
  //   });
  // }

  const completePayment = () => {
    if (!checkoutData) return toast.error("Complete payment info");
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      await emptyCart(cartItems, DonutItems, dispatch);
      action(false);
      toast.success(
          "Order completed successfuly with payment. Thank you for your patronage.",
          {
            position: "top-center",
            autoClose: 6000,
          }
      );
    }, 3000);

    // dispatch({
    //   type: "TOGGLE_CONTACT_FORM",
    //   showContactForm: !showContactForm,
    // });
    dispatch({
      type: "TOGGLE_ORDER",
      showOrder: !showOrder,
    });
  };

  const handleToggleCart = () => {

    dispatch({
      type: "TOGGLE_CART",
      showCart: !showCart,
    });
  };
  return (
    <div className="w-full h-full rounded-t-[2rem]  bg-cartBg flex flex-col">
      {/* Payment Selectors */}
      <Selector />
      {/* payment form  */}
      <div className="min-h-[50vh] mt-5">
        {paymentMethod === "mobile_money" ? <MomoForm /> : <CardForm />}
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
