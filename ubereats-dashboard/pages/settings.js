import React, {useState} from 'react';
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

    const getAddressLatLng = async (address) => {
        setAddress(address);
        const geocodedByAddress = await geocodeByAddress(address.label);
        const latlng = await getLatLng(geocodedByAddress[0]);
        setCoordinates(latlng);
    }

    const onSubmit = async () => {
        // console.log("address", address);
        // console.log("coordinates", coordinates);
        // console.log("name", name);
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
        message.success('Wooohoo! Restaurant created successfully!');
    }

    return (
        <Card title={'Restaurant Details'} style={{margin: 20}}>
            <Form onFinish={onSubmit} layout={'vertical'} wrapperCol={{span: 8}}>
                <Form.Item label={'Restaurant Name'} required={true}>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={'Enter restaurant name here'}/>
                </Form.Item>

                <Form.Item label={'Restaurant Address'} required={true}>
                    {/*<Input placeholder={'Enter restaurant name here'}/>*/}
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
