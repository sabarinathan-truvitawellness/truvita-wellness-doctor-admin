import React from "react";
import {
  Blood,
  DoubleLine,
  Heartrate,
  Message,
  OnlyPhone,
  OxygenLevel,
  Pill,
  Temparature,
  Video,
} from "../../utils/common/svgIcons";
import { Link } from "react-router-dom";
import "./patientRecords.scss";
import dummyAvatatr from '../../Assets/images/header/profile-image-avatar.png'

export const PatientRecordsOverview = () => {
  const patientListData = [
    {
      patientId: "1",
      imageUrl: dummyAvatatr,
      age: "35",
      gender: "Male",
      name: "John Doe",
    },
    {
      patientId: "2",
      imageUrl: dummyAvatatr,
      age: "29",
      gender: "Female",
      name: "Jane Smith",
    },
    {
        patientId: "2",
        imageUrl: dummyAvatatr,
        age: "29",
        gender: "Female",
        name: "Jane Smith",
      },
      {
        patientId: "2",
        imageUrl: dummyAvatatr,
        age: "29",
        gender: "Female",
        name: "Jane Smith",
      },
      {
        patientId: "2",
        imageUrl: dummyAvatatr,
        age: "29",
        gender: "Female",
        name: "Jane Smith",
      },
      {
        patientId: "2",
        imageUrl: dummyAvatatr,
        age: "29",
        gender: "Female",
        name: "Jane Smith",
      },
  ];

  const recentAppoinemtData = [
    {
      doctorImageUrl: "https://via.placeholder.com/50",
      doctorName: "Dr. Alice",
    },
    {
      doctorImageUrl: "https://via.placeholder.com/50",
      doctorName: "Dr. Bob",
    },
  ];

  const pillRemainderData = [
    { pillName: "Paracetamol 200", instructions: "After Meal" },
    { pillName: "Ibuprofen 400", instructions: "Before Meal" },
  ];

  const prescriptionListData = [
    {
      imageUrl: "https://via.placeholder.com/50",
      doctorName: "Dr. Alice",
      speciality: "Cardiologist",
      date: "2024-11-29",
      time: "10:00 AM",
    },
    {
      imageUrl: "https://via.placeholder.com/50",
      doctorName: "Dr. Bob",
      speciality: "Dermatologist",
      date: "2024-11-28",
      time: "3:00 PM",
    },
  ];

  const patientName = "John Doe";
  const age = "35";
  const gender = "Male";
  const tierType = "Gold";

  return (
    <div className="patient-records-overview-container">
      <div className="patient-record-overview-wrapper">
        <div className="patient-list-container">
          {patientListData.map((res) => (
            <div key={res.patientId} className="patient-short-card">
              <div className="patient-shor-card-wrapper">
                <div className="image-wrapper">
                  <img src={res.imageUrl} alt="Patient" />
                </div>
                <div className="patient-info-content">
                  <p>{res.name}</p>
                  <p>{res.age} yrs, {res.gender}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="patient-overview-container">
          <div className="patient-overview-wrapper">
            <div className="patient-overview-info-content">
              <div className="info-card">
                <div className="image-wrapper">
                  <img src={dummyAvatatr} alt="Patient" />
                </div>
                <div className="patient-personal-info">
                  <p>{patientName}</p>
                  <p>{age} yrs, {gender}</p>
                </div>
                
              </div>
              <div className="tier-type-wrapper">
                  <p>{tierType}</p>
                </div>
              <div className="icon-wrapper-container">
                <div className="icon-wrapper"><OnlyPhone /></div>
                <div className="icon-wrapper"><Message /></div>
                <div className="icon-wrapper"><Video /></div>
              </div>
            </div>

            <div className="patient-health-info-container">
              <div className="title-section">
                <p>Health Metrics</p>
                <Link to="#">View All &gt;</Link>
              </div>
              <div className="health-monitor-info-cards">
                <div className="health-card">
                    <div className="title-section"> <div className="icon-wrapper"><Heartrate /></div> <span>Heart Rate</span></div>
                 
                  <p>89 BPM</p>
                </div>
                <div className="health-card">
                    <div className="title-section"><div className="icon-wrapper"><Blood /></div> <span>Blood Pressure</span></div>
                
                  <p>120/80</p>
                </div>
                <div className="health-card">
                    <div className="title-section"> <div className="icon-wrapper"><Temparature /></div>  <span>Temperature</span></div>
               
                  <p>98°F</p>
                </div>
                <div className="health-card">
                    <div className="title-section"><div className="icon-wrapper"><OxygenLevel /></div>  <span>Oxygen Level</span></div>
                
                  <p>94%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="patient-chief-data-container">
            <div className="patient-recent-appointments-cards">
              <p>Recent Activities</p>
              {recentAppoinemtData.map((res, index) => (
                <div key={index} className="appointment-short-card">
                  <div className="appointment-short-card-wrapper">
                    <div className="image-wrapper">
                      <img src={res.doctorImageUrl} alt="Doctor" />
                    </div>
                    <div className="doctor-name">
                      <p>{res.doctorName}</p>
                    </div>
                    <div className="overview-btn">
                      <DoubleLine />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pill-remainder-info-cards">
              <p>Pill Reminder</p>
              {pillRemainderData.map((res, index) => (
                <div key={index} className="pill-remainder-card-container">
                  <div className="pill-card-wrapper">
                    <div className="icon-wrapper"><Pill /></div>
                    <div className="pill-info">
                      <p>{res.pillName}</p>
                      <p>{res.instructions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="prescription-info-cards">
              <p>Prescriptions</p>
              {prescriptionListData.map((res, index) => (
                <div key={index} className="prescription-card-container">
                  <div className="prescription-card-wrapper">
                    <div className="image-wrapper">
                      <img src={res.imageUrl} alt="Prescription" />
                    </div>
                    <div className="doctor-name">
                      <p>{res.doctorName}</p>
                      <p>{res.speciality}</p>
                      <p>{res.date}, {res.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
