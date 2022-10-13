import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {AntDesign, Feather} from "@expo/vector-icons";
import {useNavigation, useRoute} from "@react-navigation/native";
import {DataStore} from "aws-amplify";
import {Dish} from "../../models";
import {useBasketContext} from "../../contexts/BasketContext";

const DishDetailsScreen = () => {
    const [quantity, setQuantity] = useState(1);
    const navigation = useNavigation();
    const [dish, setDish] = useState(null);
    const route = useRoute();
    const id = route.params?.id;
    const {addDishToBasket} = useBasketContext();

    useEffect(() => {
      if(!id) return;
      DataStore.query(Dish, id).then(setDish);
    }, [id]);

    const onAddToBasket = async () => {
        // () => navigation.navigate('Basket')
        await addDishToBasket(dish, quantity);
        navigation.goBack();
    }

    if(!dish) {
        return (
            <View className="items-center justify-center h-screen -mt-7">
                <Text className="text-xl mb-4 font-bold text-gray-900">Dish is loading...</Text>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    const onPlus = () => {
        // make it always positive number
        setQuantity(Math.max(1, quantity + 1));
    }

    const onMinus = () => {
        // make it always positive number
        setQuantity(Math.max(1, quantity - 1));
    }

    const getTotal = () => {
        return (quantity * dish?.price).toFixed(2);
    }

    return (
        <View className="relative h-screen bg-gray-100">
            <View className="px-4">
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="mt-16">
                    <Feather name="arrow-left" size={28} color="black" />
                </TouchableOpacity>
                <View className="mt-7">
                    <Text className="text-2xl font-[600]">{dish?.name}</Text>
                    <Text className="text-gray-600 text-[15px] mt-3">{dish?.description}</Text>
                </View>
            </View>
            <View className="border-b border-gray-300 my-6"/>

            <View className="flex-row items-center justify-center space-x-4 mt-3">
                <TouchableOpacity onPress={onPlus} activeOpacity={0.7}>
                    <AntDesign name="pluscircleo" size={35} color="black" />
                </TouchableOpacity>
                <Text className="text-gray-900 text-[17px]">{quantity}</Text>
                <TouchableOpacity onPress={onMinus} activeOpacity={0.7}>
                    <AntDesign name="minuscircleo" size={35} color="black" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onAddToBasket} activeOpacity={0.7} className="absolute bottom-28 right-1 left-1 flex-row items-center justify-between mx-4 bg-black py-4 rounded-sm">
                <View></View>
                <Text className="text-white text-[15px] font-semibold ml-16">Add {quantity} to basket</Text>
                <Text className="text-white mr-3">{getTotal()} $</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DishDetailsScreen;
