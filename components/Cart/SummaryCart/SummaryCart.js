import { useState, useEffect } from "react";
import { Table, Image, Icon, Loader } from 'semantic-ui-react';
import { forEach, map, remove } from "lodash";
import  useCart  from '../../../hooks/useCart';

const SummaryCart = ({ products }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const { removeProductCart } = useCart();

    useEffect(() => {
        let price = 0;
        forEach(products, (product) => {
            if (product?.discount) {
                price += product.price - (product.price * (product.discount/100));
            } else {
                price += product.price;    
            }
        })
        setTotalPrice(price);
    }, [products])

    const removeProduct = (product) => {
        removeProductCart(product);
    }


    return (
        <div className="summary-cart">
            {!products ? <Loader active>Cargando Productos</Loader> : (
                <>
                <div className="title">Resumen del carrito.</div>
                <div className="data">
                    <Table celled structured>
                            <Table.Header className="data-header">
                            <Table.Row>
                                <Table.HeaderCell>Producto</Table.HeaderCell>
                                <Table.HeaderCell>Categoria</Table.HeaderCell>
                                <Table.HeaderCell>Precio</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                                {map(products, (product, key) => {
                                    return (
                                        <Table.Row key={key} className="summary-cart__product">
                                            <Table.Cell>
                                                <div className="summary-cart__product-delete">
                                                    <Icon name="close" link onClick={() => removeProduct(product.url)} />
                                                </div>
                                                <Image src={product.productimage.url} alt={product.title} />
                                                <h5>{ product.title }</h5>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <h5>{ product.category.title }</h5>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <h5>{ product.price}$</h5>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                                 <Table.Row className="summary-cart__resume">
                                <Table.Cell className="clear"/>
                                <Table.Cell><h5>Total:</h5></Table.Cell>
                                <Table.Cell className="total-price"><h5>{ totalPrice.toFixed(2)}$</h5></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                           
                    </Table>
                    </div>
                </>
            )}
            
        </div>
    )
}

export default SummaryCart
