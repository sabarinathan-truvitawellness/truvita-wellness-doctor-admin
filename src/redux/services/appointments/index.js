import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Ensure `/react` is imported
import { config } from "../../../config";

export const AppointmentApi = createApi({
  reducerPath: "appointmentApi",
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
  tagTypes: ["Appointment"],
  endpoints: (builder) => ({
 
    getAppointmentRequestData: builder.query({
      query: (payload) => ({
        url: `/doctor/appointment_upcoming/${payload.doctorId}/?status=${payload.status}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    approveAppointment: builder.mutation({
        query: (payload) => ({
          url: `/doctor/appointment/accept-api/${payload}/`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),

      appointmentList: builder.query({
        query: (payload) => ({
          url: `/doctor/appointment_upcoming/${payload.doctorId}/?status=${payload.status}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),

  
  }),
});

// Export the mutation hook
export const {
useGetAppointmentRequestDataQuery,
useApproveAppointmentMutation,
useAppointmentListQuery
} = AppointmentApi;
