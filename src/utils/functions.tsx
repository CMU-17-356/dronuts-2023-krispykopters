import { Donut, cartItem, Order, Drone } from "../../types";
import {
  firebaseAddToCart,
  firebaseDeleteCartItem,
  firebaseEmptyUserCart,
  firebaseFetchAllCartItems,
  firebaseGetAllUsers,
  firebaseGetUser,
  firebaseLogout,
  firebaseUpdateCartItem,
  firebaseUpdateUser,
} from "../Firebase";

import { MdShoppingBasket } from "react-icons/md";
import { toast } from "react-toastify";
import { ServerUrl } from "../consts";
import {IOrder} from "../../server/db/order";
import {Types} from "mongoose";
import {Customer, ICustomer} from "../../server/db/customer";

export const addToCart = async (
  cartItems: cartItem[],
  DonutItems: Donut[],
  user: any,
  fid: number,
  dispatch: any
) => {
  // The original regulates that we need to login to cartItems.
  // if (!user) {
  //   toast.error("Please login to add items to cart", {
  //     icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
  //     toastId: "unauthorizedAddToCart",
  //   });
  // } else {
  if (cartItems.some((item: cartItem) => item["fid"] === fid)) {
    toast.error("Item already in cart", {
      icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
      toastId: "itemAlreadyInCart",
    });
  } else {
    const data: cartItem = {
      id: Date.now(),
      fid: fid,
      uid: "123123", // here should used to be user.uuid (I mocked it here)...
      qty: 1,
    };
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: [...cartItems, data],
    });
    calculateCartTotal(cartItems, DonutItems, dispatch);
    await firebaseAddToCart(data);
  }
  // }
};
export const dispatchtUserCartItems = (
  uid: string,
  items: cartItem[],
  dispatch: any
) => {
  const cartItems = items.filter((item: cartItem) => item.uid === uid);
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });

  return cartItems;
};

