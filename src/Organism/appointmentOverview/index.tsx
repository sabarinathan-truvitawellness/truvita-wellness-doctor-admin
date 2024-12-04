import React from "react";
import {
  Calender,
  ClockTimer,
  Doctor,
  DoubleLine,
  LocationPin,
  Message,
  OnlyPhone,
  TotalAppointment,
  Video,
} from "../../utils/common/svgIcons";
import { Button, TextBox } from "../../Atom";
import "./appointmentOverview.scss";
import dummyAvarathar from '../../Assets/images/header/profile-image-avatar.png';

// Dummy data for previous consultations
const cardData = [
  {
    doctorName: "Paul Levinson",
    specialization: "Cardiology",
    consultation: "Video Consultation",
    fromTime: "10:30",
    toTime: "11:00",
    location: "Arizona, United States",
    yearsExperience: 12,
  },
  {
    doctorName: "Sara Smith",
    specialization: "Dermatology",
    consultation: "Audio Consultation",
    fromTime: "12:30",
    toTime: "1:00",
    location: "California, United States",
    yearsExperience: 8,
  },
];

export const AppointmentOverview = () => {
  const onViewDetails = () => {
    alert("View Details Clicked");
  };

  return (
    <div className="appointment-overview-container">
      <div className="appointment-overview-wrapper">
        <div className="app-overiew-row-1-container">
          <div className="app-row-1-wrapper">
            {/* Patient Information Section */}
            <div className="app-row-1-col-1">
              <div className="patient-info">
                <div className="image-wrapper">
                  <img src={dummyAvarathar} alt="Patient" />
                </div>
                <div className="info-content">
                  <p>Paul Levinson</p>
                  <p>21, Male</p>
                  <p>
                    <span>
                      <LocationPin />
                    </span>{" "}
                    Arizona, United States
                  </p>
                </div>
                <div className="tier-type">
                  <p>Free user</p>
                </div>
                <div className="icon-container">
                  <div className="icon-wrapper">
                    <OnlyPhone />
                  </div>
                  <div className="icon-wrapper">
                    <Message />
                  </div>
                  <div className="icon-wrapper">
                    <Video />
                  </div>
                </div>
              </div>
            </div>

            <div className="verical-line"></div>

            {/* Appointment Details Section */}
            <div className="app-row-1-col-2">
              <div className="row-header-section">
                <div className="row-header-wrapper">
                  <div className="appointment-timing">
                    <div className="t-row-1">
                    <ClockTimer />
                    <span>in 12hr</span>
                    </div>
                    <p>10:30 - 11:00</p>
                  </div>
                  <div className="appointment-consultation-type">
                    <p>
                      <Doctor />
                      <span>Doctor Consultation</span>
                    </p>
                    <p>
                      Diagnosis: <span>Chest Pain</span>
                    </p>
                  </div>
                  <div className="appointment-date">
                    <p>24/07/22</p>
                  </div>
                </div>
              </div>
              <div className="appointment-billing-card-container">
                <div className="billing-card-wrapper">
                  <p className="billing-card-title">Billings and Payment</p>
                  <div className="consultation-fee-wrapper">
                    <div className="consultation-fees">
                      <p>Consultation Fee</p>
                      <p>$20</p>
                    </div>
                    <div className="tax-chargees">
                      <p>Tax Charges</p>
                      <p>$0</p>
                    </div>
                    <div className="total-amount">
                      <p>
                        Total Paid Amount <span>(Received)</span>
                      </p>
                      <p>$20</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="verical-line"></div>

            {/* Notes Section */}
            <div className="app-row-1-col-3">
              <div className="col-3-wrapper">
                <div className="view-card">
                  <Calender />
                  <p>Calendar View</p>
                </div>
                <div className="view-card">
                  <TotalAppointment />
                  <p>Reschedule</p>
                </div>
              </div>
              <div className="notes-setion">
                <p>Write Notes</p>
                <TextBox
                  name="notes"
                  value=""
                  onchange={(value: string) =>
                    console.log("Notes Updated:", value)
                  }
                />
                <Button buttonText="Add Notes" externalClassName="add-notes" />
              </div>
            </div>
          </div>
        </div>

        {/* Previous Consultations Section */}
       
        <div className="app-row-2-wrapper">
          <p>Previous Consultations</p>
          {cardData.map((data, index) => (
            <div
              className="apointment-overview-card-warpper"
              key={`consultation-${index}`}
            >
              <div className="list-col-2">
                <div className="col-2-wrapper">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Doctor"
                  />
                  <div className="col-2-content">
                    <h2>{data.doctorName}</h2>
                    <p className="cp-1">
                      {data.specialization}{" "}
                      <span>{data.yearsExperience} Years Of Experience</span>
                    </p>
                    <p className="cp-2">
                      <span>
                        <LocationPin />
                      </span>{" "}
                      {data.location}
                    </p>
                  </div>
                </div>
              </div>
              <div className="list-col-3">
                <p>{data.consultation}</p>
              </div>
              <div className="list-col-4">
                <p className="ap-1">{`${data.fromTime} - ${data.toTime}`}</p>
                <p className="ap-2">Appointment Timing</p>
              </div>
              <div className="list-col-5">
                <div className="icon-wrapper">
                  <DoubleLine />
                </div>
              </div>
              <div className="list-col-6">
                <Button
                  buttonText="View Details"
                  externalClassName="appointment-view"
                  onClick={onViewDetails}
                />
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

  );
};
