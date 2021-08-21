import React from 'react';
import { map } from 'lodash';
import { Image, Grid } from 'semantic-ui-react';
import Link from 'next/link';

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            <Grid>
                <Grid.Row columns={5}>
                    {map(products, (product) => (
                        <Product product={ product }/>
                    ))}
                </Grid.Row>
            </Grid>
            
        </div>
    )
}

export default ProductList

const Product = ({ product: { title, url } }) => {
    console.log(url)
    return (
        <Grid.Column className="product-list__product">
            <Link href={`/${url}`}>
                <a>
                    <div className="product-list__product-image">
                        { title }
                    </div>
                </a>
            </Link>
        </Grid.Column>
    )
}
