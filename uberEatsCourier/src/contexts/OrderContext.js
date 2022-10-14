import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import {DataStore} from "aws-amplify";
import {Order, OrderDish, User} from "../models";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
    const { dbUser } = useAuthContext();
    const { dbCourier } = useAuthContext();
    const [order, setOrder] = useState(null);

    const fetchOrder = async (id) => {
        if(!id) {
            setOrder(null);
            return;
        };
        const fetchedOrder = await DataStore.query(Order, id);
        fetchedOrder.user = await DataStore.query(User, fetchedOrder.userID);
        fetchedOrder.dishes = await DataStore.query(OrderDish, (od) => od.orderID("eq", fetchedOrder.id));
        setOrder(fetchedOrder);
    }

    const acceptOrder = (order) => {
        // update the order, and change the status and assign the driver to the order
        DataStore.save(
            Order.copyOf(order, (updated) => {
                updated.status = "ACCEPTED"; // update to the ACCEPTED
                updated.Courier = dbCourier;
            })
        ).then(setActiveOrder);
    };

    return (
        <OrderContext.Provider value={{ acceptOrder, order, fetchOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
