import { useState } from 'react';
import { Image, Modal } from 'semantic-ui-react';
import Slider from 'react-slick';
import { map } from 'lodash';

const ProductGallery = ({ product }) => {
    const { title, productgallery } = product;
    const [showModal, setShowModal] = useState(false);
    const [urlImage, setUrlImage] = useState(null);
    const openImage = (url) => {
        setUrlImage(url);
        setShowModal(true);
    }

    return (
        <>
            <div className="product-gallery">
                {map(productgallery, (image) => {
                    return <Image key={image._id} src={image.url} alt={image.name} onClick={ () => openImage(image.url)}/>
                })}
            </div>
            <Modal open={showModal} onClose={ () => setShowModal(false)} size="large" className="image-modal">
                <Image src={urlImage} alt={ title } className="modal-image"></Image>
            </Modal>
        </>
    )
}

export default ProductGallery
