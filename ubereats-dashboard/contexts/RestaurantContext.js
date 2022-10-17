// create Restaurant Context
import {createContext, useState, useEffect} from "react";
import {Auth} from "aws-amplify";

const RestaurantContext = createContext({});

const RestaurantContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        Auth.currentAuthenticatedUser({bypassCache: true}).then(user => {
            setUser(user);
        });
    }, []);

    return (
        <RestaurantContext.Provider value={{

        }}>
            {children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantContextProvider;
