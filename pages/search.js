import React, { useState, useEffect} from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { searchProductsApi } from '../api/product';
import { useRouter } from 'next/router';
import { size } from 'lodash-es';
import ProductList from '../components/ProductList';
import { Loader } from 'semantic-ui-react';
import Seo from '../components/Seo';

const Search = () => {
    const [products, setProducts] = useState(null);
    const { query } = useRouter();

    useEffect(() => {
        document.getElementById("search-item").focus()
    }, [])

    useEffect(() => {
        (async () => {
            if (size(query.query) > 2) {
              const response = await searchProductsApi(query.query);
              if (size(response) > 0) setProducts(response);
              else setProducts([]);
            } else {
              setProducts([]);
            }
        })();

    }, [query])

    return (
        <BasicLayout className="search">
            <Seo title={`Buscando: ${query.query}`} />
                {!products && <Loader active>Cargando productos</Loader>}
                {(products && size(products) === 0) && (<div className="data__not-found"><h3>No se encontraron productos.</h3></div>)}
                {size(products) > 0 && <ProductList products={products} />}
        </BasicLayout>
    )
}

export default Search
