import {View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {DataStore} from "aws-amplify";
import {useAuthContext} from "../../contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {Courier, TransportationModes, TransportationModes as TrasportationModes} from "../../models";
import {AntDesign, FontAwesome} from "@expo/vector-icons";

const Profile = () => {
  const { dbCourier, sub, setDbCourier } = useAuthContext();
  const [name, setName] = useState(dbCourier?.name || '');
  const [lat, setLat] = useState(dbCourier?.lat + "" || '0');
  const [lng, setLng] = useState(dbCourier?.lng + "" || '0');
  const [transportationMode, setTransportationMode] = useState(TrasportationModes.DRIVING);
  const navigation = useNavigation();

  const onSave = async () => {
      if(dbCourier) {
          await updateCourier();
      } else {
          await createCourier();
      }
  };

  const updateCourier = async () => {
      // update courier
      const courier = await DataStore.save(
          Courier.copyOf(dbCourier, updated => {
              updated.name = name,
              updated.transportationMode = transportationMode
          }));
      setDbCourier(courier);
      navigation.goBack();
  }

  const createCourier = async () => {
      // save in DataStore here
      try {
          const courier = await DataStore.save(new Courier({
              name,
              // lat: 0,
              // lng: 0,
              sub: sub,
              transportationMode: transportationMode,
          }));
          setDbCourier(courier);
      } catch (e) {
          Alert.alert('Error', 'Whoops! Something went wrong.');
      }
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

        <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => setTransportationMode(TransportationModes.BICYCLING)} activeOpacity={0.7} className={`${transportationMode === TrasportationModes.DRIVING ? 'bg-gray-200' : ' bg-blue-500'} border border-blue-600 border-[2px] flex-1 items-center py-1 mx-3 rounded-lg`}>
                <AntDesign name="car" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTransportationMode(TransportationModes.DRIVING)} activeOpacity={0.7} className={`${transportationMode === TrasportationModes.BICYCLING ? 'bg-gray-200' : 'bg-yellow-500'}  border border-yellow-600 border-[2px] flex-1 items-center py-1 mx-3 rounded-lg`}>
                <FontAwesome name="bicycle" size={24} color="white" />
            </TouchableOpacity>
        </View>

      <Button onPress={onSave} title="Save" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
});

export default Profile;
