import { EmptyCartImg, MapImg } from "../Assets";
import { toast } from "react-toastify";
import { useState } from "react";
import imgae from "../../img/delivery.png";
import { useStateValue } from "../../context/StateProvider";

const Form = () => {
  const startPoint = "Carnegie+Mellon+University+Pittsburgh";

  //console.log(checkoutData);
  //console.log(checkoutData.checkoutData.address);

  // obtain the checkout data here for address signing
  const [checkoutData] = useStateValue();
  let destinationAddr = checkoutData.checkoutData.address;
  destinationAddr = destinationAddr.replace(/ /g, "+");

  console.log(destinationAddr);

  const [name, setName] = useState("");

  const map =
    "https://www.google.com/maps/embed/v1/directions?key=AIzaSyDpus6ZNfg1h0VC2cmhJU-GGVqz2qfb_T8";
  const origin = map.concat("&origin=Carnegie+Mellon+University+Pittsburgh");
  const destination = origin.concat("&destination=").concat(destinationAddr);
  const finalApiCall = destination.concat("&zoom=13&mode=driving");

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
        src={finalApiCall}
        width="100%"
        height="100%"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Form;
