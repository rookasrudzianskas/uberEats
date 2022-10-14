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
  const [address, setAddress] = useState(dbCourier?.address || '');
  const [lat, setLat] = useState(dbCourier?.lat + "" || '0');
  const [lng, setLng] = useState(dbCourier?.lng + "" || '0');
  const navigation = useNavigation();

  const onSave = async () => {
      if(dbCourier) {
          await updateUser();
      } else {
          await createUser();
      }
  };

  const updateUser = async () => {
      // update user
      const user = await DataStore.save(
          Courier.copyOf(dbCourier, updated => {
              updated.name = name,
              updated.address = address,
              updated.lat = parseFloat(lat),
              updated.lng = parseFloat(lng)
          }));
      setDbCourier(user);
      navigation.goBack();
      // console.warn('user updated', user);
  }

  const createUser = async () => {
      // save in DataStore here
      try {
          const user = await DataStore.save(new Courier({
              name,
              address,
              lat: parseFloat(lat),
              lng: parseFloat(lng),
              sub: sub,
          }));
          setDbCourier(user);
          // console.warn("User saved successfully", user);
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
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitude"
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
