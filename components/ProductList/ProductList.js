import React from 'react';
import { get, map } from 'lodash';
import { Image, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import useWindowSize from '../../hooks/useWindowSize';
import breakpoints from '../../utils/breakpoints';

const ProductList = ({ products }) => {
    const { width } = useWindowSize();
    const { breakpointUpSm, breakpointUpMd, breakpointUpLg } = breakpoints;

    const getColumnsRender = () => {
        switch (true) {
            case width > breakpointUpLg:
                return 5;
            case width > breakpointUpMd:
                return 3;
            case width > breakpointUpSm:
                return 2;
            default:
                return 1;
        }
    }

    return (
        <div className="product-list">
            <Grid>
                <Grid.Row columns={getColumnsRender()}>
                    {map(products, (product, i) => (
                        <Product product={product} key={ i}/>
                    ))}
                </Grid.Row>
            </Grid>
            
        </div>
    )
}

export default ProductList

const Product = ({ product }) => {
    const { title, url, productimage, discount, price } = product;
    return (
        <Grid.Column className="product-list__product">
            <Link href={`/${url}`}>
                <a>
                    <div className="product-list__product-image">
                        <Image src={productimage.url} alt={title}/>
                        <div className="product-list__product-info">
                            {!discount && <span className="discount">-100%</span>}
                            <span className="price">{ price }$</span>
                        </div>
                    </div>
                    <h2>{title}</h2>
                </a>
            </Link>
        </Grid.Column>
    )
}
