import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (builder) => ({
        sendContactMessage: builder.mutation({
            query: (data) => ({
                url: "/contact",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useSendContactMessageMutation } = contactApi;
