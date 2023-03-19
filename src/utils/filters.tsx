import { useState } from "react";
import { Donut } from "../../types";
import { useStateValue } from "../context/StateProvider";

// Import mock data from static
import { data } from "./fetchMockDonutsData";

export const FilterFood = (category: string) => {
  // const [data, changeData] = useState(data); further for changing dynamic data
  return data.filter(
    (item: Donut) => item.category.toLowerCase() === category.toLowerCase()
  );
};

export const GetFoodById = (id: number) => {
  const [{ DonutItems }, dispatch] = useStateValue();
  return DonutItems?.find((item: Donut) => item.id === id);
};
