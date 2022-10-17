// create Restaurant Context
import {createContext, useState, useEffect} from "react";
import {Auth, DataStore} from "aws-amplify";
import {Order, Restaurant} from "../src/models";

const RestaurantContext = createContext({});

const RestaurantContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const sub = user?.attributes?.sub;

    useEffect(() => {
        Auth.currentAuthenticatedUser({bypassCache: true}).then(user => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        // fetch restaurant and filter by sub
    }, [sub]);


    const fetchRestaurants = async () => {
        const restaurants = await DataStore.query(Restaurant, (r) => r.adminSub("eq", sub)).then((restaurants) => console.log(restaurants));

        setRestaurant(restaurants);
    }

    useEffect(() => {
        if(!sub) return;
        fetchRestaurants();
        const subscription = DataStore.observe(Restaurant).subscribe(() => fetchRestaurants());
        return () => subscription.unsubscribe();
    }, [sub]);

    // console.log("restaurant", restaurant);

    return (
        <RestaurantContext.Provider value={{

        }}>
            {children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantContextProvider;
