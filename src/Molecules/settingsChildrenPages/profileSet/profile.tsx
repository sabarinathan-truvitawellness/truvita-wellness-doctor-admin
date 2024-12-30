import React, { useEffect, useState } from "react";
import profileAvatar from "../../../Assets/images/header/dummy-doctor-profile-2.png";
import {
  Editpen,
  PatientsAttended,
  Stethescope,
  TotalAppointment,
} from "../../../utils/common/svgIcons";
import "./profile.scss";
import { useProfileDataQuery } from "../../../redux/services/profile";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/slices/auth";
import dayjs from "dayjs";

export const ProfileSetting = () => {
  const { userData } = useSelector((state: RootState) => state.auth);

  const editInfo = () => {};

  const calculateAge = (birthDate: string) => {
    const today = dayjs();
    const birthDay = dayjs(birthDate);
    return today.diff(birthDay, "year");
  };

  const cardData = [
    {
      cardIcon: <TotalAppointment />,
      cardTitle: "Total Appointments",
      detailedAmt: "247",
    },
    {
      cardIcon: <PatientsAttended />,
      cardTitle: "Patients Attended",
      detailedAmt: "198",
    },
  ];

  return (
    <div className="profile-settings-container">
      <div className="profile-setting-wrapper">
        <div className="colum-one">
          <div className="profile-row">
            <div className="img-section">
              <img src={userData.profile_picture_url}></img>
              <div className="img-edit">
                <Editpen />
              </div>
            </div>
            <div className="profile-info-content">
              <h2>{`${userData?.first_name} ${userData.last_name}`}</h2>
              <p>{`${calculateAge(userData.date_of_birth)}
              ${
                userData.gender
              }`}</p>
              <p>Doctor</p>
            </div>
            <div className="profile-doctor-experience">
              <div className="experience-card-wrapper">
                <div className="icon-wrapper">
                  <Stethescope />
                </div>
                <div className="experience-contents">
                  <p>Primary Care</p>
                  <p>12 Years Experience</p>
                  <p>Medicore Clinic</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <div className="sub-title-section">
              {" "}
              <h2>Personal Information</h2>{" "}
              <div className="edit-info-btn" onClick={editInfo}>
                Edit <Editpen />
              </div>
            </div>

            <div className="info-wrapper">
              <div className="info-content">
                <h3>First Name</h3>
                <p>{userData?.first_name}</p>
              </div>

              <div className="info-content">
                <h3>Last Name</h3>
                <p>{userData.last_name}</p>
              </div>
            </div>
            <div className="info-wrapper">
              <div className="info-content">
                <h3>Email</h3>
                <p>{userData?.email}</p>
              </div>

              <div className="info-content">
                <h3>Phone</h3>
                <p>{userData?.phone_number}</p>
              </div>
            </div>
            <div className="info-wrapper">
             

              <div className="info-content">
                <h3>Gender</h3>
                <p>{userData.gender}</p>
              </div>
            </div>
          </div>

          <div className="info-section">
            <div className="sub-title-section">
              {" "}
              <h2>About Yourself</h2>{" "}
              <div className="edit-info-btn" onClick={editInfo}>
                Edit <Editpen />
              </div>
            </div>

            {/* <div className="info-wrapper">
              <div className="info-content">
                <h3>Country</h3>
                <p>United States</p>
              </div>

              <div className="info-content">
                <h3>City/Sate</h3>
                <p>Leeds, East London</p>
              </div>
            </div> */}
            {/* <div className="info-wrapper">
              <div className="info-content">
                <h3>Postal Code</h3>
                <p>ERT 2356</p>
              </div>
            </div> */}
          </div>
        </div>
        <div className="colum-two">
          <div className="doctor-profile-cards-container">
            {cardData.map((res) => {
              return (
                <div className="doctor-profile-card-wrapper">
                  <div className="doctor-profile-card-row-1">
                    <div className="icon-wrapper">{res.cardIcon}</div>
                    <div className="card-title">
                      <span>{res.cardTitle}</span>
                    </div>
                  </div>
                  <div className="doctor-profile-detail-amt">
                    <span>{res.detailedAmt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
