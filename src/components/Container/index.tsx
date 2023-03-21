import { useLayoutEffect, useRef } from "react";

import { Donut } from "../../../types";
import Loader from "../Loader";
import { SingleFoodItem } from "../Donut";
import { motion } from "framer-motion";
import NotFound from "../NotFound";
import { isAdmin } from "../../utils/functions";
import { useStateValue } from "../../context/StateProvider";

const Container = ({
  scrollOffset,
  col,
  items,
  className,
  admin,
  showQuantity,
}: {
  scrollOffset: number;
  col?: boolean;
  items: Donut[];
  className?: string;
  admin?: boolean;
  showQuantity?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (null !== containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  }, [scrollOffset]);
  const [{ user }, dispatch] = useStateValue();
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={`${className} w-full my-12 flex items-center ${
        (!items || col) && "justify-center"
      }   min-h-[200px] gap-4  px-2 ${
        !col
          ? "overflow-x-scroll scrollbar-hidden scroll-smooth"
          : "overflow-x-hidden flex-wrap"
      }`}
    >
      {items &&
        items.map((item: Donut) => (
          <SingleFoodItem
            key={item.id}
            item={item}
            col={col}
            admin={admin}
            showQuantity={showQuantity}
          />
        ))}
      {!items &&
        (!col ? (
          <Loader progress={"Fetching Food Items....."} />
        ) : (
          <NotFound text="Fetching Food Items..." />
        ))}
      {items && items.length <= 0 && (
        <NotFound text="No Food Items Available " />
      )}
      {admin && (<SingleFoodItem
        key="-1"
        item={{
          id: -1,
          _id: "",
          title: "New Donut",
          description: "",
          price: 0,
          calories: "0",
          qty: 0,
          category: "normal",
          imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png",
        }}
        col={col}
        admin={admin}
      />)}
    </motion.div>
  );
};

export default Container;
