import { useStateValue } from "../../context/StateProvider";

import { OrderDisplay } from "../../components/Order/index";
import { ManageMenuDisplay, Title } from "../../components/ManageMenu/index";
import { isAdmin } from "../../utils/functions";
import type { Drone, Order } from "../../../types";

import * as L from "leaflet";

// Drone location Information
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Employees = () => {

  // Order Information
  const [{ user, DonutItems, OrderItems, DroneItems }, dispatch] = useStateValue();

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
    <div className="order-location-content">
      <Title title="Current Orders" />
      <div className="w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
        {OrderItems &&
          OrderItems
            .map((order: Order) => (
              <OrderDisplay order={order} col admin={isAdmin(user)} />
          ))}
      </div>
      <div className="w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
        <ManageMenuDisplay donuts={DonutItems} />
      </div>
      <Title title="Drone Locations" />
      <div>
        {/* For spacing */}
        <p>""</p>
      </div>
      <MapContainer
        center={[40.44394444, -79.94444444]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100wh", zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {DroneItems &&
          DroneItems
            .map((drone: Drone) => (
              <Marker position={[drone.lat, drone.lng]} icon={myIcon}>
                <Popup>
                  Drone {drone.id} - {drone.name}
                </Popup>
              </Marker>
          ))}
      </MapContainer>
      ,
    </div>
  );
};
export default Employees;
