import { Tab, Pane } from 'semantic-ui-react';
import ProductInfo from '../ProductInfo/ProductInfo';
const ProductTabs = ({ product }) => {
    const panes = [
        
        {
            menuItem: 'Informacion',
            // eslint-disable-next-line react/display-name
            render: () => (<Tab.Pane><ProductInfo product={ product }/></Tab.Pane>),
        }
      ];
    
    return <Tab className="product-tabs" panes={panes} />;
}

export default ProductTabs
