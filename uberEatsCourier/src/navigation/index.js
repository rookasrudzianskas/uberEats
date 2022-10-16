import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from "../screens/OrdersScreen";
import OrderDelivery from "../screens/OrderDelivery";
import ProfileScreen from "../screens/ProfileScreen";
import {useAuthContext} from "../contexts/AuthContext";
import {ActivityIndicator, View} from "react-native";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {dbCourier} = useAuthContext();
    if(dbCourier === null) {
        return (
            <View className="bg-gray-100 h-screen justify-center items-center">
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <Stack.Navigator>
            {dbCourier ? (
                <>
                    <Stack.Screen options={{
                        headerShown: false
                    }} name="OrdersScreen" component={OrdersScreen} />
                    <Stack.Screen options={{
                        headerShown: false,
                    }} name="OrdersDeliveryScreen" component={OrderDelivery} />
                </>
            ) : (
                <Stack.Screen options={{
                    headerShown: false,
                }} name="Profile" component={ProfileScreen} />
            )}
        </Stack.Navigator>
    );
}

export default Navigation;