export const fetchUserCartData = async (user: any, dispatch: any) => {
  if (user) {
    await firebaseFetchAllCartItems()
      .then((data) => {
        const userCart = dispatchtUserCartItems(user.uid, data, dispatch);
        localStorage.setItem("cartItems", JSON.stringify(userCart));
      })
      .then(() => {
        /**/
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    localStorage.setItem("cartItems", "undefined");
  }
};

// fetch the data for the food
export const fetchFoodData = async (dispatch: any) => {
  const response = await fetch(`${ServerUrl}/api/store/admin`);
  const storeJson = await response.json();
  dispatch({
    type: "SET_FOOD_ITEMS",
    DonutItems: storeJson["donutStock"],
  });
};

export const fetchDroneData = async (dispatch: any) => {
  const drones: Drone[] = [];

  for (let i = 205; i < 209; i++) {
    const response = await fetch(`https://356-drone-api.fly.dev/api/drones/${i}`);
    const droneJson = await response.json();
    drones.push({
      id: droneJson.id,
      name: droneJson.drone_name,
      lat: droneJson.location.lat,
      lng: droneJson.location.lng,
    });
  }

  console.log("Drones: ", drones);

  dispatch({
    type: "SET_DRONE_ITEMS",
    DroneItems: drones,
  });
};

// fetch the data for order
export const fetchOrderData = async (dispatch: any) => {
  const response = await fetch(`${ServerUrl}/api/orders`);
  const ordersJson = await response.json();
  dispatch({
    type: "SET_ORDER_ITEMS",
    OrderItems: ordersJson,
  });
};

// fulfill the order
export const fulfillOrder = async (
  dispatch: any,
  order: Order,
  ) => {
    console.log('Fulfilling order', order);

    const putResponse = await fetch(`https://356-drone-api.fly.dev/api/drones/${order.drone}/send`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `lat=${order.location.lat}&lon=${order.location.long}`,
    });

    order.status = "OutForDelivery"

    if (putResponse.ok) {

      await fetch(`${ServerUrl}/api/order/${order._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      toast.success("Order fulfilled successfully");
      fetchOrderData(dispatch);
    } else {
      toast.error(`Adding donut failed: ${putResponse.status} - ${await putResponse.text()}`)
    }
};

// get the specific food by Id
export const getFoodyById = (menu: Donut[], fid: number) => {
  return menu.find((item: Donut) => item.id === fid);
};

//  Update cart item State
export const updateCartItemState = async (
  cartItems: cartItem[],
  item: cartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index] = item;
  }
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });
  await firebaseUpdateCartItem(item)
    .then(() => {
      /**/
    })
    .catch((e) => {
      console.log(e);
    });
};

// Update Cart Item Quantity (for example, adding or decreasing cart food qty)
export const updateCartItemQty = async (
  cartItems: cartItem[],
  DonutItems: Donut[],
  item: cartItem,
  dispatch: any,
  val: number
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index].qty += val;
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, DonutItems, dispatch);
    await firebaseUpdateCartItem(cartItems[index])
      .then(() => {
        /**/
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

//  Delete specific items from the cart.
export const deleteCartItem = async (
  cartItems: cartItem[],
  DonutItems: Donut[],
  item: cartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems.splice(index, 1);
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, DonutItems, dispatch);
    await firebaseDeleteCartItem(item)
      .then(() => {
        /**/
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

// Calculate Total Price Round to 2 decimal places
export const calculateCartTotal = (
  cartItems: cartItem[],
  DonutItems: Donut[],
  dispatch: any
) => {
  let total = 0;
  cartItems.forEach((item: cartItem) => {
    const foodItem = getFoodyById(DonutItems, item.fid);
    total += item.qty * (foodItem?.price || 0);
  });
  dispatch({
    type: "SET_CART_TOTAL",
    // Round to 2 decimal places.
    cartTotal: total.toFixed(2),
  });
};

// Empty Cart
export const emptyCart = async (
  cartItems: cartItem[],
  DonutItems: Donut[],
  dispatch: any
) => {
  if (cartItems.length > 0) {
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: [],
    });
    calculateCartTotal(cartItems, DonutItems, dispatch);
    await firebaseEmptyUserCart(cartItems)
      .then(() => {
        /**/
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    toast.warn("Cart is already empty");
  }
};

// Hide Cart
export const hideCart = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CART",
    showCart: !true,
  });
};

// Hide Order
export const hideOrder = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_ORDER",
    showOrder: !true,
  });
};

// Hide Cart
export const hideContactForm = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CONTACT_FORM",
    showContactForm: !true,
  });
};

// Hide Donut Form
export const hideDonutForm = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_DONUT_FORM",
    showDonutForm: false,
  });
};

export const shuffleItems = (items: any) => {
  let currentIndex = items.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [items[currentIndex], items[randomIndex]] = [
      items[randomIndex],
      items[currentIndex],
    ];
  }

  return items;
};

export const logout = async (user: any, dispatch: any, navigate: any) => {
  if (user) {
    await firebaseLogout()
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "SET_CARTITEMS",
          cartItems: [],
        });
        // turn off adminMode
        dispatch({
          type: "SET_ADMIN_MODE",
          adminMode: false,
        });

        localStorage.setItem("user", "undefined");
        localStorage.setItem("adminMode", "undefined");
        localStorage.removeItem("cartItems");
        navigate("/");
      })
      .catch((e: any) => {
        console.log(e);
      });
  } else {
    console.log("You are not logged in");
  }
};

export const ToggleAdminMode = (dispatch: any, state: boolean) => {
  dispatch({
    type: "SET_ADMIN_MODE",
    adminMode: state,
  });
  localStorage.setItem("adminMode", JSON.stringify(state));
  console.log(state);
};

export const isAdmin = (user: any) => {
  const isAdmin =
    user?.email == "bentilshadrack72@gmail.com" ||
    user?.email == "admin@test.com";
  return isAdmin;
};

// get user
export const getUserData = async (user: any) => {
  return await firebaseGetUser(user.uid);
};

// update currentUser
export const updateUserData = async (
  user: any,
  dispatch: any,
  alert: boolean
) => {
  await firebaseUpdateUser(user)
    .then(() => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    })
    .catch((e: any) => {
      console.log(e);
    })
    .then(() => {
      localStorage.setItem("user", JSON.stringify(user));
      alert && toast.success("User data updated successfully");
    });
};

// get all users
export const dispatchUsers = async (dispatch: any) => {
  await firebaseGetAllUsers()
    .then((users: any) => {
      dispatch({
        type: "SET_USERS",
        users: users,
      });
    })
    .catch((e: any) => {
      console.log(e);
    });
};
export const getAllUser = async () => {
  await firebaseGetAllUsers()
    .then((users: any) => {
      return users;
    })
    .catch((e: any) => {
      console.log(e);
    });
};

// delete food
export const deleteFood = async (
  food: Donut,
  dispatch: any
) => {
  console.log(`Deleting food ${food}`);

  const response = await fetch(`${ServerUrl}/api/store/admin/donut/${food._id}`, { method: 'DELETE'});

  if (response.ok) {
    toast.success("Donut deleted successfully");
    fetchFoodData(dispatch);
  }
  else {
    toast.error(`Deleting donut failed: ${response.status} - ${await response.text()}`)
  }
};

// edit food
export const editFood = async (
  food: Donut,
  dispatch: any
) => {
  hideDonutForm(dispatch);

  console.log(`Editing food ${food}`);

  const response = await fetch(`${ServerUrl}/api/store/admin/donut`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(food)});

  if (response.ok) {
    toast.success("Donut edited successfully");
    fetchFoodData(dispatch);
  }
  else {
    toast.error(`Editing donut failed: ${response.status} - ${await response.text()}`)
  }
};


// create food
export const addFood = async (
  food: Donut,
  dispatch: any
) => {
  hideDonutForm(dispatch);

  console.log(`Adding food ${food}`);

  const response = await fetch(`${ServerUrl}/api/store/admin/donut`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(food)});

  if (response.ok) {
    toast.success("Donut added successfully");
    fetchFoodData(dispatch);
  }
  else {
    toast.error(`Adding donut failed: ${response.status} - ${await response.text()}`)
  }
};

// fetch the data for the food
export const fetchOrderData = async (dispatch: any) => {
  const response = await fetch(`${ServerUrl}/api/store/admin`);
  const storeJson = await response.json();
  dispatch({
    type: "SET_FOOD_ITEMS",
    DonutItems: storeJson["donutStock"],
  });
};


// create order
export const addOrder = async (
    cartItems: cartItem[],
    DonutItems: Donut[],
    checkoutData: any,
    dispatch: any
) => {

  // TODO: how to initialize
  let fids:[Types.ObjectId] = [];
  cartItems.forEach((item: cartItem) => {
    const foodItem = getFoodyById(DonutItems, item.fid);
    // const donutDoc = await new Customer(foodItem).save();
    // Donut.findOne({ fid: item.fid }).populate("donutStock");
    //TODO: how to convert to DonutDoc and insert the _id
    fids.push(new Types.ObjectId(foodItem?._id));
    // fids.push(new Types.ObjectId(donutDoc._id));
  });

  //TODO: how to convert to DonutDoc and insert the _id

  const order: IOrder = {
    customer: cartItem[0].uid,
    donuts: fids,
    location: checkoutData,
    status: "Placed",
    orderTime: new Date(Date.now()),
    drone: "1"
  };

  console.log(`Adding order ${order}`);

  const response = await fetch(`${ServerUrl}/api/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(order)});

  if (response.ok) {
    toast.success("Order added successfully");
    //TODO
    // fetchFoodData(dispatch);
  }
  else {
    toast.error(`Adding donut failed: ${response.status} - ${await response.text()}`)
  }
};

// Fulfilling order
export const fulfillOrder = {};

export const deleteOrder = {};
