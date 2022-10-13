import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";
import DishListItem from "../../components/DishListItem";
import RestaurantHeader from "./Header";
import {useNavigation, useRoute} from "@react-navigation/native";
import {DataStore} from "aws-amplify";
import {Dish, Restaurant} from "../../models";
import {useBasketContext} from "../../contexts/BasketContext";

const RestaurantDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const id = route.params?.id;
    const [restaurant, setRestaurant] = useState(null);
    const [dishes, setDishes] = useState([]);
    const {setRestaurant: setBasketRestaurant, basket, basketDishes} = useBasketContext();

    useEffect(() => {
        if(!id) return;
        setBasketRestaurant(null);
        DataStore.query(Restaurant, id).then(setRestaurant);
        DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(setDishes);
    }, [id]);

    useEffect(() => {
        setBasketRestaurant(restaurant);
    }, [restaurant]);

    if(!restaurant) {
        return (
            <View className="items-center justify-center h-screen -mt-7">
                <Text className="text-xl mb-4 font-bold text-gray-900">Restaurant is loading...</Text>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    return (
        <View className="relative bg-gray-100 h-screen">
            <StatusBar style="light" />
            <TouchableOpacity onPress={() => navigation.goBack()} className="absolute z-50 items-center justify-center top-10 left-4 bg-white w-10 h-10 rounded-full" activeOpacity={0.7}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <FlatList
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                    <RestaurantHeader restaurant={restaurant} />
                )} data={dishes} renderItem={({item}) => <DishListItem dish={item} />} />
            </View>

            {basket && (
                <TouchableOpacity onPress={() => navigation.navigate('Basket')} activeOpacity={0.7} className="absolute bottom-24 right-1 left-1 flex-row items-center justify-center mx-4 bg-black py-4 rounded-sm">
                    <Text className="text-white text-[15px] font-semibold">Open Basket ({basketDishes.length})</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default RestaurantDetails;
