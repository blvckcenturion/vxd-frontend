import React, {useState} from 'react'
import { Image, Icon, Button } from "semantic-ui-react";
import BasicModal from '../Modal/BasicModal';
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";

import { map } from 'lodash';

const Order = ({ order, index }) => {
    const [showModal, setShowModal] = useState(false);

    const { products, totalPayment, createdAt, address } = order;
    return (
        <>
        <div className="order">
            <div className="order__info">
                <div className="order__info-data">
                    <h2>Orden #{index + 1}</h2>
                    <br />
                    <h3>Monto Total: { totalPayment }</h3>
                </div>
                <div className="order__info-date">
                    
                    <h4>
                        {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
                    </h4>
                    <p>
                        {address.city}, {address.address}
                    </p>
                    <p>
                        {address.phone}
                    </p>
                </div>
                <div className="order__other" onClick={() => setShowModal(true)}>
                    <Button type="button">
                        Ver Detalles<Icon name="eye"/>
                    </Button>
                </div>
            </div>
        </div>
        <ProductsModal
                showModal={showModal}
                setShowModal={setShowModal}
                products={ products }
            />
        </>
    )
}

const ProductsModal = ({ showModal, setShowModal, products }) => {
    return (
        <BasicModal
            show={showModal}
            setShow={setShowModal}
            title="Detalles de Orden"
            size="small"
        >
            <div className="products-list">
            {map(products, (product, i) => {
                return (
                    <Link href={`/${product.url}`} passHref>
                    <div className="products-list__product" key={i}>
                        <div className="products-list__product-img">
                                <Image src={product.productimage.url} alt={ product.title }/>
                        </div>
                        <div className="product-info">
                        <h2>{product.title}</h2>
                        <h3>Precio: { product.price}</h3>
                        </div>
                        
                    </div>
                    </Link>
                )
            })}
            </div>
        </BasicModal>
    )
}

export default Order
