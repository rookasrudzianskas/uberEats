import React, {useState} from 'react';
import {Form, Input, Card, Button} from 'antd';
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';

const Settings = ({}) => {
    const [address, setAddress] = useState(null);
    const [coordinates, setCoordinates] = useState(null);

    const getAddressLatLng = async (address) => {
        setAddress(address);
        const geocodedByAddress = await geocodeByAddress(address.label);
        const latlng = await getLatLng(geocodedByAddress[0]);
        console.log(latlng);
    }

    return (
        <Card title={'Restaurant Details'} style={{margin: 20}}>
            <Form layout={'vertical'} wrapperCol={{span: 8}}>
                <Form.Item label={'Restaurant Name'} required={true}>
                    <Input placeholder={'Enter restaurant name here'}/>
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
                    <Button type={'primary'}>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Settings;
// by Rokas with ❤️
