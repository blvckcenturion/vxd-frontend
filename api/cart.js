import { BASE_PATH, CART } from '../utils/constants';
import { toast } from 'react-toastify';
import { size, includes, remove } from 'lodash';
import AddressShipping from '../components/Cart/AddressShipping';
import { authFetch } from '../utils/fetch';

export const getProductsCart = () => {
    const cart = localStorage.getItem(CART);

    if (!cart) return null
    else {
        const products = cart.split(",");
        return products;
    }
}

export const addProductsCart = (product) => {
    const cart = getProductsCart();
    if (!cart) {
        localStorage.setItem(CART, product)
        toast.success("Producto agregado al carrito.")
    } else {
        const productFound = includes(cart, product);
        if (productFound) {
            toast.error('Product ya esta en el carrito');
        } else {
            cart.push(product);
            localStorage.setItem(CART, cart);
            toast.success("Producto agregado al carrito.")
        }
    }
}

export const countProductsCart = () => {
    const cart = getProductsCart();
    if (!cart) return 0;
    else return size(cart);
}

export const removeProductsCart = (product) => {
    const cart = getProductsCart();
    remove(cart, (item) => {
        return item === product;
    })

    if (size(cart) > 0) {
        localStorage.setItem(CART, cart);
    } else {
        localStorage.removeItem(CART);
    }
}

export const placeOrderApi = async (products, idUser, address, logout) => {

    try {
        const totalPayment = products.reduce((acc, curr) => acc + curr.price, 0);
        products = products.map(product => product.id);
        console.log(address);
        const url = `${BASE_PATH}/orders`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ products, user: idUser, address: address.id, totalPayment })
        }
        const result = await authFetch(url, params, logout);
        return result;
    } catch (e) {
        console.log(e);
        return null;
    }

}

export const removeAllProductsCart = () => {
    localStorage.removeItem(CART);
}