import { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { useRouter } from 'next/router';
import { getProductByUrlApi } from '../api/product';
import ProductHeader from '../components/Product/ProductHeader';
import { Loader } from 'semantic-ui-react';
import ProductTabs from '../components/Product/ProductTabs';

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const { query } = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getProductByUrlApi(query.product);
            setProduct(response[0]);
        })()
    }, [query])

    if(!product) return <BasicLayout><Loader active/></BasicLayout>;

    return (
        <BasicLayout className="product">
            <ProductHeader product={product} />
            <ProductTabs product={ product }/>
        </BasicLayout>
    )
}

export default ProductPage
