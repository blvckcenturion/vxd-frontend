import { useState, useEffect } from 'react';
import { size, forEach } from 'lodash';
import { getFavoritedApi } from '../api/favorited';
import useAuth from '../hooks/useAuth';
import BasicLayout from "../layouts/BasicLayout";
import { Loader } from 'semantic-ui-react';
import ProductList from '../components/ProductList/ProductList';

const Wishlist = () => {

    const [products, setProducts] = useState(null);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getFavoritedApi(auth.idUser, logout);
            if (size(response)) {
                const productList = [];
                forEach(response, (value, key) => {
                    productList.push(value.product);
                });
                setProducts(productList);
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    

    return (
        <BasicLayout className="wishlist">
            <div className="wishlist__block">
                <div className="title">Lista de deseos</div>
                <div className="data">
                {!products && <Loader active>Cargando productos</Loader>}
                {(products && size(products) === 0) && (<div className="data__not-found"><h3>No se encontraron productos en tu lista de favoritos</h3></div>)}
                {size(products) > 0 && <ProductList products={products} />}
                </div>
            </div>
        </BasicLayout>
    )
}

export default Wishlist
