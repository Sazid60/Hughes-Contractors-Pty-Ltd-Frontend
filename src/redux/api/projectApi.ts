/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hughes-contractors-pty-ltd.vercel.app/api/v1",
  }),
  tagTypes: ["Projects", "Equipments", "Labours", "Terms", "Certifications"],
  endpoints: (builder) => ({
    // ================= Projects =================
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

    // ================= Equipments =================
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

    // ================= Labours =================
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

    // ================= Terms PDF =================
    getTerms: builder.query({
      query: () => "/terms",
      providesTags: ["Terms"],
    }),
    uploadTerms: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/terms",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Terms"],
    }),
    deleteTerms: builder.mutation<void, void>({
      query: () => ({
        url: "/terms",
        method: "DELETE",
      }),
      invalidatesTags: ["Terms"],
    }),

    // ================= Certifications =================
    getCertifications: builder.query({
      query: () => "/certifications",
      providesTags: ["Certifications"],
    }),
    addCertification: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/certifications",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Certifications"],
    }),
    deleteCertification: builder.mutation({
      query: (id: string) => ({
        url: `/certifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Certifications"],
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

  // Terms
  useGetTermsQuery,
  useUploadTermsMutation,
  useDeleteTermsMutation,

  // Certifications
  useGetCertificationsQuery,
  useAddCertificationMutation,
  useDeleteCertificationMutation,
} = projectApi;
