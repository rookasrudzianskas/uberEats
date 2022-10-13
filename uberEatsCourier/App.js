import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, View} from 'react-native';
import orders from './src/assets/data/orders.json';

export default function App() {
    const order = orders[0];

    return (
        <View className="mt-10 mx-4">
            <View>
                <Image source={{uri: order?.Restaurant?.image}} className="w-20 h-28" />
                <View>
                    <Text className="text-lg font-bold">{order?.Restaurant?.name}</Text>
                    <Text>{order?.Restaurant?.address}</Text>
                    <Text>Delivery Details:</Text>

                    <Text>{order?.User?.name}</Text>
                    <Text>{order?.User?.address}</Text>
                </View>
                <View>
                    {/*<Entypo name="check" size={30} color="black" />*/}
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

