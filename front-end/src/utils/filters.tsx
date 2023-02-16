import { useState } from "react";
import { FoodItem } from "../../types";
import { useStateValue } from "../context/StateProvider";

// Import mock data from static
import { data } from "../utils/fruitStatic";

export const FilterFood = (category: string) => {

  // const [data, changeData] = useState(data); further for changing dynamic data
  return data.filter(
    (item: FoodItem) => item.category.toLowerCase() === category.toLowerCase()
  );
};

export const GetFoodById = (id: number) => {
  const [{ foodItems }, dispatch] = useStateValue();
  return foodItems?.find((item: FoodItem) => item.id === id);
};
