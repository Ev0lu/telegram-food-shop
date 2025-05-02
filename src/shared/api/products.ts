import { createApi } from '@reduxjs/toolkit/query/react'
import { apiBaseQuery } from '../api';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: apiBaseQuery,
    endpoints: (builder) => ({
        getCatalogsCategory: builder.query<{
          categories: any; category: { title: string } 
}, string>({
            query: (id) => `catalog/categories/${id}`,
        }),
        getActions: builder.query<{ actions: {
          product_quantity: any;
          reward_points: any; id: string; product: { picture_url: string; title: string; product_quantity: string; reward_points: number } 
}[] }, string>({
            query: (id) => `catalog/actions?category_id=${id}`,
        }),
        getProducts: builder.query<{ products: { entry_id: string; title: string; picture_url: string; price: number; product_quantity: string }[] }, string>({
            query: (id) => `catalog/products?category_id=${id}`,
        }),
    }),
})

export const { useGetActionsQuery, useGetCatalogsCategoryQuery, useGetProductsQuery } = productsApi
