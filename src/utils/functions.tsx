import { Donut, cartItem } from "../../types";
import {
  firebaseAddToCart,
  firebaseDeleteCartItem,
  firebaseDeleteFood,
  firebaseEmptyUserCart,
  firebaseFetchAllCartItems,
  firebaseFetchDonutItems,
  firebaseGetAllUsers,
  firebaseGetUser,
  firebaseLogout,
  firebaseUpdateCartItem,
  firebaseUpdateUser,
} from "../Firebase";

import { MdShoppingBasket } from "react-icons/md";
import { toast } from "react-toastify";

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
  await firebaseFetchDonutItems()
    .then((data) => {
      dispatch({
        type: "SET_FOOD_ITEMS",
        DonutItems: data,
      });
    })
    .then(() => {
      /**/
    })
    .catch((e) => {
      console.log(e);
    });
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
  DonutItems: Donut[],
  dispatch: any
) => {
  await firebaseDeleteFood(food.id);
  // remove food from DonutItems
  const foodIndex = DonutItems.indexOf(food);
  if (foodIndex !== -1) {
    DonutItems.splice(foodIndex, 1);
  }
  dispatch({
    type: "SET_FOOD_ITEMS",
    DonutItems,
  });
  toast.success("Food deleted successfully");
};

// Fulfilling order
export const fulfillOrder = {};

export const deleteOrder = {};
