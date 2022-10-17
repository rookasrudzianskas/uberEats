import React, {useEffect, useState} from 'react';
import {Form, Input, Card, Button, message} from 'antd';
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import {DataStore} from "aws-amplify";
import {Restaurant} from "../src/models";
import {useRestaurantContext} from "../contexts/RestaurantContext";

const Settings = ({}) => {
    const [address, setAddress] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [name, setName] = useState(null);
    const {restaurant, setRestaurant, sub} = useRestaurantContext();

    useEffect(() => {
        if(restaurant) {
            setName(restaurant.name);
            // setAddress(restaurant.address);
            setCoordinates({lat: restaurant.lat, lng: restaurant.lng});
        }
    }, [restaurant]);

    const getAddressLatLng = async (address) => {
        setAddress(address);
        const geocodedByAddress = await geocodeByAddress(address.label);
        const latlng = await getLatLng(geocodedByAddress[0]);
        setCoordinates(latlng);
    }

    const onSubmit = async () => {
        if(!restaurant) {
            await createNewRestaurant();
        } else {
            await updateRestaurant();
        }
    }

    const createNewRestaurant = async () => {
        const newRestaurant = await DataStore.save(new Restaurant({
            name: name,
            image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg',
            deliveryFee: 0,
            minDeliveryTime: 15,
            maxDeliveryTime: 120,
            address: address.label,
            lat: coordinates.lat,
            lng: coordinates.lng,
            adminSub: sub,
        }));
        setRestaurant(newRestaurant);
        setAddress(null);
        setCoordinates(null);
        setName(null);
        message.success('Wooohoo! Restaurant created successfully!');
    }

    const updateRestaurant = async () => {
        const updatedRestaurant = await DataStore.save(
            Restaurant.copyOf(restaurant, (updated) => {
                updated.name = name;
                if(address) {
                    updated.address = address.label;
                    updated.lat = coordinates.lat;
                    updated.lng = coordinates.lng;
                }
            })
        );
        setRestaurant(updatedRestaurant);
        message.success('Wooohoo! Restaurant updated successfully!');
    }

    return (
        <Card title={'Restaurant Details'} style={{margin: 20}}>
            <Form onFinish={onSubmit} layout={'vertical'} wrapperCol={{span: 8}}>
                <Form.Item label={'Restaurant Name'} required={true}>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={'Enter restaurant name here'}/>
                </Form.Item>

                <Form.Item label={'Restaurant Address'} required={true}>
                    <GooglePlacesAutocomplete
                        apiKey={`AIzaSyANnaCDkJfngBby06ySakU_kapQLlDmF4o`}
                        selectProps={{
                            value: address,
                            onChange: getAddressLatLng,
                        }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type={'primary'} htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
            <span>{coordinates?.lat} - {coordinates?.lng}</span>
        </Card>
    );
};

export default Settings;
// by Rokas with ❤️
