export const actionTypes = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  TOGGLE_CART: "TOGGLE_CART",
  TOGGLE_DONUT_FORM: "TOGGLE_DONUT_FORM",
  SET_CARTITEMS: "SET_CARTITEMS",
  SET_CART_TOTAL: "SET_CART_TOTAL",
  SET_ADMIN_MODE: "SET_ADMIN_MODE",
  SET_USERS: "SET_USERS",
  UPDATE_USER: "UPDATE_USER",
  SET_PAYMENT_METHOD: "SET_PAYMENT_METHOD",
  UPDATE_CHECKOUT_DATA: "UPDATE_CHECKOUT_DATA",
  TOGGLE_CONTACT_FORM: "TOGGLE_CONTACT_FORM",
  TOGGLE_ORDER: "TOGGLE_ORDER",
};

const reducer = (state, action) => {
  // console.log(action)
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_FOOD_ITEMS:
      return {
        ...state,
        DonutItems: action.DonutItems,
      };
    case actionTypes.TOGGLE_CART:
      return {
        ...state,
        showCart: action.showCart,
      };
    case actionTypes.TOGGLE_DONUT_FORM:
      return {
        ...state,
        showDonutForm: action.showDonutForm,
      };
    case actionTypes.SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    case actionTypes.SET_CART_TOTAL:
      return {
        ...state,
        cartTotal: action.cartTotal,
      };
    case actionTypes.SET_ADMIN_MODE:
      return {
        ...state,
        adminMode: action.adminMode,
      };
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.paymentMethod,
      };
    case actionTypes.UPDATE_CHECKOUT_DATA:
      return {
        ...state,
        checkoutData: action.checkoutData,
      };
    case actionTypes.TOGGLE_CONTACT_FORM:
      return {
        ...state,
        showContactForm: action.showContactForm,
      };
    case actionTypes.TOGGLE_ORDER:
      return {
        ...state,
        showOrder: action.showOrder,
      };
    default:
      return state;
  }
};

export default reducer;
