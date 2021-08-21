import React from 'react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { useRouter } from 'next/router';

const Category = () => {

    const { query: { category }} = useRouter();

    return (
        <BasicLayout className="category">
            { category}
        </BasicLayout>
    )
}

export default Category
