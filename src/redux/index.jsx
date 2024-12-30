import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AppointmentApi, AuthAPI,DoctorSlot,OtpVerify, Profile, verificationForm } from "./services";
import React from "react";
import {authReducer,otpSlice} from './slices';


const ReduxStore = configureStore({
    reducer:{
        [AuthAPI.reducerPath] : AuthAPI.reducer,
        [OtpVerify.reducerPath]: OtpVerify.reducer,
        [Profile.reducerPath]: Profile.reducer,
        [verificationForm.reducerPath] : verificationForm.reducer,
        [DoctorSlot.reducerPath]: DoctorSlot.reducer,
        [AppointmentApi.reducerPath] : AppointmentApi.reducer,
        auth: authReducer,
        otp: otpSlice,
    },
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            AuthAPI.middleware,
            OtpVerify.middleware,
            Profile.middleware,
            verificationForm.middleware,
            DoctorSlot.middleware,
            AppointmentApi.middleware
        )
});

export const AppRedux = ({children}) => {
    return <Provider store={ReduxStore}>
        {children}
    </Provider>
}