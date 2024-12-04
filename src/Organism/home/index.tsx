import React, { ReactNode } from "react";
import "./home.scss";
import {
  AnalysisCard,
  CalenderWithAppointment,
  ConsultationReport,
  GenderAnalysis,
  PatientsRecord,
} from "../../Molecules";

export const Home = () => {
  return (
    <div className="page-render-container">
      <div className="container-wrapper flex">
        <div className="dashboard-left-container">
          <AnalysisCard />
          <div className="middle-left-container">
          <ConsultationReport />
          <GenderAnalysis />
          </div>
          <div className="left-bottom-container">
            <PatientsRecord />
           
            {/* <div className="dummy"></div> */}
          </div>
        </div>
        <div className="calender-section-wrapper">
          <CalenderWithAppointment />
        </div>
      </div>
    </div>
  );
};
