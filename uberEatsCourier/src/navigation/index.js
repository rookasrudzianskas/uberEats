import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from "../screens/OrdersScreen";
import OrderDelivery from "../screens/OrderDelivery";
import ProfileScreen from "../screens/ProfileScreen";
import {useAuthContext} from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {dbCourier} = useAuthContext();
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
