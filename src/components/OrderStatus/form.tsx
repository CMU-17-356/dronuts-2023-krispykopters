import {EmptyCartImg, MapImg} from "../Assets";
import { toast } from "react-toastify";
import { useState } from "react";

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
      <img src={MapImg} alt="not found" className="w-[80%] h-[60%]" />

      <p className="mb-2 cursor-pointer text-lg text-orange-400 dark:text-gray-400">
          Your Order will be there in 10 mins
      </p>
      <p className="text-lg cursor-pointer text-orange-400 dark:text-gray-400">
          The Drone is 10 miles away
      </p>
    </div>
  );
};

export default Form;
