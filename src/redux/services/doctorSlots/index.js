import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Ensure `/react` is imported
import { config } from "../../../config";

export const DoctorSlot = createApi({
  reducerPath: "DoctorApiHandler",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl.BaseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["CreateSlot"],
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (payload) => ({
        url: `doctor/availability/${payload.userId}/`,
        method: "POST",
        body: payload.slotData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["CreateSlot"], // Use `invalidatesTags` to signal cache invalidation
    }),
    getSlotData: builder.query({
      query: (payload) => ({
        url: `doctor/availability/${payload}/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    editSlot: builder.mutation({
      query: (payload) => ({
        url: `doctor/availability/${payload.userId}/`,
        method: "PATCH",
        body: payload.slotData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["CreateSlot"],
    }),
  }),
});

// Export the mutation hook
export const {
  useCreateSlotMutation,
  useGetSlotDataQuery,
  useEditSlotMutation,
} = DoctorSlot;
