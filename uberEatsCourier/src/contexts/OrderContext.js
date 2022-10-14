import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import {DataStore} from "aws-amplify";
import {Order} from "../models";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
    const { dbUser } = useAuthContext();
    const { dbCourier } = useAuthContext();
    const [activeOrder, setActiveOrder] = useState(null);

    const acceptOrder = (order) => {
        // update the order, and change the status and assign the driver to the order
        DataStore.save(
            Order.copyOf(order, (updated) => {
                updated.status = "COOKING"; // update to the ACCEPTED
                updated.Courier = dbCourier;
            })
        ).then(setActiveOrder);
    }

    return (
        <OrderContext.Provider value={{ acceptOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
