import React, { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Select } from "../../Atom"; // Assuming this is your custom Select component
import "./earningAnalaysisReport.scss";

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
  yearly: ChartData;
  pastFiveYears: ChartData;
};

export const EarningAnalysis: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("weekly");

  const chartData: ChartDataMap = {
    weekly: {
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { label: "Earnings", data: [300, 400, 350, 500, 450, 600, 700] },
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
          label: "Earnings",
          data: [
            1000, 1200, 1100, 1500, 1300, 1700, 2000, 1900, 1800, 1600, 1500,
            1400,
          ],
        },
      ],
    },
    yearly: {
      xAxis: Array.from({ length: 5 }, (_, i) =>
        (new Date().getFullYear() - i).toString()
      ),
      series: [
        { label: "Earnings", data: [12000, 15000, 14000, 17000, 16000] },
      ],
    },
    pastFiveYears: {
      xAxis: ["2019", "2020", "2021", "2022", "2023"],
      series: [
        { label: "Earnings", data: [20000, 25000, 23000, 27000, 26000] },
      ],
    },
  };

  const options = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
    { label: "Past 5 Years", value: "pastFiveYears" },
  ];

  const handleChange = (value: string) => setSelectedOption(value);

  const currentData = chartData[selectedOption as keyof ChartDataMap];

  return (
    <div className="earning-analysis-graph-container">
      <div className="earning-analysis-graph-wrapper">
        <div className="graph-header">
          <p>Earning Analysis</p>
          <Select
            label="Select Time Range"
            value={selectedOption}
            options={options}
            onChange={handleChange}
            name="timeRange"
            helperText={""}
          />
        </div>

        <LineChart
          series={currentData.series}
          xAxis={[{ data: currentData.xAxis, scaleType: "band" }]}
           leftAxis={null}
          margin={{ top: 20, bottom: 30, left: 50, right: 20 }}
          colors={["#3f51b5"]} // Example color for the line graph
          height={160}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "top", horizontal: "middle" },
            },
          }}
        />
      </div>
    </div>
  );
};
