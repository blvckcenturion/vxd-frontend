import { Tab, Pane } from 'semantic-ui-react';
import ProductGallery from '../ProductGallery/ProductGallery';

const ProductTabs = ({ product }) => {
    const panes = [
        
        {
            menuItem: 'Galeria',
            // eslint-disable-next-line react/display-name
            render: () => (<Tab.Pane><ProductGallery product={ product }/></Tab.Pane>),
        }
      ];
    
    return <Tab className="product-tabs" panes={panes} />;
}

export default ProductTabs
