import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const OrderLiveUpdates = ({id}) => {
    const [order, setOrder] = useState(null);

    return (
        <View>
            <MapView className="h-full w-full" />
        </View>
    );
};

export default OrderLiveUpdates;
