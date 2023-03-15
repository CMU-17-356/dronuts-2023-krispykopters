import {
  GiFruitTree,
  GiChickenOven,
  GiBeerBottle,
  GiBowlOfRice,
} from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import { FaFish } from "react-icons/fa";

export const Categories = [
  {
    id: 1,
    name: "Yeast",
    urlParam: "chicken",
    icon: <GiChickenOven />,
  },
  {
    id: 2,
    name: "Cake",
    urlParam: "fruits",
    icon: <GiFruitTree />,
  },
  {
    id: 3,
    name: "Jelly",
    urlParam: "drinks",
    icon: <GiBeerBottle />,
  },
  {
    id: 4,
    name: "Cider ",
    urlParam: "desserts",
  },
  {
    id: 5,
    name: "Old",
    urlParam: "icecreams",
    icon: <MdOutlineIcecream />,
  },
  {
    id: 6,
    name: "Hole",
    urlParam: "fish",
    icon: <FaFish />,
  },
];
