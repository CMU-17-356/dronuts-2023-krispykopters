import { useStateValue } from "../../context/StateProvider";

import { OrderDisplay } from "../../components/Order/index";
import { ManageMenuDisplay, Title } from "../../components/ManageMenu/index";
import { isAdmin } from "../../utils/functions";
import type { Drone, Order } from "../../../types";

import * as L from "leaflet";

// Drone location Information
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CustomerOrders = () => {

  return(
    <div className="customer-order-content">
      <p>You currently have no new orders. Maybe you can change that?</p>
    </div>
  );
};
export default CustomerOrders;
