import { MdOutlineClose } from "react-icons/md";
import { motion } from "framer-motion";
import { hideDonutForm } from "../../utils/functions";
import { useStateValue } from "../../context/StateProvider";
import { Donut } from "../../../types";

const Header = ({
  newDonut
}: {
  newDonut: boolean;
}) => {
  const [{}, dispatch] = useStateValue();
  return (
    <div className="w-full flex items-center bg-white justify-between p-4 cursor-pointer">
      <motion.div whileTap={{ scale: 0.8 }} onClick={() => hideDonutForm(dispatch)}>
        <MdOutlineClose className="text-textColor text-2xl " />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
      >
        {newDonut ? (<p>New Donut</p>) : (<p>Edit Donut</p>)}
      </motion.div>
      <motion.div
        whileTap={{scale:0.9}}
        className="flex items-center justify-center gap-1"
      >
      </motion.div>
    </div>
  );
};

export default Header;
