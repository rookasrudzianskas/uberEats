// create Basket context
import {createContext, useContext, useEffect, useState} from 'react';
import {useAuthContext} from "./AuthContext";
import {DataStore} from "aws-amplify";
import {Basket, BasketDish} from "../models";

const BasketContext = createContext();

const BasketContextProvider = ({ children }) => {
    const {dbUser} = useAuthContext();
    const [restaurant, setRestaurant] = useState(null);
    const [basket, setBasket] = useState(null);
    const [basketDishes, setBasketDishes] = useState([]);
    const totalPrice = basketDishes.reduce((sum, basketDish) => sum + basketDish.quantity * basketDish.Dish.price, restaurant?.deliveryFee);

    useEffect(() => {
        DataStore.query(Basket, b => b.restaurantID("eq", restaurant.id).userID("eq", dbUser.id)).then(baskets => setBasket(baskets[0]));
    }, [dbUser, restaurant]);

    useEffect(() => {
        if(basket) {
            DataStore.query(BasketDish, bd => bd.basketID("eq", basket.id)).then(setBasketDishes);
        }
    }, []);

    const addDishToBasket = async (dish, quantity) => {
        // console.log('addDishToBasket', dish, quantity);
        // get the existing basket from local storage or  create a new one
        // create a BasketDishItem and add to cloud
        let theBasket = basket || await createNewBasket();
        const newDish = await DataStore.save(new BasketDish({
            quantity,
            Dish: dish,
            basketID: theBasket.id,
        }));

        setBasketDishes([...basketDishes, newDish]);
    }

    const createNewBasket = async () => {
        const newBasket = await DataStore.save(new Basket({
            userID: dbUser.id,
            restaurantID: restaurant.id,
        }));
        setBasket(newBasket);
        return newBasket;
    }

    return (
        <BasketContext.Provider value={{
            addDishToBasket,
            setRestaurant,
            basket,
            basketDishes,
            restaurant,
            totalPrice,
        }}>
        {children}
        </BasketContext.Provider>
    );
}


export default BasketContextProvider;

export const useBasketContext = () => {
    return useContext(BasketContext);
}
