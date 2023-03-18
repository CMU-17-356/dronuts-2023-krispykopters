import { useEffect, useState } from "react";
import { useStateValue } from "../../context/StateProvider";

import { orderData } from "../../utils/fetchOrdersData";
import { OrderDisplay } from "../../components/Order/index";
import { donutData } from "../../utils/fetchDonutData";
import { ManageMenuDisplay } from "../../components/ManageMenu/index";
import { isAdmin } from "../../utils/functions";
import type { Donut, Order } from "../../../types";

import * as L from "leaflet";

import { Drone } from "../../components/Assets";

// Drone location Information
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Employees = () => {
  // Order Information
  const [{ user }, dispatch] = useStateValue();

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

  // Customized Drone Icon
  const DroneIcon = L.icon({
    iconUrl: Drone,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [15, 27],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    // ...
  });

  // Drone Locations
  // const position: LatLngExpression | undefined = [51.505, -0.09];

  return (
    <div className="order-location-content">
      <div className="w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
        {orderData &&
          orderData.map((order: Order) => (
            <OrderDisplay order={order} col admin={isAdmin(user)} />
          ))}
      </div>
      <div className="w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
        {donutData &&
          donutData.map((donut: Donut) => (
            <ManageMenuDisplay donut={donut} col admin={isAdmin(user)} />
          ))}
      </div>
      <MapContainer
        center={[40.442329, -79.944068]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100wh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[40.442329, -79.943868]} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[40.401329, -79.944768]} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[40.420329, -79.944568]} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      ,
    </div>
  );
};
export default Employees;
