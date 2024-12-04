import React from "react";
import "./genderAnalysis.scss";
import { PieChart } from "@mui/x-charts/PieChart";

export const GenderAnalysis = () => {
  const colors = ["#1E90FF", "#9B59B6", "#F8BD01"]; // Define slice colors
  const data = [
    { id: 0, value: 50, label: "Male" },
    { id: 1, value: 35, label: "Female" },
    { id: 2, value: 15, label: "Child" },
  ];

  return (
    <div className="gender-analysis-super-container">
      <div className="gender-analysis-container">
        <p className="ga-title">Gender Report</p>
        <div className="ga-wrapper">
          <PieChart
            series={[
              {
                data,
                innerRadius: 45, 
                outerRadius: 70,
                cornerRadius: 8, 
                cx:180,
                cy:80
              },
            ]}
            width={260}
            height={160}
            colors={colors}
            slotProps={{
              legend: {
                direction: "column",
                position: { vertical: "middle", horizontal: "left" },
                padding: 0,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
