import { useState, useEffect } from 'react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { useRouter } from 'next/router';
import { getProductByCategoryApi, getTotalProductsPerCategoryApi } from '../../api/product';
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react';
import ProductList from '../../components/ProductList/ProductList';
import Pagination from '../../components/Pagination/Pagination';

const limitPerPage = 3;

const Category = () => {

    const { query } = useRouter()
    const [products, setProducts] = useState(null)
    const [totalProducts, setTotalProducts] = useState(null)
    
    const getStartItem = () => {
        const currentPages = parseInt(query.page);
        if (!query.page || currentPages === 1) return 0;
        else return currentPages * limitPerPage - limitPerPage;
    }


    useEffect(() => {
        (async () => {
          if (query.category) {
            const response = await getProductByCategoryApi(
              query.category,
              limitPerPage,
              getStartItem()
            );
            setProducts(response);
          }
        })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [query]);

    useEffect(() => {
        (async () => {
            if (query.category) {
                const response = await getTotalProductsPerCategoryApi(query.category)
                setTotalProducts(response)
            }
        })()
    }, [query])

    return (
        <BasicLayout className="category">
            {!products && <Loader active>Cargando productos</Loader>}
            {(products && size(products) === 0) && (<div><h3>No se encontraron productos de esta categoria</h3></div>)}
            {size(products) > 0 && <ProductList products={products} />}
            {totalProducts  ? <Pagination totalProducts={totalProducts} page={query.page ? parseInt(query.page) : 1} limitPerPage={ limitPerPage}/> : null}
        </BasicLayout>
    )
}

export default Category
