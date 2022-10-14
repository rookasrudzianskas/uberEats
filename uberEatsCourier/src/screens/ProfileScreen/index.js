import {View, Text, TextInput, StyleSheet, Button, Alert} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {DataStore} from "aws-amplify";
import {useAuthContext} from "../../contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {Courier} from "../../models";

const Profile = () => {
  const { dbCourier, sub, setDbCourier } = useAuthContext();
  const [name, setName] = useState(dbCourier?.name || '');
  const [lat, setLat] = useState(dbCourier?.lat + "" || '0');
  const [lng, setLng] = useState(dbCourier?.lng + "" || '0');
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
              updated.address = address,
              updated.lat = parseFloat(lat),
              updated.lng = parseFloat(lng)
          }));
      setDbCourier(courier);
      navigation.goBack();
  }

  const createCourier = async () => {
      // save in DataStore here
      try {
          const courier = await DataStore.save(new Courier({
              name,
              address,
              lat: parseFloat(lat),
              lng: parseFloat(lng),
              sub: sub,
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
