import React from "react";
import {
  DollerWithBg,
  Payouts,
  PendingPayouts,
} from "../../utils/common/svgIcons";
import "./earningWallet.scss";
import { PieChart } from "@mui/x-charts/PieChart";
import { EarningAnalysis } from "../../Molecules";

export const EarningWallet = () => {
  const cardData = [
    {
      cardIcon: <DollerWithBg />,
      cardTitle: "Total Earnings",
      detailedAmt: "2800",
    },
    {
      cardIcon: <PendingPayouts />,
      cardTitle: "Payout Processed",
      detailedAmt: "7800",
    },
    {
      cardIcon: <Payouts />,
      cardTitle: "Pending Payouts",
      detailedAmt: "650",
    },
    {
      cardIcon: <DollerWithBg />,
      cardTitle: "Total Earnings",
      detailedAmt: "8450",
    },
  ];

  const colors = ["#1E90FF", "#9B59B6"]; // Define slice colors
  const data = [
    { id: 0, value: 50, label: "Video Consultation" },
    { id: 1, value: 35, label: "Ai Booth" },
  ];
  return (
    <div className="earning-wallet-container">
      <div className="earning-wallet-wrapper">
        <div className="earning-wallet-cards">
          <div className="wallet-cards-container">
            {cardData.map((res) => {
              return (
                <div className="wallet-card-wrapper">
                  <div className="wallet-card-row-1">
                    <div className="icon-wrapper">{res.cardIcon}</div>
                    <div className="card-title">
                      <span>{res.cardTitle}</span>
                    </div>
                  </div>
                  <div className="wallet-detail-amt">
                    <span>${res.detailedAmt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="earning-wallet-graphs">
          <div className="ets-graph-container">
            <p>Earnings through Services</p>
            <div className="ets-graph-wrapper">
              <PieChart
                series={[
                  {
                    data,
                    innerRadius: 50,
                    outerRadius: 75,
                    cornerRadius: 8,
                    cy: 120,
                  },
                ]}
                width={300}
                height={200}
                colors={colors}
                slotProps={{
                  legend: {
                    direction: "row",
                    position: { vertical: "top", horizontal: "middle" },
                    padding: 0,
                  },
                }}
              />
            </div>
          </div>
          <div className="earning-analysis-container">
            <div className="earning-analysis-wrapper">
                <EarningAnalysis/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
