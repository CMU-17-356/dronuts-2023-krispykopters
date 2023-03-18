import { donut1, donut2, donut3 } from "../components/Assets";
import { Donut } from "../../types";

export const donutsData = [
  // Here's are where the image comes.
  {
    id: 2,
    _id: "donut2",
    title: "Choco Sprinkles",
    description: "Chocolate Donut with Sprinkles",
    price: 7.25,
    calories: 0.1,
    qty: 30,
    category: "normal",
    imageURL: donut1,
  },
  {
    id: 3,
    _id: "donut3",
    title: "Little Rainbow",
    description: "Donut with Sprinkles",
    price: 15.65,
    calories: 0.2,
    qty: 20,
    category: "normal",
    imageURL: donut2,
  },
  {
    id: 4,
    _id: "donut4",
    title: "Classic",
    description: "Glazed Donut",
    price: 10.25,
    calories: 0.3,
    qty: 10,
    category: "normal",
    imageURL: donut3,
  }
];

export const Donuts = () => {
  return donutsData.filter(
    (item: Donut) => item.title !== ""
  );
}