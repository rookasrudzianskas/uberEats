import React, {useEffect, useState} from 'react';
import {Card, Table, Button, Popconfirm} from 'antd';
import Link from "next/link";
import {DataStore} from "aws-amplify";
import {Dish, Order} from "../src/models";
import {useRestaurantContext} from "../contexts/RestaurantContext";

const Menu = ({}) => {
    const [dishes, setDishes] = useState([]);
    const {restaurant} = useRestaurantContext();

    const deleteDish = async (dish) => {
        // console.log("item", item);
        await DataStore.delete(dish);
        setDishes(dishes.filter(d => d.id !== dish.id));
    }

    const tableColumns = [
        {
            title: 'Menu Item',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Price",
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span>{price} $</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, item) => (
                <Popconfirm placement={'topLeft'} title={'Are you sure you want to delete this Dish?'} onConfirm={() => deleteDish(item)} okText={'Yes'} cancelText={'No'}>
                    <Button danger>Remove</Button>
                </Popconfirm>
            )
        }
    ];

    const fetchDishes = async () => {
        const dishes = await DataStore.query(Dish, (c) => c.restaurantID("eq", restaurant.id));
        setDishes(dishes);
    }

    useEffect(() => {
        if(!restaurant?.id) return;
        fetchDishes();
        const subscription = DataStore.observe(Order).subscribe(() => fetchDishes());
        return () => subscription.unsubscribe();
    }, [restaurant?.id]);

    const renderNewItemButton = () => (
        <Link href={'/menu/create'}>
            <Button type={'primary'}>
                New Item
            </Button>
        </Link>
    )

    return (
        <Card title={'Menu'} style={{margin: 20}} extra={renderNewItemButton()}>
            <Table dataSource={dishes} columns={tableColumns} rowKey={'id'} />
        </Card>
    );
};

export default Menu;
// by Rokas with ❤️
