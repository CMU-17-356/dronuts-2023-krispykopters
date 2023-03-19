import {
  fetchSessionUser,
  fetchSessionUserMode,
} from "../utils/fetchSessionData";

const sessionUser = fetchSessionUser();
const sessionUserMode = fetchSessionUserMode();
export const initialState = {
  user: sessionUser,
  DonutItems: null,
  showCart: false,
  showDonutForm: false,
  donutToEdit: null,
  showContactForm: false,
  showOrder: false,
  cartItems: [],
  cartTotal: 0,
  adminMode: sessionUserMode,
  users: [],
  paymentMethod: "mobile_money",
  checkoutData: {},
};
