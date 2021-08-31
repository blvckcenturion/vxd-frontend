import React from 'react'
import Header from 'next/head';

const Seo = ({ title, description}) => {
    return (
        <Header>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Header>
    )
}


Seo.defaultProps = {
    title: 'ProShop',
    description: 'ProShop, the coolest store of the world'
}
export default Seo
