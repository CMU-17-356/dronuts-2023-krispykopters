import { useStateValue } from "../../context/StateProvider";
import { Title } from "../../components/ManageMenu/index";
import type { Drone, Order } from "../../../types";
import * as L from "leaflet";

// Drone location Information
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Container from "../../components/Container";
import { useState } from "react";

const CustomerOrders = () => {
  //Order Information
  const [{OrderItems, DroneItems}, dispatch] = useStateValue();
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
            .filter((order: Order) => order.customer.username === "TrueLordOfTheRing")
            .map((order: Order) =>
            (<section className="w-full my-5">
              <p className="text-textColor font-bold text-xl">Order #{order._id.slice(-4)}</p>
              { order.status === "Placed" && 
                (<p className="text-textColor font-semi-bold text-xl">Preparing your order - ETA 10 min</p>)
              }
              { order.status === "OutForDelivery" && 
                (<p className="text-textColor font-semi-bold text-xl">Donuts being delivered- ETA 5 min</p>)
              }
              <Container
                className="bg-containerbg"
                scrollOffset={scrollValue}
                items={order.donuts}
                admin={false}
                showQuantity={true}
              />
              <p className="text-textColor font-bold text-xl">Order Location</p>
              <MapContainer
                center={[40.44394444, -79.94444444]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: "50vh", width: "50wh", zIndex: 1 }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {DroneItems &&
                  DroneItems
                    .filter((drone: Drone) => drone.id.toString() === order.drone)
                    .map((drone: Drone) => (
                      <Marker position={[drone.lat, drone.lng]} icon={myIcon}>
                        <Popup>
                          Drone {drone.id} - {drone.name}
                        </Popup>
                      </Marker>
                    ))
                }

              </MapContainer>

            </section>

            ))}
        {(!OrderItems || OrderItems.length === 0 ||
          OrderItems.filter((order: Order) => order.customer.username === "TrueLordOfTheRing").length === 0)
          && (
            <strong>You currently have no new orders. Maybe you can change that?</strong>
          )}
      </div>
    </div>
  );
};
export default CustomerOrders;
