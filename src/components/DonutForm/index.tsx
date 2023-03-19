import DonutFormBody from "./Body";
import { motion } from "framer-motion";
import Header from "./Header";
import { useStateValue } from "../../context/StateProvider";

const DonutForm = () => {
  const [{donutInfo, newDonut}, dispatch] = useStateValue();
  return (

    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={`w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0`}
    >
      <Header newDonut={newDonut} />
      <DonutFormBody donut={donutInfo} newDonut={newDonut} />
    </motion.div>
  );
};

export default DonutForm;
