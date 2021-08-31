import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { size } from 'lodash';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import { placeOrderApi } from '../../../api/cart';
import { Button } from "semantic-ui-react";


const PlaceOrder = ({ products, address }) => {
    const [loading, setLoading] = useState(false);
    const { auth, logout } = useAuth();
    const { removeAllProductsCart } = useCart();
    const router = useRouter();
    
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await placeOrderApi(products, auth.idUser, address, logout);
        if (size(response) > 0) {
            toast.success("Pedido completado!");
            removeAllProductsCart();
            router.push('/orders');
        } else {
            toast.error('Error al realizar el pedido.');
        }
        setLoading(false);
    }

    return (
        <div className="place-order">
            <div className="title">Confirmar Orden</div>
            <div className="data">
                <Button type="submit" loading={loading} onClick={handlePlaceOrder}>
                    Confirmar Orden.
                </Button>
            </div>
        </div>
    )
}

export default PlaceOrder
