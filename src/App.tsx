import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

import {
  About,
  Admin,
  Home,
  CustomerLogin,
  Employees,
  Menu,
  Profile,
  Services,
  Signup,
} from "./Pages";
import { Cart, Footer, Header, EmployeeHeader } from "./components";
import { Route, Routes } from "react-router-dom";
import {
  calculateCartTotal,
  dispatchUsers,
  fetchFoodData,
  fetchUserCartData,
  isAdmin,
} from "./utils/functions";

import { AnimatePresence } from "framer-motion";
import Contact from "./components/Contact";
import OrderStatus from "./components/OrderStatus";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useStateValue } from "./context/StateProvider";
import { ServerUrl } from "./consts";

function App() {
  const location = useLocation();
  const [
    { showCart, showContactForm, user, DonutItems, cartItems, adminMode, showOrder },
    dispatch,
  ] = useStateValue();

  console.log(`Server url: ${ServerUrl}`)

  fetch(`${ServerUrl}/api`)
    .then(response =>
      response.json()
        .then(json => console.log(json)))

  useEffect(() => {
    fetchFoodData(dispatch);
    dispatchUsers(dispatch);
    user && fetchUserCartData(user, dispatch);
  }, []);

  useEffect(() => {
    DonutItems &&
      cartItems.length > 0 &&
      calculateCartTotal(cartItems, DonutItems, dispatch);
  }, [cartItems, DonutItems, dispatch]);

  const renderHeader = () => {
    if (location.pathname.startsWith("/employee")) {
      return <EmployeeHeader />;
    } else {
      return <Header />;
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <ToastContainer />
      <div className="w-screen h-auto min-h-[100vh] flex flex-col bg-primary">
        {showCart && <Cart />}
        {showContactForm && <Contact />}
        {showOrder && <OrderStatus />}
        {!(adminMode && isAdmin(user)) && renderHeader()}
        <main
          className={`${
            !(adminMode && isAdmin(user)) &&
            "mt-16 md:mt-16 px-3 md:px-8 md:py-6 py-4"
          } w-full h-auto`}
          onClick={() => {/**/}}
        >
          {/* Routes */}
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/employee-login" element={<Employees />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/services" element={<Services />} />
          </Routes>

          {!(adminMode && isAdmin(user))}
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
