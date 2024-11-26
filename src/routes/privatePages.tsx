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
  PreacriptionOverView
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
  }
];
