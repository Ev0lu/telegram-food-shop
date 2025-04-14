import { getToken } from "@/app/app";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const staffOrdersApi = createApi({
    reducerPath: "staffOrdersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://bot5ka.ru/api/v1" }),
    endpoints: (builder) => ({
        removeProduct: builder.mutation<{ status: string; order: any; products_quantity: any, }, { orderId: string; productId: string; staffId: string }>({
            query: ({ orderId, productId, staffId }) => ({
                url: `/staff/orders/${orderId}`,
                method: "PATCH",
                headers: { Authorization: `${getToken("access")}` },
                body: {
                    products: { [productId]: 1 },
                    staff_id: staffId,
                },
            }),
        }),
        acceptOrder: builder.mutation<void, { orderId: string }>({
            query: ({ orderId }) => ({
                url: `/staff/orders/${orderId}/accept`,
                method: "POST",
                headers: { Authorization: `${getToken("access")}` },
            }),
        }),
        rejectOrder: builder.mutation<void, { orderId: string }>({
            query: ({ orderId }) => ({
                url: `/staff/orders/${orderId}/reject`,
                method: "POST",
                headers: { Authorization: `${getToken("access")}` },
            }),
        }),
        staffOrder: builder.query({
            query: ({ telegramId }) => ({
                url: `/staff/orders/${telegramId}`,
            }),
        }),
    }),
});

export const { useRemoveProductMutation, useAcceptOrderMutation, useRejectOrderMutation, useStaffOrderQuery } = staffOrdersApi;
