import type { Order } from "../../../types";
import { fulfillOrder } from "../../utils/functions";

export const OrderDisplay = ({
    order,
    col,
    admin,
  }: {
    order: Order;
    col?: boolean;
    admin?: boolean;
  }) => {
    return (
        <div>
            <p>Order #{order._id}</p>
            <table>
                <thead>
                    <th>Item</th>
                    < th>Qty</th>
                </thead>
                <tbody>
                    {order.donuts && order.donuts.map(donut =>
                        <tr>
                            <td>{donut.title}</td>
                            <td>{donut.qty}</td>
                        </tr>
                    )};
                </tbody>
            </table>
            <button onClick={()=>fulfillOrder}> Complete</button>
        </div>
    );
    
};
    