import { useState, useEffect } from "react";
import type { Order } from "../../../types";
import { fulfillOrder } from "../../utils/functions";
import { motion } from "framer-motion";
import { Donut } from "../../../types";
import { ServerUrl } from "../../consts";
import { toast } from "react-toastify";
import { useStateValue } from "../../context/StateProvider";

export const OrderDisplay = ({
  order,
  col,
  admin,
}: {
  order: Order;
  col?: boolean;
  admin?: boolean;
}) => {
  const [isFulfilled, setIsFulfilled] = useState(false);
  const [{orderInfo}, dispatch] = useStateValue();
  const [donutsOrdered, setDonutsOrdered] = useState<Donut[]>([]);

  const { _id, donuts: donutIds, drone, status } = order;
  const abrevId = _id.slice(-3);

  useEffect(() => {
    const fetchDonuts = async () => {
      const donuts: Donut[] = [];

      for (const donutId of donutIds) {
        const response = await fetch(`${ServerUrl}/api/donut/${donutId}`);
        const data = await response.json();
        donuts.push(data);
      }

      setDonutsOrdered(donuts);
    };

    fetchDonuts();
  }, [donutIds]);

  const handleFulfillOrder = async (order: Order) => {
    setIsFulfilled(true);
    console.log("order", order);
    fulfillOrder(dispatch, _id, false);
  };

  return (
    <motion.div
      whileTap={{ rotate: [0, -1, 1, -1, 0] }}
      className={`${
        !col ? "w-[275px] min-w-[275px]" : "w-[320px] min-w-[320px]"
      } md:w-[300px] md:min-w-[300px] ${
        col ? "my-12" : "my-2 md:my-5"
      } h-auto bg-cardOverlay rounded-lg p-2 px-3 backdrop-blur-lg hover:drop-shadow-sm cursor-pointer`}
    >
      <div>
        <p>Order #{abrevId}</p>
        <table>
          <thead className="flex items-end">
            <th>Items</th>
          </thead>
          <tbody>
            {donutsOrdered &&
              donutsOrdered.map((item) => (
                <tr>
                  <td>{item.title}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.1 }}>
          {isFulfilled ? (
            <p>Fulfilled</p>
          ) : (
            <button
              className={`flex items-end gap-2 justify-center bg-green-200 padding p-2 p-2`}
              onClick={() => handleFulfillOrder(order)}
              disabled={isFulfilled}
            >
              Load to Drone {drone}
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
