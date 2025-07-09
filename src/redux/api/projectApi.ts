import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Adjust path as needed

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://hughes-contractors-pty-ltd-backend.vercel.app/api/projects",
    }),
    tagTypes: ["Projects"],
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => "/",
            providesTags: ["Projects"],
        }),
        addProject: builder.mutation({
            query: (body) => ({
                url: "/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Projects"],
        }),
        updateProject: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Projects"],
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Projects"],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi;
