import { useStateValue } from "../../context/StateProvider";

import { OrderDisplay } from "../../components/Order/index";
import { ManageMenuDisplay, Title } from "../../components/ManageMenu/index";
import { isAdmin } from "../../utils/functions";
import type { Drone, Order } from "../../../types";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { motion } from "framer-motion";
import * as L from "leaflet";

// Drone location Information
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Container from "../../components/Container";
import { useState } from "react";

export const PrevNext = ({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <motion.div whileTap={{ scale: 1.1 }} onClick={onPrev} className="w-8 h-8 rounded-lg bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-all duration-100 ease-in-out hover:shadow-lg">
        <MdChevronLeft className="text-lg text-white" />
      </motion.div>
      <motion.div whileTap={{ scale: 1.1 }} onClick={onNext} className="w-8 h-8 rounded-lg bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-all duration-100 ease-in-out hover:shadow-lg">
        <MdChevronRight className="text-lg text-white" />
      </motion.div>
    </div>
  );
};

const CustomerOrders = () => {
  //Order Information
  const [{ user, DonutItems, OrderItems, DroneItems }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  // Customized Colored Icon
  const myIcon = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [15, 27],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [30, 30],
    // ...
  });



  return (

    <div className="customer-order-content">
      <Title title="My Orders" />
      <div className="w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
        {OrderItems &&
          OrderItems
            .map((order: Order) =>
            (<section className="w-full my-5">
              <p>Order #{order._id.slice(-4)}</p>
              <Container
                className="bg-containerbg"
                scrollOffset={scrollValue}
                items={order.donuts}
                admin={false}
                showQuantity = {true}
              />
            </section>
            ))}
        {(!OrderItems || OrderItems.length == 0) && (
          <p>You currently have no new orders. Maybe you can change that?</p>
        )}
      </div>
    </div>
  );
};
export default CustomerOrders;
