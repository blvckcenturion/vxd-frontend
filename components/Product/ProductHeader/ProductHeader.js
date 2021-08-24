import React, { useState, useEffect } from 'react';
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import { size } from 'lodash';
import { isFavoritedApi, addFavoritedApi, deleteFavoritedApi } from '../../../api/favorited';
import classNames from 'classnames';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import { addProductsCart } from '../../../api/cart';

const ProductHeader = ({ product }) => {
    const { productimage: { url }, title } = product;
   
    return (
        <Grid className="product-header">
            <Grid.Column mobile={16} tablet={6} computer={5}>
                <Image src={url} alt={ title }/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={11}>
                <Info product={ product}/>
            </Grid.Column>
        </Grid>
    )
}

export default ProductHeader

const Info = ({ product }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const { auth, logout } = useAuth();
    const [reloadFavorites, setReloadFavorites] = useState(false);
    const { addProductCart } = useCart();

    useEffect(() => {
        (async () => {
            if (auth) {
                const response = await isFavoritedApi(auth.idUser, product.id, logout)
                if (size(response)) setIsFavorited(true);
                else setIsFavorited(false);
            }
        })()
        setReloadFavorites(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, product, reloadFavorites])

    const addFavorite = async () => {
        if (auth) {
            await addFavoritedApi(auth.idUser, product.id, logout);
            setReloadFavorites(true);
        } else {
            tostify.error('You must be logged in to add favorites');
        }
    }

    const deleteFavorite = async () => {
        if (auth) {
            await deleteFavoritedApi(auth.idUser, product.id, logout);
            setReloadFavorites(true);
        }
    }

    const { title, description, price, discount, url, category, brand } = product;
    return (
        <>
            <div className="product-header__title">
                {title}
                <Icon name={isFavorited ? "heart" : "heart outline"} className={classNames({ like: "isFavorite", })} link onClick={ isFavorited ? deleteFavorite : addFavorite} />
            </div>
            <div className="product-header__summary">
                { description }
            </div>
            <div className="product-header__buy">
                <div className="product-header__buy-price">
                    
                    {discount ? (
                        <div className="product-header__buy-price-actions">
                            <p className="discount">-{discount}%</p>
                            <p>{ (price - Math.floor(price*discount)/100).toFixed(2) }$</p>
                        </div>
                    ) : <p className="product-header__buy-price-action">Precio: ${price}</p>}
                    
                </div>
                <Button className="product-header__buy-btn" onClick={() => addProductCart(url)}>
                        Comprar
                </Button>
            </div>
        </>
    )
}