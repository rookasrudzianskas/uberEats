import React from 'react';
import {Form, Input, Card, Button} from 'antd';

const Settings = ({}) => {
    return (
        <Card title={'Restaurant Details'} style={{margin: 20}}>
            <Form layout={'vertical'} wrapperCol={{span: 8}}>
                <Form.Item label={'Restaurant Name'} required={true}>
                    <Input placeholder={'Enter restaurant name here'}/>
                </Form.Item>

                <Form.Item label={'Restaurant Address'} required={true}>
                    {/*<Input placeholder={'Enter restaurant name here'}/>*/}
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
