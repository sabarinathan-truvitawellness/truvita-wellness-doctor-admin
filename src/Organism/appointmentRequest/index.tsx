import React from "react";
import { Appointment, CancelButton, Tick, TotalAppointment } from "../../utils/common/svgIcons";
import "./appointmentRequest.scss";
import dummyAvatar from '../../Assets/images/header/profile-image-avatar.png'

const dummyData = [
  {
    patientName: "John Doe",
    age: "30",
    yrs: "yrs",
    gender: "Male",
    location: "New York",
    symptom: "Fever, Cough",
    placeOfVisit: "In-Patient",
    preferredDate: "11/12/2024",
    preferredTime: "02:40 - 03:00",
  },
  {
    patientName: "Jane Smith",
    age: "25",
    yrs: "yrs",
    gender: "Female",
    location: "Los Angeles",
    symptom: "Headache, Nausea",
    placeOfVisit: "AI Booth",
    preferredDate: "11/13/2024",
    preferredTime: "03:00 - 03:20",
  },
  {
    patientName: "Jane Smith",
    age: "25",
    yrs: "yrs",
    gender: "Female",
    location: "Los Angeles",
    symptom: "Headache, Nausea",
    placeOfVisit: "AI Booth",
    preferredDate: "11/13/2024",
    preferredTime: "03:00 - 03:20",
  },
  {
    patientName: "Jane Smith",
    age: "25",
    yrs: "yrs",
    gender: "Female",
    location: "Los Angeles",
    symptom: "Headache, Nausea",
    placeOfVisit: "AI Booth",
    preferredDate: "11/13/2024",
    preferredTime: "03:00 - 03:20",
  },
  {
    patientName: "Jane Smith",
    age: "25",
    yrs: "yrs",
    gender: "Female",
    location: "Los Angeles",
    symptom: "Headache, Nausea",
    placeOfVisit: "AI Booth",
    preferredDate: "11/13/2024",
    preferredTime: "03:00 - 03:20",
  },
  {
    patientName: "Jane Smith",
    age: "25",
    yrs: "yrs",
    gender: "Female",
    location: "Los Angeles",
    symptom: "Headache, Nausea",
    placeOfVisit: "AI Booth",
    preferredDate: "11/13/2024",
    preferredTime: "03:00 - 03:20",
  },
  {
    patientName: "Jane Smith",
    age: "25",
    yrs: "yrs",
    gender: "Female",
    location: "Los Angeles",
    symptom: "Headache, Nausea",
    placeOfVisit: "AI Booth",
    preferredDate: "11/13/2024",
    preferredTime: "03:00 - 03:20",
  },
];

export const AppointmentRequest = () => {
  return (
    <div className="app-request-container">
      <div className="app-request-wrapper">
        {dummyData.map((data, index) => (
          <div className="app-request-record-card" key={index}>
            <div className="patient-info-wrapper">
            <div className="image-section">
              <img src={dummyAvatar} alt="Patient" />
            </div>
            <div className="patient-info">
              <p>{data.patientName}</p>
              <p>
                {data.age} {data.yrs}, {data.gender}
              </p>
              <p>{data.location}</p>
            </div>
            </div>
            
            <div className="symptom-info">
              <p>{data.symptom}</p>
            </div>
            <div className="place-of-visit">
              <p>{data.placeOfVisit}</p>
            </div>
            <div className="patient-preferred-date">
              <p>{data.preferredDate}</p>
            </div>
            <div className="patient-preferred-time">
              <p>{data.preferredTime}</p>
            </div>
            <div className="icon-container">
              <div className="icon-wrapper-calender">
                <TotalAppointment/>
              </div>
              <div className="icon-wrapper-cancel">
                <CancelButton />
              </div>
              <div className="icon-wrapper-tick">
                <Tick />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
