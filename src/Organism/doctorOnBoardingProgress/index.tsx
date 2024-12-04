import React from "react";
import './doctorOnBoardingProgress.scss';
import { Box, Typography, Button, Stepper, Step, StepLabel } from "@mui/material";

export const DoctorOnboardingProgress = () => {

    const steps = [
        {
          label: "Personal Info",
          description: "Start by providing your basic details like name, contact information.",
          completed: true,
        },
        {
          label: "Doctor Details",
          description: "Add your professional credentials like certifications, experience, and specialties.",
          completed: true,
        },
        {
          label: "Service Details",
          description: "Define your services, consultation fees, and availability to start offering care.",
          completed: false,
        },
      ];
  return (
    <div className="dobp-container">
      <div className="dobp-wrapper">
        {/* Left Column */}
        <div className="dobp-col-1">
          <div className="dobp-col-1-wrapper">
            <h2>Set Up your Profile and start connecting with your patients</h2>
            <div className="dobp-progress-circle">
              <div className="dobp-circle">
                <div className="dobp-progress">
                  <p className="dobp-percentage">75%</p>
                  <p className="dobp-text">You're Almost there!</p>
                </div>
              </div>
              <p className="dobp-desc">
                You're just a few steps away from unlocking full access to patient bookings and enhancing your credibility.
              </p>
            </div>
            <button className="dobp-resume-btn">Resume</button>
          </div>
        </div>

        {/* Right Column */}
        <Box className="dobp-col-2">
          <Box className="dobp-profile-box">
            <Typography variant="h5" component="h3" gutterBottom>
              Complete your Profile
            </Typography>
            <Typography variant="body2" className="dobp-profile-desc" color="textSecondary" gutterBottom>
              A complete profile helps patients find and trust you. Let's get started!
            </Typography>

            {/* Stepper Component */}
            <Stepper orientation="vertical" className="dobp-stepper">
              {steps.map((step, index) => (
                <Step key={index} active={step.completed} completed={step.completed}>
                  <StepLabel>
                    <Typography variant="subtitle1" className="dobp-step-label">
                      {step.label}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {step.description}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <Button variant="contained" color="primary" className="dobp-setup-btn">
              Set-up your Profile
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};
