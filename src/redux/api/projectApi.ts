import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://hughes-contractors-pty-ltd-backend.vercel.app/api/v1",
    }),
    tagTypes: ["Projects", "Equipments", "Labours"],
    endpoints: (builder) => ({
        // -------------------- Projects --------------------
        getProjects: builder.query({
            query: () => "/projects",
            providesTags: ["Projects"],
        }),
        getProjectById: builder.query({
            query: (id: string) => `/projects/${id}`,
            providesTags: ["Projects"],
        }),

        addProject: builder.mutation({
            query: (body) => ({
                url: "/projects",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Projects"],
        }),
        updateProject: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/projects/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Projects"],
        }),
        deleteProject: builder.mutation({
            query: (id: string) => ({
                url: `/projects/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Projects"],
        }),

        // -------------------- Equipments --------------------
        getEquipments: builder.query({
            query: () => "/equipments",
            providesTags: ["Equipments"],
        }),
        addEquipment: builder.mutation({
            query: (body) => ({
                url: "/equipments",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Equipments"],
        }),
        updateEquipment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/equipments/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Equipments"],
        }),
        deleteEquipment: builder.mutation({
            query: (id: string) => ({
                url: `/equipments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Equipments"],
        }),
        // -------------------- Labours --------------------
        getLabours: builder.query({
            query: () => "/labours",
            providesTags: ["Labours"],
        }),
        addLabour: builder.mutation({
            query: (body) => ({
                url: "/labours",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Labours"],
        }),
        updateLabour: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/labours/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Labours"],
        }),
        deleteLabour: builder.mutation({
            query: (id: string) => ({
                url: `/labours/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Labours"],
        }),
    }),
});

export const {
    // Projects
    useGetProjectsQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useGetProjectByIdQuery,

    // Equipments
    useGetEquipmentsQuery,
    useAddEquipmentMutation,
    useUpdateEquipmentMutation,
    useDeleteEquipmentMutation,

    // Labours
    useGetLaboursQuery,
    useAddLabourMutation,
    useUpdateLabourMutation,
    useDeleteLabourMutation,
} = projectApi;
