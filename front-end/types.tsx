// Actual food item description
export type Donut = {
  _id: string;               // Auto-generated by MongoDB
  id: number;                // Each Donut has a specific number, 1, 2, 3, 4, 5...
  title: string;             // name of the donut
  description?: string;      // Description of the Donut
  price: string;             // Price of the donut
  imageURL: string;          // Image source: static Imgae source
  calories: string;          // Calories / Or number
  qty: string;               // Available Quantity
  category: string;          // One of ['featured', 'normal', 'new'], where to exhibit
};

export type DonutItems = {   // Set of donuts
  items: Donut[];
};

// The types for the category
export type DonutCategory = {
  id: number;
  name: string;
  urlParam: string;
  icon?: JSX.Element;
};
export type DonutCategories = DonutCategory[];

// Types for the shopping cart
export type cartItem = {
  id: number;
  fid: number;
  uid: string;
  qty: number;
};

// types for the shopping cart items
export type cartItems = {
  items: cartItem[];
};

// The login user for this system
export type User = {
  uid: string;
  email?: string;
  displayName?: string;
  phoneNumber?: string;
  providerId: string;
  photoURL?: string;
};

/** Same regulation and task from backend schema */
export type Customer = {
  _id: string; // Auto-generated by MongoDB
  username: string; // UNIQUE, URL-SAFE
  password: string; // Salted, Hashed Password
  displayName: string; // String
};

export type Drone = {
  _id: string; // Auto-generated by MongoDB
  name: string; // UNIQUE, URL-SAFE
  battery: number; // Battery level 0.0 - 1.0
  location: Coord;  // Coordinates representing current map coordinates
  status: number; // Possible values:  idle(0), out_for_delivery(1), returning_to_store(2), recharging(3)
  order: string; // Reference to Order if out for delivery, else empty
  destination: string; // Reference to Store if returning to store, else empty
};

export type Order = {
  _id: string; // Auto-generated by MongoDB
  customer: Customer; // Reference to Customer
  // "donuts" : [Donut],     // List of donuts in order
  location: Coord; // Coordinates representing current map coordinates
  orderTime: Date; // Time of order
};

export type Store = {
  _id: string; // Auto-generated by MongoDB
  name: string; // UNIQUE, URL-SAFE
  password: string; // Salted, Hashed Password
  location: Coord;  // Coordinates representing current map coordinates
  droneCapacity: number; // Number of drones that can be hosted at this location
  donutStock : [Donut] ,    // List of donuts in stock
  bankAccount: string; // Metadata for receiving payments from customers, format depends on third party API
};

export type Coord = {
  lat: number,
  long: number,
}
