import { EmptyCartImg, MapImg } from "../Assets";
import { toast } from "react-toastify";
import { useState } from "react";
import imgae from "../../img/delivery.png";
import { useStateValue } from "../../context/StateProvider";

const Form = () => {
  const [name, setName] = useState("");

  // obtain the checkout data here for address signing
  const [checkoutData] = useStateValue();

  console.log(checkoutData.cartTotal);

  const submitForm = (e: any) => {
    e.preventDefault();
    return toast.info(`${name} Form handling is not implemented yet`, {
      position: "top-left",
      autoClose: 3000,
      toastId: "form",
    });
  };

  return (
    <div className="h-full w-full flex items-center flex-col justify-center px-4 bg-primary">
      <iframe
        src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyDpus6ZNfg1h0VC2cmhJU-GGVqz2qfb_T8&origin=Carnegie+Mellon+University+Pittsburgh&destination=3333+Forbes+Ave+Pittsburgh&zoom=13&mode=driving"
        width="100%"
        height="100%"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Form;
