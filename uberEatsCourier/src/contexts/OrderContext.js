import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
    const { dbUser } = useAuthContext();

    return (
        <OrderContext.Provider value={{ }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
