import React from "react";
import { Calender, CancelButton, Tick } from "../../utils/common/svgIcons";
import "./patientRecord.scss";
import dummyProfile from '../../Assets/images/header/profile-avatar-xxl.png'

type PatientRequest = {
  date: string;
  day: string;
  imageUrl: string;
  patientUrl: string;
  age: string;
  gender: string;
  link: string;
  name: string;
};

export const PatientsRecord: React.FC = () => {
  const patientsRequest: PatientRequest[] = [
    {
      date: "27",
      day: "Mon",
      imageUrl: dummyProfile,
      patientUrl: "/patient/1",
      age: "32",
      gender: "M",
      link: "/details/1",
      name: "John Doe",
    },
    {
      name: "Jane Smith",
      date: "28",
      day: "Tue",
      imageUrl: dummyProfile,
      patientUrl: "/patient/2",
      age: "29",
      gender: "F",
      link: "/details/2",
    },
  ];

  return (
    <div className="patient-recor-super-container">
    <div className="patients-record-container">
      <h2 className="pr-title">Patient Requests</h2>
      <div className="patients-record-wrapper">
        {patientsRequest.map((res, index) => (
          <div className="pr-short-card-container" key={index}>
            <div className="pr-short-card-wrapper">
              <div className="pr-date">
                <time dateTime={res.date}>
                  <span className="day">{res.day}</span>
                  <span className="date">{res.date}</span>
                </time>
              </div>
              <div className="flex">
              <img
                src={res.imageUrl}
                alt={`${res.name}'s profile`}
                className="patient-image"
              />
              <div className="patient-info">
                <h3>{res.name || "Unknown Patient"}</h3>
                <p>{`${res.age || "N/A"} | ${res.gender || "N/A"}`}</p>
              </div>
              </div>
              <div className="btn-section">
                <button
                  className="action-btn calender-btn"
                  title="Schedule"
                  onClick={() => console.log("Calendar clicked for", res.name)}
                >
                  <Calender />
                </button>
                <button
                  className="action-btn cancel-btn"
                  title="Reject"
                  onClick={() => console.log("Rejected", res.name)}
                >
                  <CancelButton />
                </button>
                <button
                  className="action-btn tick-btn"
                  title="Accept"
                  onClick={() => console.log("Accepted", res.name)}
                >
                  <Tick />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
