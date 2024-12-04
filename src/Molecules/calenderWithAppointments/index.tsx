import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { DashBoardCalender } from "../../Atom";
import { Calender } from "../../utils/common/svgIcons";
import "./calederWithAppointments.scss";
import dummyProfile from '../../Assets/images/header/profile-avatar-xxl.png'

export const CalenderWithAppointment = () => {
  const appointmentData = [
    {
      imageUrl: dummyProfile,
      patientName: "John Doe",
      age: "35",
      appointmentTime: "10:30 AM",
      appointmentDate: "Nov 30, 2024",
      link: "#",
      gender: "Male",
    },
    {
      imageUrl: dummyProfile,
      patientName: "Jane Smith",
      age: "28",
      appointmentTime: "12:00 PM",
      appointmentDate: "Nov 30, 2024",
      link: "#",
      gender: "Female",
    },
    {
      imageUrl: dummyProfile,
      patientName: "Emily Johnson",
      age: "40",
      appointmentTime: "02:00 PM",
      appointmentDate: "Nov 30, 2024",
      link: "#",
      gender: "Female",
    },
    {
      imageUrl: dummyProfile,
      patientName: "Chris Brown",
      age: "50",
      appointmentTime: "03:30 PM",
      appointmentDate: "Nov 30, 2024",
      link: "#",
      gender: "Male",
    },
    {
      imageUrl: dummyProfile,
      patientName: "Sophia Davis",
      age: "22",
      appointmentTime: "04:45 PM",
      appointmentDate: "Nov 30, 2024",
      link: "#",
      gender: "Female",
    },
  ];

  return (
    <div className="cal-app-container">
      <div className="cal-app-wrapper">
        <DashBoardCalender />
      </div>

      <div className="upcoming-appointments-list">
        <p className="section-title">Upcoming Appointments</p>
        <div className="appointments-list-container">
          {appointmentData.map((res, index) => (
            <div className="app-list-card-container" key={index}>
              <div className="app-list-card-wrapper">
                <div className="card-info">
                  <img src={res.imageUrl} alt="patient-profile" />
                  <div className="patient-info">
                    <span className="patient-name">{res.patientName}</span>
                    <span className="patient-details">
                      {res.age} | {res.gender}
                    </span>
                  </div>
                  <div className="appointment-time-date">
                    <span className="appointment-date">
                      {res.appointmentDate}
                    </span>
                    <span className="appointment-time">
                      {res.appointmentTime}
                    </span>
                  </div>
                  <div className="appointment-btn">
                    <Calender />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
