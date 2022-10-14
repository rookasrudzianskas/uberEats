import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from "../screens/OrdersScreen";
import OrderDelivery from "../screens/OrderDelivery";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false
            }} name="OrdersScreen" component={OrdersScreen} />
            <Stack.Screen options={{
                headerShown: false,
            }} name="OrdersDeliveryScreen" component={OrderDelivery} />
        </Stack.Navigator>
    );
}

export default Navigation;
