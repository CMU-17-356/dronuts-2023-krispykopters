import React from "react";
import { HeroBg } from "../Assets";
import StaticsImages from "./Statics";

// Import the data from static URL
import { data } from "../../utils/fetchTopDronesData";

// The right panel
const Right = () => {
  return (
    <div className="py-2 flex-1 flex items-center relative">
      <img
        src={HeroBg}
        alt=""
        className="ml-auto lg:h-[550px] h-[420px] w-full lg:w-auto"
      />
      <StaticsImages items={data} />
    </div>
  );
};

export default Right;
