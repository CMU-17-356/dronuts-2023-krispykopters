import { useEffect, useState } from "react";
import { ServerUrl } from "../../src/consts";

import { Donut } from "../../types";
import { useStateValue } from "../context/StateProvider";

// Import mock data from static

export const FilterFood = (category: string) => {
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
  return donuts.filter(
    (item: Donut) => item.category.toLowerCase() === category.toLowerCase()
  );
};

export const GetFoodById = (id: number) => {
  const [{ DonutItems }, dispatch] = useStateValue();
  return DonutItems?.find((item: Donut) => item.id === id);
};
