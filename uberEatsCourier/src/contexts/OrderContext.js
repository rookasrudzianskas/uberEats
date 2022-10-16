import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import {DataStore} from "aws-amplify";
import {Order, OrderDish, User} from "../models";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
    const { dbUser } = useAuthContext();
    const { dbCourier } = useAuthContext();
    const [order, setOrder] = useState(null);
    const [user, setUser] = useState(null);
    const [dishes, setDishes] = useState([]);

    const fetchOrder = async (id) => {
        if(!id) {
            setOrder(null);
            return;
        };
        const fetchedOrder = await DataStore.query(Order, id);
        setOrder(fetchedOrder);
        DataStore.query(User, fetchedOrder.userID).then(setUser);
        DataStore.query(OrderDish, (od) => od.orderID("eq", fetchedOrder.id)).then(setDishes);
        setOrder(fetchedOrder);
    }

    const acceptOrder = () => {
        // update the order, and change the status and assign the driver to the order
        DataStore.save(
            Order.copyOf(order, (updated) => {
                updated.status = "ACCEPTED"; // update to the ACCEPTED
                updated.Courier = dbCourier;
            })
        ).then(setOrder);
    };

    const pickUpOrder = () => {
        DataStore.save(
            Order.copyOf(order, (updated) => {
                updated.status = "PICKED_UP"; // update to the COMPLETE
            })
        ).then(setOrder);
    };

    const completeOrder = async () => {
        const updatedOrder = await DataStore.save(
            Order.copyOf(order, (updated) => {
                updated.status = "COMPLETED";
                updated.Courier = dbCourier;
            })
        )
        setOrder(updatedOrder);
    };

    return (
        <OrderContext.Provider value={{ acceptOrder, order, user, dishes, fetchOrder, pickUpOrder, completeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
