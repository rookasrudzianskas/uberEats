import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import RestaurantItem from "../../components/RestaurantItem";
import {DataStore} from "aws-amplify";
import {Restaurant} from "../../models";

const HomeScreen = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        DataStore.query(Restaurant).then(setRestaurants);
    }, []);

    if(!restaurants.length) {
        return (
            <View className="items-center justify-center h-screen -mt-16">
                <Text className="text-xl mb-4 font-bold text-gray-900">Restaurants loading 😅</Text>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    return (
        <View className="mx-4">
            <FlatList
                keyExtractor={(item) => item.id}
                data={restaurants}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <RestaurantItem restaurant={item} />}
            />
        </View>
    );
};

export default HomeScreen;
