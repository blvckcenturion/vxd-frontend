import { useState, useEffect } from 'react';
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import { size } from 'lodash';

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
    const { title, description, price, discount, category, brand } = product;
    return (
        <>
            <div className="product-header__title">
                {title}
                <Icon name="heart outline" link />
                
            </div>
            <div className="product-header__summary">
                { description }
            </div>
            <div className="product-header__buy">
                <div className="product-header__buy-price">
                    
                    {discount ? (
                        <div className="product-header__buy-price-actions">
                            <p className="discount">-{6}%</p>
                            <p>{ price - Math.floor(price*6)/100 }$</p>
                        </div>
                    ) : <p className="product-header__buy-price-action">Precio: ${price}</p>}
                    
                </div>
                <Button className="product-header__buy-btn">
                        Comprar
                    </Button>
            </div>
        </>
    )
}