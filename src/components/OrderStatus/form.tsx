import { EmptyCartImg, MapImg } from "../Assets";
import { toast } from "react-toastify";
import { useState } from "react";
import imgae from "../../img/delivery.png";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

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
        src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyDpus6ZNfg1h0VC2cmhJU-GGVqz2qfb_T8&origin=Carnegie+Mellon+University+Pittsburgh&destination=Downtown+Pittsburgh&zoom=13&mode=driving"
        width="100%"
        height="100%"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Form;
