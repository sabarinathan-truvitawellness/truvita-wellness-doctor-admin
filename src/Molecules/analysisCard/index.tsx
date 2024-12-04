import React from "react";
import {
  Dollor,
  PatientsAttended,
  TotalAppointment,
} from "../../utils/common/svgIcons";
import './analysisCard.scss';
import { Link } from "react-router-dom";

export const AnalysisCard = () => {
  const cardData = [
    {
      cardIcon: <TotalAppointment />,
      cardTitle: "Total Appointment",
      dataFrequency: "this week",
      data: "88",
      link:"#"
    },
    {
      cardIcon: <PatientsAttended />,
      cardTitle: "Patients Attended",
      dataFrequency: "this week",
      data: "22",
      link:"#"
    },
    {
      cardIcon: <Dollor />,
      cardTitle: "Total Earnings",
      dataFrequency: "this week",
      data: "$432",
      link:"#"
    },
  ];
  return (
    <div className="analysis-card-super-container">
      {cardData.map((res) => {
        return (
            <Link to={res.link}>
          <div className="analysis-card-container">
            <div className="card-wrapper">
              <div className="card-row-1">
                <div className="card-icon">{res.cardIcon}</div>
                <div className="title-section">
                <h3>{res.cardTitle}</h3>
                <p>{res.dataFrequency}</p>
                </div>
              </div>
              <div className="card-row-2">
                <p>{res.data}</p>
              </div>
            </div>
          </div>
          </Link>
        );
      })}
    </div>
  );
};
