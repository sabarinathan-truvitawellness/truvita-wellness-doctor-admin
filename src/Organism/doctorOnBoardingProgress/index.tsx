import React, { useEffect, useState } from "react";
import "./doctorOnBoardingProgress.scss";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
} from "@mui/material";
import {
  CheckBox,
  DynamicDateField,
  DynamicPhoneNumber,
  Input,
  ModelOverlay,
  Select,
  TextBox,
} from "../../Atom";
import moment from "moment-timezone";
import { Label } from "@mui/icons-material";
import {
  credentials,
  specialtyData,
  usStates,
} from "../../utils/common/constant";
import MinMaxPricing from "../../Atom/rangeInput";

type TimeZoneOption = {
  label: string;
  value: string; // Adjusted to match the string format
};
export const DoctorOnboardingProgress = () => {
  const steps = [
    {
      label: "Personal Info",
      description:
        "Start by providing your basic details like name, contact information.",
    },
    {
      label: "Doctor Details",
      description:
        "Add your professional credentials like certifications, experience, and specialties.",
    },
    {
      label: "Service Details",
      description:
        "Define your services, consultation fees, and availability to start offering care.",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [usTimeZones, setUsTimeZones] = useState<TimeZoneOption[]>([]);
  const [subStepperIndex, setSubStepperIndex] = useState(0);

  const changeHandler = () => {};

  const openIndexForm = () => {
    setIsFormOpen(false);
  };

  const handleNext = (currentIndex: number) => {
    if (currentIndex === 0) {
      setIsFormOpen(true);
      // alert(currentIndex)
    }
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  console.log("time zone", usTimeZones);
  const maxSteps = steps.length;
  const stepperForwardHandler = () => {
    setSubStepperIndex((prevActiveStep) => {
      // Prevent going beyond the final step
      if (prevActiveStep >= maxSteps - 1) {
        return prevActiveStep; // Stay on the current step
      }
      return prevActiveStep + 1;
    });
  };
  
  const stepperBackwardHandler = () => {
    setSubStepperIndex((prevActiveStep) => {
      // Prevent going below the first step
      if (prevActiveStep <= 0) {
        return prevActiveStep; // Stay on the current step
      }
      return prevActiveStep - 1;
    });
  };
  

  useEffect(() => {
    // Fetch time zones for the United States
    const timeZones = moment.tz.zonesForCountry("US", true);
    if (timeZones) {
      const formattedTimeZones = timeZones.map((zone) => ({
        label: zone.name,
        value: zone.name,
      }));
      setUsTimeZones(formattedTimeZones);
    }
  }, []);

  const horizontalSteps = [
    "Edit Virtual Location Info",
    "Update Personal and professional info",
    "Services and Costing",
  ];

  return (
    <>
      {isFormOpen && (
        <ModelOverlay closeOverlay={openIndexForm}>
          <div className="virtual-location-container">
            <div className="virtual-location-wrapper">
              <p>Edit Info</p>

              <div className="form-stepper-section">
                <Stepper activeStep={subStepperIndex} alternativeLabel>
                  {horizontalSteps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              {subStepperIndex === 0 && (
                <div className="form-container-1">
                  {/* form one  */}
                  <div className="form-container-1-wrapper">
                    <div className="global-input-wrapper">
                      <Input
                        type="text"
                        placeholder="First Name"
                        onChange={changeHandler}
                        name="firstName"
                        label="Practice name (as per Government Proof)"
                        externalClassName="internal-input-firstname"
                        // helperText={error["firstName"] || ""}
                        required={true}
                        variant="outlined"
                        // error={error.firstName === "" ? false : !!error.firstName}
                        // value={formData["firstName"] || ""}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <DynamicPhoneNumber
                        name=""
                        label="Phone Number for contact"
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Input
                        type="email"
                        placeholder="Email"
                        onChange={changeHandler}
                        name="email"
                        label="Email"
                        externalClassName="internal-input-email"
                        // helperText={error["email"] || ""}
                        required={true}
                        variant="outlined"
                        // error={error.email === "" ? false : !!error.email}
                        // value={formData["email"] || ""}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label={"Select Time Zone"}
                        value={""}
                        options={usTimeZones}
                        onChange={function (value: string, name: string): void {
                          throw new Error("Function not implemented.");
                        }}
                        name={""}
                        helperText={""}
                      />
                    </div>

                    <div className="buttom-wrapper">
                      <Button onClick={stepperBackwardHandler}>Back</Button>
                      <Button onClick={stepperForwardHandler}>Next</Button>
                    </div>
                  </div>
                </div>
              )}

              {subStepperIndex === 1 && (
                /* Form two */
                <div className="form-container-2">
                  <div className="form-container-2-wrapper">
                    <div className="global-input-wrapper">
                      <Input
                        type="text"
                        placeholder="First Name"
                        onChange={changeHandler}
                        name="firstName"
                        label="First Name"
                        externalClassName="internal-input-firstname"
                        required={true}
                        variant="outlined"
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Input
                        type="text"
                        placeholder="Last Name"
                        onChange={changeHandler}
                        name="lastName"
                        label="Last Name"
                        externalClassName="internal-input-lastname"
                        required={true}
                        variant="outlined"
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Input
                        type="email"
                        placeholder="Email"
                        onChange={changeHandler}
                        name="email"
                        label="Email"
                        externalClassName="internal-input-email"
                        required={true}
                        variant="outlined"
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <DynamicDateField
                        type="date"
                        onChange={changeHandler}
                        name="dob"
                        label="Date of Birth"
                        externalClassName="internal-input-dob"
                        required={true}
                        variant="outlined"
                        isShrunk={true}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label={"Select Specialty"}
                        options={specialtyData}
                        onChange={changeHandler}
                        name={"hearAboutUs"}
                        value={""}
                        helperText={""}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <label>Tell About Yourself</label>
                      <TextBox
                        name={""}
                        value={""}
                        onchange={changeHandler}
                        // minRows = {3}
                        // minColumns = {10}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label={"Gender"}
                        // value={formData["gender"] || ""}
                        // options={Gender_Data}
                        onChange={changeHandler}
                        name={"gender"}
                        value={""}
                        options={[]}
                        helperText={""} // helperText={error.gender || ""}
                        // error={error.gender === "" ? false : !!error.gender}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        label="NPI Number"
                        externalClassName="internal-input-lastname"
                        variant="outlined"
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label="States"
                        value=""
                        options={usStates}
                        onChange={(value: string, name: string): void => {}}
                        name="option3"
                        helperText=""
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label="Credentials"
                        value=""
                        options={credentials}
                        onChange={(value: string, name: string): void => {}}
                        name="option3"
                        helperText=""
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label="Language"
                        value=""
                        options={[]}
                        onChange={(value: string, name: string): void => {}}
                        name="option4"
                        helperText=""
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <div className="checkbox-wrapper flex top-0">
                        <div className="check-box">
                          <CheckBox
                            helperText="Booking Confirmation and appointment remainder email"
                            name="emailConsent"
                            onChange={changeHandler}
                            label={
                              "Booking confirmation and appointment reminder email"
                            }
                          />
                        </div>

                        <div className="check-box">
                          <CheckBox
                            helperText="Booking Confirmation and appointment remainder Phone"
                            name="phoneConsent"
                            onChange={changeHandler}
                            label={
                              "Booking confirmation and appointment reminder SMS"
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="button-wrapper">
                      <Button onClick={stepperBackwardHandler}>Back</Button>
                      <Button onClick={stepperForwardHandler}>Next</Button>
                    </div>
                  </div>
                </div>
              )}

              {
                subStepperIndex === 2 && (<div className="form-container-3">
                  <div className="form-container-3-wrapper">
                    <div className="global-input-wrapper">
                      <CheckBox
                        label={"Doctor Consultation (Virtual)"}
                        name=""
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="global-input-wrapper">
                      <MinMaxPricing
                        minPrice={1}
                        maxPrice={200}
                        step={10}
                        onPriceChange={changeHandler}
                      />
                    </div>
  
                    <div className="global-input-wrapper">
                      <CheckBox
                        label={"Ai Booth Consulatation (Virtual)"}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="global-input-wrapper">
                      <MinMaxPricing
                        minPrice={1}
                        maxPrice={200}
                        step={10}
                        onPriceChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className="button-wrapper">
                      <Button onClick={stepperBackwardHandler}>Back</Button>
                      <Button onClick={stepperForwardHandler}>Next</Button>
                    </div>
                </div>)
              }
              
            </div>
          </div>
        </ModelOverlay>
      )}

      <div className="dobp-container">
        <div className="dobp-wrapper">
          {/* Left Column */}
          <div className="dobp-col-1"></div>

          {/* Right Column */}
          <Box className="dobp-col-2">
            <Box className="dobp-profile-box">
              <Typography variant="h5" component="h3" gutterBottom>
                Complete your Profile
              </Typography>
              <Typography
                variant="body2"
                className="dobp-profile-desc"
                color="textSecondary"
                gutterBottom
              >
                A complete profile helps patients find and trust you. Let's get
                started!
              </Typography>

              {/* Stepper Component */}
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                className="dobp-stepper"
              >
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        <Button
                          variant="contained"
                          onClick={() => handleNext(index)}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>

              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed - you're finished!
                  </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};
