import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderDetails from "../screens/OrderDetails/OrderDetails";
import OrderLiveUpdates from "../screens/OrderLiveUpdates";

const Tab = createMaterialTopTabNavigator();

const OrderDetailsNavigator = ({route}) => {
    const id = route?.params?.id;
    return (
        <Tab.Navigator>
            <Tab.Screen name="Details" component={() => <OrderDetails id={id} />} />
            <Tab.Screen name="Updates" component={() => <OrderLiveUpdates id={id} />} />
        </Tab.Navigator>
    );
}

export default OrderDetailsNavigator;
