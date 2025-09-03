/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AddReviewPayload {
  name: string;
  designation: string;
  company: string;
  review: string;
  imageUrl: string;
}

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1"
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "/reviews",
      providesTags: ["Reviews"],
    }),
    addReview: builder.mutation<any, AddReviewPayload>({
      query: (payload) => ({
        url: "/reviews",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Reviews"],
    }),
    updateReview: builder.mutation<any, { id: string; payload: AddReviewPayload }>({
      query: ({ id, payload }) => ({
        url: `/reviews/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id: string) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
