import { useState } from "react";
import type { Donut } from "../../../types";
import { motion } from "framer-motion";



export const ManageMenuDisplay = ({
  donut,
  col,
  admin,
}: {
  donut: Donut;
  col?: boolean;
  admin?: boolean;
}) => {

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
        <p>{donut.title}</p>
        <table>
          <thead className = "flex items-end">
            <th>Items</th>
          </thead>
          <tbody>
          </tbody>
        </table>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
        >
        </motion.div>
      </div>
    </motion.div>
  );
};
