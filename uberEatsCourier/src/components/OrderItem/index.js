import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {DataStore} from "aws-amplify";
import {User} from "../../models";

const OrderItem = ({order}) => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    // console.log(order);

    useEffect(() => {
        DataStore.query(User, order.userID).then(setUser);
    }, []);

    return (
        <TouchableOpacity onPress={() => navigation.navigate('OrdersDeliveryScreen', {id: order.id})} activeOpacity={0.7} className="flex-row items-center border border-[2px] my-2 border-green-500 rounded-lg">
            <View className="flex-1 flex-row">
                <Image source={{uri: order?.Restaurant?.image}} style={{}} className="w-20 m-1 rounded-lg" />
                <View className="px-3 py-3">
                    <Text className="text-lg font-bold max-w-[200px]" style={{lineHeight: 25}}>{order?.Restaurant?.name}</Text>
                    <Text className="text-sm text-gray-500">{order?.Restaurant?.address}</Text>
                    <Text className="text-[15px] font-[600] mt-[4px]">Delivery Details:</Text>

                    <Text className="text-sm text-gray-500 mt-[2px]">{user?.name || 'Loading...'}</Text>
                    <Text className="text-sm text-gray-500">{user?.address || 'Loading...'}</Text>
                </View>
            </View>
            <View className="bg-green-500 h-full flex-row px-2 items-center justify-center">
                <Entypo name="check" size={30} color="white" />
            </View>
        </TouchableOpacity>
    );
};

export default OrderItem;
