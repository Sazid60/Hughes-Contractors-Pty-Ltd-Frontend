import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://hughes-contractors-pty-ltd.vercel.app/api/v1" }),
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
