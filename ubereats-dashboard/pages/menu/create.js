import React from 'react';
import {Form, Input, Button, Card, InputNumber} from 'antd';

const Create = ({}) => {
    const {TextArea} = Input;

    return (
        <Card title={'New Menu Item'} style={{margin: 20}}>
            <Form layout={'vertical'} wrapperCol={{span: 8}}>
                <Form.Item label="Dish Name" required={true}>
                    <Input placeholder={'Enter dish name'}/>
                </Form.Item>

                <Form.Item label="Dish Description" required={true}>
                    <TextArea rows={4} placeholder={'Enter dish description'}/>
                </Form.Item>

                <Form.Item label="Dish Price ($)" required={true}>
                    <InputNumber />
                </Form.Item>

                <Form.Item label="" required={true}>
                    <Button type={'primary'}>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Create;
// by Rokas with ❤️
