import {useEffect, useState} from "react";
import { ServerUrl } from "../../consts";
import { HeroBg } from "../Assets";
import StaticsImages from "./Statics";

// Import the data from static URL
import { data } from "../../utils/fetchTopDronesData";

// The right panel
const Right = () => {
  const [donuts, setDonuts] = useState([]);
  useEffect(() => {
    fetch(`${ServerUrl}/api/donuts`)
     .then((response) => response.json())
     .then((data) => {
      console.log(data);
      setDonuts(data);
     })
     .catch((err) => {
        console.log(err.message);
     })
   }, []);
  return (
    <div className="py-2 flex-1 flex items-center relative">
      <img
        src={HeroBg}
        alt=""
        className="ml-auto lg:h-[550px] h-[420px] w-full lg:w-auto"
      />
      <StaticsImages items={donuts} />
    </div>
  );
};

export default Right;
