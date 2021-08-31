import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { map, size } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import { getOrdersApi } from '../api/order';
import useAuth from '../hooks/useAuth';
import Order from '../components/Order';

const Orders = () => {
    const [orders, setOrders] = useState(null);
    const { auth, logout } = useAuth();
    useEffect(() => {
        (async () => {
            const response = await getOrdersApi(auth.idUser, logout);
            console.log(response);
            setOrders(response || []);
        })()
        // eslint-disable-next-line
    }, [auth.idUser])

    return (
        <BasicLayout className="orders">
            <div className="orders__block">
            <div className="title">Mis pedidos</div>
            <div className="data">
            {size(orders) === 0 ? (
                <h2 style={{ textAlign: "center" }}>
                Todavía no has realizado ninguna compra
                </h2>
            ) : (
                <OrderList orders={orders} />
            )}
            </div>
        </div>
        </BasicLayout>
    )
}

export default Orders

const OrderList = ({ orders }) => {
    return (
        <Grid>
            {map(orders, (order, i) => (
                <Grid.Column mobile={16} table={6} computer={8} key={i}>
                    <Order order={order} index={ i } />
                </Grid.Column>
            ))}
        </Grid>
    )
}
