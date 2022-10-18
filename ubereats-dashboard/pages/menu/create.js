import React from 'react';
import {Form, Input, Button, Card, InputNumber} from 'antd';
import {DataStore} from "aws-amplify";
import {Dish} from "../../src/models";
import {useRestaurantContext} from "../../contexts/RestaurantContext";

const Create = ({}) => {
    const {TextArea} = Input;
    const {restaurant} = useRestaurantContext();

    const onFinish = ({name, description, price}) => {
        DataStore.save(new Dish({
            name: name,
            description: description,
            price: price,
            restaurantID: restaurant.id,
        }))
    }

    const onFinishFailed = (errorInfo) => {

    }

    return (
        <Card title={'New Menu Item'} style={{margin: 20}}>
            <Form layout={'vertical'} wrapperCol={{span: 8}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    rules={[{required: true, message: 'Please input menu item name'}]}
                    name={'name'} label="Dish Name" required={true}>
                    <Input placeholder={'Enter dish name'}/>
                </Form.Item>

                <Form.Item
                    rules={[{required: true, message: 'Please input menu item description'}]}
                    name={'description'} label="Dish Description" required={true}>
                    <TextArea rows={4} placeholder={'Enter dish description'}/>
                </Form.Item>

                <Form.Item
                    rules={[{required: true, message: 'Please input menu item price'}]}
                    type={'number'}
                    name='price' label="Dish Price ($)" required={true}>
                    <InputNumber />
                </Form.Item>

                <Form.Item label="" required={true}>
                    <Button type={'primary'} htmlType={'submit'}>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Create;
// by Rokas with ❤️
