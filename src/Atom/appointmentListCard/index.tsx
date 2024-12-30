import React from "react";
import "./appointmentListCard.scss";
import {
  Appointment,
  ClockTimer,
  Doctor,
  LocationPin,
  Message,
  OnlyPhone,
  Video,
} from "../../utils/common/svgIcons";
import { Button } from "../button";
import doctorDummyImage from '../../Assets/images/header/profile-image-avatar.png';
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes";

interface InputProps {
  doctorName: string;
  specialization: string;
  startTime: string;
  fromTime: string;
  toTime: string;
  onViewDetails: () => void;
  consultation: string;
  location:string;
  profilePicture:string
}

export const AppointmentListCard: React.FC<InputProps> = ({
  doctorName,
  specialization,
  startTime,
  fromTime,
  toTime,
  consultation,
  onViewDetails,
  profilePicture,
  location
}) => {
  return (
    <Link to={AppRoutes.patientRecorOverview}>
    <div className="appointment-list-container">
      <div className="apointment-warpper">
        <div className="list-col-2">
          <div className="col-2-wrapper">
            <img src={profilePicture || doctorDummyImage} alt="Doctor" />
            <div className="col-2-content">
              <h2>{doctorName}</h2>
              <p className="cp-1">
                {specialization} <span>12 Years Of Experience</span>
              </p>
              <p className="cp-2"><span><LocationPin/></span>{location}</p>
            </div>
          </div>
        </div>
        <div className="list-col-3">
          <Appointment /><p>{consultation}</p>
        </div>
        <div className="list-col-4">
          <div className="col-4-wrapper">
          <p className="ap-1">{`${fromTime} - ${toTime}`}</p>
          <p className="ap-2">Appointment Timing</p>
          </div>
        </div>
        <div className="list-col-5">
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
        <div className="list-col-6">
          <Button buttonText="View Details" externalClassName="appointmen-view" onClick={onViewDetails} />
        </div>
      </div>
    </div>
    </Link>
  );
};
