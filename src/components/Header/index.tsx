import { Avatar, Logo } from "../Assets";
import { Link } from "react-router-dom";

import DropDown from "./DropDown";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import CustomerLoginAction from "./CustomerLoginAction";
import EmployeeLoginAction from "./EmployeeLoginAction";
import MobileNav from "./mobile-nav";
import Navigations from "./Navigations";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useState } from "react";
import { useStateValue } from "../../context/StateProvider";

import { DroneDelivery } from "../Assets";

const Header = () => {
  //
  // const firebaseAuth = getAuth(app);
  const [{ user }] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);

  return (
    <header className="w-screen fixed z-50 bg-cardOverlay backdrop-blur-md md:p-3 md:px-4 lg:p-6 lg:px-16">
      {/* Tablet and Desktop */}
      <div className="hidden md:flex w-full justify-between itesm-center">
        <div className="flex items-center gap-2 justify-center">
          <Link to={"/"}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src={Logo}
                alt="Logo"
                className="md:w-6 lg:w-8 object-cover"
              />
              <p className="text-headingColor md:text-lg lg:text-xl font-bold">
                Krispy Kopters
              </p>
            </motion.div>
          </Link>
          <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
            <p className="text-base text-orange-500 font-bold">
              Drone Delivery
            </p>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl">
              <img
                src={DroneDelivery}
                alt="delivery"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* navigation */}
        <Navigations />

        {/* User */}

        {user ? (
          <div className={`group flex items-center gap-3 px-3 py-1 rounded-lg`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className=" flex items-center justify-center"
            >
              <img
                src={user.photoURL || Avatar}
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer object-contain"
                alt="profile"
              />
              <p className="text-headingColor cursor-pointer flex items-center justify-center gap-2">
                <RiArrowDropDownLine />
              </p>
            </motion.div>
            <DropDown user={user} />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <CustomerLoginAction text={"Customer Login"} />
            <EmployeeLoginAction text={"Employee Login"} />
          </div>
        )}
      </div>

      {/* Mobile */}
      <motion.div
        className="flex md:hidden w-full p-0 items-center justify-between"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
      >
        {isOpenMobileNav ? (
          <MobileNav isOpen={isOpenMobileNav} setIsOpen={setIsOpenMobileNav} />
        ) : (
          <div className="p-5 flex items-center justify-between w-full">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className=" flex items-center justify-center"
              onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
            >
              <HiOutlineMenuAlt2 className="text-headingColor text-4xl" />
            </motion.div>
            <Link to={"/"}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={Logo} alt="Logo" className="w-8 object-cover" />
                <p className="text-headingColor text-xl font-bold">
                  Krispy Kopters
                </p>
              </motion.div>
            </Link>
            {user ? (
              <div
                className={`flex items-center gap-3 px-3 py-1 rounded-lg relative`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="group flex items-center justify-center"
                >
                  <img
                    src={user?.photoURL ? user.photoURL : Avatar}
                    className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer"
                    alt="user-profile"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  <p className="text-headingColor cursor-pointer flex items-center justify-center gap-2">
                    <RiArrowDropDownLine />
                  </p>
                  {isOpen && <DropDown user={user} />}
                </motion.div>
              </div>
            ) : (
              <CustomerLoginAction mobile />
            )}
          </div>
        )}
      </motion.div>
    </header>
  );
};

export default Header;
