import { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { getProductByUrlApi } from '../api/product';
import useCart from '../hooks/useCart';
import SummaryCart from '../components/Cart/SummaryCart';
import AddressShipping from '../components/Cart/AddressShipping';
import PlaceOrder from '../components/Cart/PlaceOrder';
import Seo from '../components/Seo';
const Cart = () => {
    const { getProductsCart } = useCart();
    const products = getProductsCart();
    return (
        <BasicLayout className="cart">
            <Seo title={ "Carrito de Compras"}/>
            <h2>Carrito de compras</h2>
            {!products
                ? <EmptyCart/>
                : <FullCart products={ products }/>
            }
        </BasicLayout>
    )
}

export default Cart


const EmptyCart = () => {
    return (
        <div className="empty-cart">
            <p>No hay productos en el carrito</p>
        </div>
    )
}

const FullCart = ({ products }) => {
    const [productsData, setProductsData] = useState(null);
    const [address, setAddress] = useState(null);
    console.log("pvto", productsData);
    useEffect(() => {
        (async () => {
            const productsTemp = [];
            for await (const product of products) {
                const data = await getProductByUrlApi(product);
                productsTemp.push(data[0]);
            }
            setProductsData(productsTemp);
        })()

    }, [products])

    return (
        <div className="cart">
            <SummaryCart products={productsData} />
            <AddressShipping setAddress={setAddress} />
            {address && <PlaceOrder address={address} products={productsData} />}
        </div>
    )
}