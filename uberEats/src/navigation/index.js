import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import RestaurantDetails from "../screens/RestaurantDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrdersScreen from "../screens/OrdersScreen";
import {FontAwesome5, Foundation, Ionicons, MaterialIcons} from "@expo/vector-icons";
import DishDetailsScreen from "../screens/DishDetailsScreen";
import Basket from "../screens/Basket";
import OrderDetails from "../screens/OrderDetails/OrderDetails";
import {Auth} from "aws-amplify";
import ProfileScreen from "../screens/ProfileScreen";
import {useAuthContext} from "../contexts/AuthContext";


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const {dbUser} = useAuthContext();

    return (
        <Stack.Navigator initialRouteName="HomeTabs">
            {dbUser ? (
                <Stack.Screen name="HomeTabs" component={HomeTabs} options={{
                    headerShown: false
                }} />
            ) : (
                <Stack.Screen name={'Profile'} component={ProfileScreen} options={{
                    headerShown: false
                }} />
            )}
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Home" barStyle={{ backgroundColor: 'white'}}>
            <Tab.Screen name="Home" component={HomeStackComponent} options={{
                tabBarIcon: ({color}) => <Foundation name="home" size={24} color={color} />
            }} />
            <Tab.Screen name="Orders" component={OrderStackNavigator} options={{
                tabBarIcon: ({color}) => <MaterialIcons name="list-alt" size={24} color={color} />
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({color}) => <FontAwesome5 name="user-alt" size={20} color={color} />
            }} />
        </Tab.Navigator>
    );
}

const HomeStack = createNativeStackNavigator();

const HomeStackComponent = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Restaurants" component={HomeScreen} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => Auth.signOut()} activeOpacity={0.7} style={{marginRight: 10}}>
                        <Ionicons name="log-in" size={24} color="black" />
                    </TouchableOpacity>
                )
            }} />
            <HomeStack.Screen name="Restaurant" component={RestaurantDetails} options={{
                headerShown: false
            }} />
            <HomeStack.Screen name="Dish" component={DishDetailsScreen} options={{
                headerShown: false
            }} />
            <HomeStack.Screen name="Basket" component={Basket} options={{
                headerShown: false
            }} />
        </HomeStack.Navigator>
    );
}

const OrdersStack = createNativeStackNavigator();

const OrderStackNavigator = () => {
    return (
        <OrdersStack.Navigator>
            <OrdersStack.Screen name="OrdersScreen" component={OrdersScreen} />
            <OrdersStack.Screen name="Order" component={OrderDetails} />
        </OrdersStack.Navigator>
    );
}

export default RootNavigator;
