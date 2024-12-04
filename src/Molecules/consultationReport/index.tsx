import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Select } from "../../Atom"; // Assuming this is your custom Select component
import "./consultationReport.scss";

type SeriesData = {
  label: string;
  data: number[];
};

type ChartData = {
  xAxis: string[];
  series: SeriesData[];
};

type ChartDataMap = {
  weekly: ChartData;
  monthly: ChartData;
  yot: ChartData;
  pastfiveyears: ChartData;
};

export const ConsultationReport: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("weekly");

  // Mock data for demonstration
  const chartData: ChartDataMap = {
    weekly: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { label: "In Clinic", data: [30, 40, 50, 60, 70, 80, 90] },
        { label: "Online", data: [20, 30, 40, 50, 60, 70, 80] },
      ],
    },
    monthly: {
      xAxis: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [
        {
          label: "In Clinic",
          data: [300, 400, 500, 600, 700, 800, 900, 800, 700, 600, 500, 400],
        },
        {
          label: "Online",
          data: [200, 300, 400, 500, 600, 700, 800, 700, 600, 500, 400, 300],
        },
      ],
    },
    yot: {
      xAxis: Array.from({ length: new Date().getMonth() + 1 }, (_, i) =>
        new Date(2024, i).toLocaleString("default", { month: "short" })
      ),
      series: [
        {
          label: "In Clinic",
          data: [300, 400, 500, 600, 700, 800, 900, 750, 700, 650, 600],
        },
        {
          label: "Online",
          data: [200, 300, 400, 500, 600, 700, 800, 750, 700, 650, 600],
        },
      ],
    },
    pastfiveyears: {
      xAxis: Array.from({ length: 5 }, (_, i) =>
        (new Date().getFullYear() - i).toString()
      ),
      series: [
        { label: "In Clinic", data: [2000, 2200, 2100, 2400, 2300] },
        { label: "Online", data: [1500, 1600, 1700, 1800, 1900] },
      ],
    },
  };

  // Options for the Select dropdown
  const options = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Year On Today (YOT)", value: "yot" },
    { label: "Past 5 Years", value: "pastfiveyears" },
  ];

  // Handle selection change
  const handleChange = (value: string) => setSelectedOption(value);

  // Dynamic data based on the selected option
  const currentData = chartData[selectedOption as keyof ChartDataMap];

  const [radius, setRadius] = React.useState(13);

  // Define a colors array corresponding to the series
  const colors = ["rgba(15, 192, 237, 0.75)", "rgba(15, 192, 237, 0.24)"]; // Example: In Clinic - Blue, Online - Orange

  return (
    <div className="consultation-report-container">
      <div className="consultation-report-wrapper">
        <div className="graph-title-bar">
          <p>Consultation Report</p>
          <Select
            label="Select Time Range"
            value={selectedOption}
            options={options}
            onChange={handleChange}
            name="timeRange"
            helperText=""
          />
        </div>

        <BarChart
          borderRadius={radius}
          series={currentData.series}
          xAxis={[{ data: currentData.xAxis, scaleType: "band" }]}
          leftAxis={null}
          height={150} // Increased height for better visibility
          margin={{ top: 20, bottom: 20, left: 40, right: 20 }}
          colors={colors} // Apply the colors array here
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'middle' },
              padding: -8,
            },
          }}
          
        />
      </div>
    </div>
  );
};
