import React from "react";
import { AppRoutes } from ".";
import {
  Appointments,
  CreateTicket,
  Home,
  PaymentHistory,
  Prescription,
  RegisterFamily,
  Settings,
  TicketChat,
  PreacriptionOverView,
  PatientRecordList,
  PatientRecordsOverview,
  EarningWallet,
  AppointmentRequest,
  AppointmentOverview,
  DoctorOnboardingProgress,
  DoctorVerificationLanding,
  DocotorOnBoardingForm,
  CreateSlots,
} from "../Organism";
import { Inbox } from "../Organism/inbox";

export const PrivatePages = [
  {
    path: AppRoutes.home,
    element: <Home />,
  },
  {
    path: AppRoutes.settings,
    element: <Settings />,
  },
  {
    path: AppRoutes.appointments,
    element: <Appointments />,
  },
  {
    path: AppRoutes.registerFamily,
    element: <RegisterFamily />,
  },
  {
    path: AppRoutes.paymentHistory,
    element: <PaymentHistory />,
  },
  {
    path: AppRoutes.createTicket,
    element: <CreateTicket />,
  },
  {
    path: AppRoutes.ticketChat,
    element: <TicketChat />,
  },
  {
    path: AppRoutes.inbox,
    element: <Inbox/>
  },
  {
    path:AppRoutes.prescription,
    element:<Prescription/>
  },
  {
    path:AppRoutes.prescriptionOverView,
    element: <PreacriptionOverView/>
  },
  {
    path:AppRoutes.patientRecods,
    element: <PatientRecordList/>
  },
  {
    path:AppRoutes.patientRecorOverview,
    element: <PatientRecordsOverview/>

  },
  {
    path:AppRoutes.earningWallet,
    element: <EarningWallet/>
  },
  {
    path:AppRoutes.appointmentRequest,
    element: <AppointmentRequest/>
  },
  {
    path: AppRoutes.appointmentOverview,
    element:<AppointmentOverview/>
  },
  {
    path: AppRoutes.doctorOnBoardingProgress,
    element: <DoctorOnboardingProgress/>
  },
  {
    path: AppRoutes.doctorVerificationLanding,
    element: <DoctorVerificationLanding/> 
  },
  {
    path:AppRoutes.doctorOnboardingForm,
    element: <DocotorOnBoardingForm/>
  },
  {
    path: AppRoutes.slotMaker,
    element: <CreateSlots/>
  },
  
];
