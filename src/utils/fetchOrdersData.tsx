import { customer1, customer2 } from "./customersData";
import {data} from "./fetchDronesData"
export const orderData = [
    {
        _id: "1",
        customer: customer1,
        donuts: [data[1], data[2]],
        location: {lat: 0, long: 0},
        orderTime: new Date("1/1/2023"),
        drone: 1
    },
    {
        _id: "2",
        customer: customer2,
        donuts: [data[3]],
        location: {lat: 41, long: 41},
        orderTime: new Date("1/2/2023"),
        drone: 2,
    },
    {
        _id: "3",
        customer: customer1,
        donuts: [data[1], data[1], data[2]],
        location: {lat: 2, long: 3},
        orderTime: new Date("1/2/2023"),
        drone: 3
    }
];