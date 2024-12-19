import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";

export const verificationForm = createApi({
  reducerPath: "VerificationStepperForm",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl.BaseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      // Get the token from local storage
      const token = localStorage.getItem("authToken");

      if (token) {
        // Set the Authorization header
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["VerificationStepperForm"],
  endpoints: (builder) => ({
    verficationStepOne: builder.query({
      query: (payload) => ({
        url: `doctor/doctor-verfication-setp1/${payload}/`,
        credentials: "include",
        method: "GET",
      }),
      providesTags: ["VerificationStepperForm"],
    }),

    verificationStepOnePost: builder.mutation({
      query: (payload) => ({
        url: `doctor/doctor-verfication-setp1/${payload.userId}/`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload.stepOneData, // Payload here should include other properties except `userId` for the body
      }),
    }),

    verificationStepTwo: builder.query({
      query: (payload) => ({
        url: `doctor/doctor-verfication-setp2/${payload}/`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        providesTags: ["VerificationStepperForm"],
      }),
    }),

    verificationStepTwoPost: builder.mutation({
      query: (payload) => ({
        url: `doctor/doctor-verfication-setp2/${payload.userId}/`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload.stepTwoData,
        providesTags: ["VerificationStepperForm"],
      }),
    }),

    verificationStepThree: builder.query({
      query: (payload) => ({
        url: `doctor/doctor-verfication-setp3/${payload}/`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    verificationStepThreePost: builder.mutation({
      query: (payload) => ({
        url: `doctor/doctor-verfication-setp3/${payload.userId}/`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload.stepThreeData,
      }),
    }),

    verificationStatus: builder.query({
      query: (paylod) => ({
        url: `doctor/doctor-resume-verfication/${paylod}/`,
        method: "GET",
        credentials: "include",
        headers: {
          "content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useVerficationStepOneQuery,
  useVerificationStepOnePostMutation,
  useVerificationStepTwoQuery,
  useVerificationStepTwoPostMutation,
  useVerificationStepThreeQuery,
  useVerificationStepThreePostMutation,
  useVerificationStatusQuery
} = verificationForm;
