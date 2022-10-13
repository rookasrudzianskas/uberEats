import React, {useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";

const OrdersScreen = () => {
    const bottomSheetRef = useRef(null);

    return (
        <View>
            <BottomSheet ref={bottomSheetRef} snapPoints={["12%", "95%"]}>
                <View className="bg-red-500 flex-1">
                    <Text>Hello</Text>
                </View>
            </BottomSheet>
        </View>
    );
};

export default OrdersScreen;
