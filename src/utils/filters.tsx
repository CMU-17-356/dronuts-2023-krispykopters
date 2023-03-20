import { useState } from "react";
import { Donut } from "../../types";
import { useStateValue } from "../context/StateProvider";

export const FilterFood = (donuts: Donut[], category: string) => {
  return donuts.filter(
    (item: Donut) => item.category.toLowerCase() === category.toLowerCase()
  );
};

export const GetFoodById = (id: number) => {
  const [{ DonutItems }, dispatch] = useStateValue();
  return DonutItems?.find((item: Donut) => item.id === id);
};
