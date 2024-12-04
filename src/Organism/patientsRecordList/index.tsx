import React from "react";
import { Download, LocationPin, Pill } from "../../utils/common/svgIcons";
import { Button } from "../../Atom";
import "./patinetsRecordList.scss";
import dummyAvartat from '../../Assets/images/header/profile-avatar-xxl.png'

export const PatientRecordList = () => {
  const patientRecordData = [
    {
      patientName: "John Doe",
      imageUrl: dummyAvartat,
      age: 30,
      gender: "Male",
      location: "Online",
      symptom: "Fever",
      date: "2024-12-01",
      time: "10:00 AM",
      patientLocation:"Texas"
    },
    {
      patientName: "Jane Smith",
      imageUrl: dummyAvartat,
      age: 28,
      gender: "Female",
      location: "Ai Booth",
      symptom: "Headache",
      date: "2024-12-02",
      time: "11:30 AM",
      patientLocation:"Texas"
    },
    // Add 8 more dummy records
    {
      patientName: "Chris Evans",
      imageUrl: dummyAvartat,
      age: 35,
      gender: "Male",
      location: "Online",
      symptom: "Cough",
      date: "2024-12-03",
      time: "12:00 PM",
      patientLocation:"Texas"
    },
    {
      patientName: "Emma Watson",
      imageUrl: dummyAvartat,
      age: 33,
      gender: "Female",
      location: "Ai Booth",
      symptom: "Fatigue",
      date: "2024-12-04",
      time: "2:00 PM",
      patientLocation:"Texas"
    },
    {
      patientName: "Will Smith",
      imageUrl: dummyAvartat,
      age: 45,
      gender: "Male",
      location: "Online",
      symptom: "Back Pain",
      date: "2024-12-05",
      time: "3:00 PM",
      patientLocation:"Texas"
    },
    {
      patientName: "Mia Lee",
      imageUrl: dummyAvartat,
      age: 27,
      gender: "Female",
      location: "Ai Booth",
      symptom: "Migraine",
      date: "2024-12-06",
      time: "4:30 PM",
      patientLocation:"Texas"
    },
    {
      patientName: "Tom Hardy",
      imageUrl: dummyAvartat,
      age: 40,
      gender: "Male",
      location: "Online",
      symptom: "Cold",
      date: "2024-12-07",
      time: "9:00 AM",
      patientLocation:"Texas"
    },
    {
      patientName: "Sophia Loren",
      imageUrl: dummyAvartat,
      age: 50,
      gender: "Female",
      location: "Ai Booth",
      symptom: "Joint Pain",
      date: "2024-12-08",
      time: "10:30 AM",
      patientLocation:"Texas"
    },
    {
      patientName: "Henry Cavill",
      imageUrl: dummyAvartat,
      age: 37,
      gender: "Male",
      location: "Online",
      symptom: "Dizziness",
      date: "2024-12-09",
      time: "11:00 AM",
      patientLocation:"Texas"
    },
    {
      patientName: "Scarlett Johansson",
      imageUrl: dummyAvartat,
      age: 35,
      gender: "Female",
      location: "Ai Booth",
      symptom: "Allergies",
      date: "2024-12-10",
      time: "1:00 PM",
      patientLocation:"Texas"
    },
  ];

  return (
    <div className="patients-record-list-container">
      <div className="patients-record-list-wrapper">
        {patientRecordData.map((res, index) => (
          <div className="patients-short-card-container" key={index}>
            <div className="patients-card-wrapper">
              <div className="patients-info">
                <div className="patients-image">
                <img src={res.imageUrl} alt="patient" />
                </div>
                <div className="patient-info-list">
                  <p className="patient-name">{res.patientName}</p>
                  <p className="patient-age-gender">
                    {res.age} yrs • {res.gender}
                  </p>
                  <p className="patient-location"><LocationPin/>{res.patientLocation}</p>
                </div>
               
              </div>

              <div className="patients-symptoms">
                  <span>{res.symptom}</span>
                </div>
                <div className="consultation-location">
                  <span>
                    {res.location === "Ai Booth"
                      ? "Ai Booth"
                      : res.location === "Online"
                      ? "Online"
                      : ""}
                  </span>
                </div>
                <div className="appointment-timing">
                  <h3>Appointment Timing</h3>
                  <p>{res.date}</p>
                  <p>{res.time}</p>
                </div>
                <div className="icon-section">
                  <div className="prescription-btn">
                    <Pill />
                  </div>
                  <div className="download-btn">
                    <Download />
                  </div>
                  <div className="view-details-btn">
                    <Button
                      buttonText="View Details"
                      externalClassName="view-btn"
                    />
                  </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
