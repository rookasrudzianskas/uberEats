import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from "../screens/OrdersScreen";
import OrderDelivery from "../screens/OrderDelivery";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false
            }} name="Orders" component={OrdersScreen} />
            <Stack.Screen options={{
                headerShown: false,
            }} name="OrderPickUp" component={OrderDelivery} />
        </Stack.Navigator>
    );
}

export default RootNavigator;
