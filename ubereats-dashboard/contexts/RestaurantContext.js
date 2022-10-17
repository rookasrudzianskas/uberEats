// create Restaurant Context
import { createContext } from "react";

const RestaurantContext = createContext({});

const RestaurantContextProvider = ({ children }) => {
    return (
        <RestaurantContext.Provider>
            {children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantContext;
