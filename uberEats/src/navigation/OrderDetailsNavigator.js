import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderDetails from "../screens/OrderDetails/OrderDetails";
import OrderLiveUpdates from "../screens/OrderLiveUpdates";

const Tab = createMaterialTopTabNavigator();

const OrderDetailsNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Details" component={OrderDetails} />
            <Tab.Screen name="Updates" component={OrderLiveUpdates} />
        </Tab.Navigator>
    );
}

export default OrderDetailsNavigator;
