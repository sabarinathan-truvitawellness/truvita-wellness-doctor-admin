import React from "react";
import { AppointmentListCard } from "../../Atom";
import dummyprofile from '../../Assets/images/header/dummy-dotor-profile.png'

export const Appointments = () => {
  return (
    <div className="appointment-page-container">
      <div className="appointment-page-wrapper">
        <div className=""></div>
        <div className="appointment-service-section">
          <AppointmentListCard
            consultation="Doctor Consultation"
            location="Texas, United States"
            doctorName="John"
            specialization="Cardiologist"
            startTime={"3"}
            fromTime="10:00 AM"
            toTime="11:00 AM"
            onViewDetails={() => console.log("Viewing details")}
          />
          <AppointmentListCard
            consultation="Doctor Consultation"
            location="Texas, United States"
            doctorName="John"
            specialization="Cardiologist"
            startTime={"3"}
            fromTime="10:00 AM"
            toTime="11:00 AM"
            onViewDetails={() => console.log("Viewing details")}
          />
          <AppointmentListCard
            consultation="Doctor Consultation"
            location="Texas, United States"
            doctorName="John"
            specialization="Cardiologist"
            startTime={"3"}
            fromTime="10:00 AM"
            toTime="11:00 AM"
            onViewDetails={() => console.log("Viewing details")}
          />
        </div>
      </div>
    </div>
  );
};
