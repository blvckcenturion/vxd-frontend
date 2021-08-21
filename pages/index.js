import { useState, useEffect } from 'react'; 
import BasicLayout from '../layouts/BasicLayout';
import { getLatestProductsApi } from '../api/product';
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react'
import ProductList from '../components/ProductList';

export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLatestProductsApi(50);
      if (size(response) > 0) setProducts(response);
      else setProducts([]);
    })()
  }, [])

  return (
    <BasicLayout className="home">
      {!products && <Loader active>Cargando</Loader>}
      {products && size(products) === 0 && (<div> <h3>No hay productos disponibles.</h3></div>)}
      {size(products) > 0 && <ProductList products={ products }/>}
    </BasicLayout>
  )
}

