import { useState } from "react";
import type { Order } from "../../../types";
import { fulfillOrder } from "../../utils/functions";
import { motion } from "framer-motion";

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

  const handleFulfillOrder = () => {
    setIsFulfilled(true);
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
        <p>Order #{order._id}</p>
        <table>
          <thead className = "flex items-end">
            <th>Items</th>
          </thead>
          <tbody>
            {order.donuts &&
              order.donuts.map((donut) => (
                <tr>
                  <td>{donut.title}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
        >
          {isFulfilled ? 
            <p>Fulfilled</p> :
            <button
                className={`flex items-end gap-2 justify-center bg-green-200 padding p-2 p-2`}
                onClick={handleFulfillOrder}
                disabled={isFulfilled}
            >
            Load to Drone {order.drone}
            </button> 
            }
        </motion.div>
      </div>
    </motion.div>
  );
};
