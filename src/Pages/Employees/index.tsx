import { useEffect, useState } from "react";
import { useStateValue } from "../../context/StateProvider";

import {orderData} from "../../utils/fetchOrdersData";
import {OrderDisplay} from "../../components/Order/index";
import { isAdmin } from "../../utils/functions";
import type { Order } from "../../../types";

const Employees = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className= "w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
      {orderData &&
        orderData.map((order: Order) => (
          <OrderDisplay
            order={order}
            col
            admin={isAdmin(user)}
          />
        ))}
    </div>
  );
}

export default Employees;
