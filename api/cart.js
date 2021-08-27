import { BASE_PATH, CART } from '../utils/constants';
import { toast } from 'react-toastify';
import { size, includes, remove } from 'lodash';

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