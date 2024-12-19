import React, { useEffect, useState } from "react";
import "./doctorOnBoardingProgress.scss";
import brandLogo from "../../Assets/images/home/truvita-logo.png";
import {Box,Typography,Button,Stepper,Step,StepLabel,StepContent,Paper,CircularProgress,} from "@mui/material";
import {CheckBox,DynamicDateField,DynamicPhoneNumber,Input,ModelOverlay,Select,TextBox} from "../../Atom";
import moment from "moment-timezone";
import {credentials,Gender_Data,specialtyData,usStates,} from "../../utils/common/constant";
import { useNavigate } from "react-router-dom";
import ISO6391 from "iso-639-1";
import dayjs from "dayjs";
import { notification } from "antd";
import {
  useVerficationStepOneQuery,
  useVerificationStepOnePostMutation,
  useVerificationStepTwoQuery,
  useVerificationStepTwoPostMutation,
  useVerificationStepThreeQuery,
  useVerificationStepThreePostMutation,
  verificationForm,
  useVerificationStatusQuery,
} from "../../redux/services";


type TimeZoneOption = {
  label: string;
  value: string; // Adjusted to match the string format
};
interface FormCompletionStatus {
  doctorsDetail: boolean;
  personalInfo: boolean;
  serviceDetails: boolean;
}
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

  const languagesOption = ISO6391.getAllCodes().map((code) => ({
    label: ISO6391.getName(code), // Get the language name
    value: ISO6391.getName(code).trim(), // ISO language code
  }));

  const [activeStep, setActiveStep] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [usTimeZones, setUsTimeZones] = useState<TimeZoneOption[]>([]);
  const [subStepperIndex, setSubStepperIndex] = useState(0);
  const userId = localStorage.getItem("userId");
  const { data: VerificationStepperForm } = useVerficationStepOneQuery(userId);
  const { data: VerificationStepperFormTwo } =
    useVerificationStepTwoQuery(userId);
  const [verificationStepperOnePost, { isLoading, isError }] =
    useVerificationStepOnePostMutation();
  const [verificationStepperTwoPost] = useVerificationStepTwoPostMutation();
  const { data: VerificationStepperFormThree } =
    useVerificationStepThreeQuery(userId);
  const [verificationStepperThreePost] = useVerificationStepThreePostMutation();
  const { data: verificationStatus } = useVerificationStatusQuery(userId);

  const [isCentPercent, setIsCentPercent] = useState<boolean | null>(null);
  const [formCompletionStatus, setFormCompletionStatus] = useState<FormCompletionStatus>({
    doctorsDetail: false,
    personalInfo: false,
    serviceDetails: false,
  });

  useEffect(()=>{
    setFormCompletionStatus({
      doctorsDetail:verificationStatus?.profile_completion.doctor_details_completed,
      personalInfo:verificationStatus?.profile_completion.personal_info_completed,
      serviceDetails:verificationStatus?.profile_completion.service_details_completed
    })
  },[verificationStatus])

 

  console.log("Verification Status:", verificationStatus?.profile_completion);

  // Debug log for fetched data
  // console.log(
  //   "Verification Stepper Form Data 3:",
  //   VerificationStepperFormThree
  // );

  // Initial state for formData
  const [formData, setFormData] = useState({
    stepOne: {
      govIdName: "",
      phoneNumber: "",
      email: "",
      timeZone: "",
    },
    stepTwo: {
      firstName: "",
      lastName: "",
      specialty: "",
      dob: "",
      aboutYou: "",
      state: "",
      credentials: "",
      nipNumber: "",
      gender: "",
      language: "",
      smsNotification: false,
      emailNotification: false,
    },
    stepThree: {
      aiBoothConsultation: false,
      doctorConsultation: false,
      aiBoothpriceRangeMin: 0,
      aiBoothpriceRangeMax: 500,
      docotorConsultpriceRangeMin: 0,
      docotorConsultpriceRangeMax: 500,
    },
  });

  // Update formData when VerificationStepperForm is fetched or updated
  useEffect(() => {
    if (
      VerificationStepperForm ||
      VerificationStepperFormTwo ||
      VerificationStepperFormThree
    ) {
      setFormData({
        stepOne: {
          govIdName: VerificationStepperForm?.government_id_name || "",
          phoneNumber: VerificationStepperForm?.phone_number || "",
          email: VerificationStepperForm?.emails?.[0] || "",
          timeZone: VerificationStepperForm?.timezone || "",
        },
        stepTwo: {
          firstName: VerificationStepperFormTwo?.doctor_data.first_name,
          lastName: VerificationStepperFormTwo?.doctor_data.last_name,
          specialty: VerificationStepperFormTwo?.doctor_data.specialty,
          dob: VerificationStepperFormTwo?.doctor_data.date_of_birth,
          aboutYou: VerificationStepperFormTwo?.doctor_data.bio,
          state: VerificationStepperFormTwo?.doctor_data.license_state,
          credentials: VerificationStepperFormTwo?.doctor_data.credential,
          nipNumber: VerificationStepperFormTwo?.doctor_data.npi_number,
          gender: VerificationStepperFormTwo?.doctor_data.gender,
          language: VerificationStepperFormTwo?.doctor_data.languages,
          smsNotification:
            VerificationStepperFormTwo?.doctor_data.sms_notification,
          emailNotification:
            VerificationStepperFormTwo?.doctor_data.email_notification,
        },
        stepThree: {
          aiBoothConsultation:
            VerificationStepperFormThree?.services.aiBoothConsultation,
          doctorConsultation:
            VerificationStepperFormThree?.services.doctorConsultation,
          aiBoothpriceRangeMin:
            VerificationStepperFormThree?.services.aiBoothpriceRangeMin,
          aiBoothpriceRangeMax:
            VerificationStepperFormThree?.services.aiBoothpriceRangeMax,
          docotorConsultpriceRangeMin:
            VerificationStepperFormThree?.services.doctorConsultpriceRangeMin,
          docotorConsultpriceRangeMax:
            VerificationStepperFormThree?.services.doctorConsultpriceRangeMax,
        },
      });
    }
  }, [
    VerificationStepperForm,
    VerificationStepperFormTwo,
    VerificationStepperFormThree,
  ]);

  

  const [error, setError] = useState({
    stepOne: {
      govIdName: "",
      phoneNumber: "",
      email: "",
      timeZone: "",
    },
  });
  const changeHandler = (
    value: string | boolean | number[] | number,
    name: string
  ): void => {
    setFormData((prevFormData) => ({
      stepOne: {
        ...prevFormData.stepOne,
        [name]: value,
      },
      stepTwo: {
        ...prevFormData.stepTwo,
        [name]: value,
      },
      stepThree: {
        ...prevFormData.stepThree,
        [name]: value,
      },
    }));
  };



  const saveChangeHandlerFormOne = async (step: number) => {
    try {
      if (step === 0) {
        const payloadData = {
          userId: userId,
          stepOneData: {
            emails: [formData.stepOne.email],
            government_id_name: formData.stepOne.govIdName,
            timezone: formData.stepOne.timeZone,
          },
        };
  
        // Ensure the API function returns a promise
        console.log('Sending Step One data...');
        const response = await verificationStepperOnePost(payloadData);
        console.log('Step One response:', response);
  
        // Check if response is valid before showing notification
        if (!response.error) {

          notification.success({
            message: 'Step One Saved',
            description: 'Your Step One data has been saved successfully!',
          });
        } else {
          notification.error({
            message: 'Error',
            description: 'There was an issue with Step One data.',
          });
        }
      } else if (step === 1) {
        const payloadData = {
          userId: userId,
          stepTwoData: {
            bio: formData.stepTwo.aboutYou,
            credential: formData.stepTwo.credentials,
            date_of_birth: formData.stepTwo.dob,
            email_notification: formData.stepTwo.emailNotification,
            first_name: formData.stepTwo.firstName,
            gender: formData.stepTwo.gender,
            languages: formData.stepTwo.language,
            last_name: formData.stepTwo.lastName,
            npi_number: formData.stepTwo.nipNumber,
            sms_notification: formData.stepTwo.smsNotification,
            specialty: formData.stepTwo.specialty,
            license_state: formData.stepTwo.state,
          },
        };
  
        console.log('Sending Step Two data...');
        const response = await verificationStepperTwoPost(payloadData);
        console.log('Step Two response:', response);
  
        if (!response.error) {
          notification.success({
            message: 'Step Two Saved',
            description: 'Your Step Two data has been saved successfully!',
          });
        } else {
          notification.error({
            message: 'Error',
            description: 'There was an issue with Step Two data.',
          });
        }
      } else if (step === 2) {
        const payloadData = {
          userId: userId,
          stepThreeData: {
            services: {
              aiBoothConsultation: formData.stepThree.aiBoothConsultation,
              doctorConsultation: formData.stepThree.doctorConsultation,
              aiBoothpriceRangeMin: formData.stepThree.aiBoothpriceRangeMin,
              aiBoothpriceRangeMax: formData.stepThree.docotorConsultpriceRangeMax,
              doctorConsultpriceRangeMin: formData.stepThree.docotorConsultpriceRangeMin,
              doctorConsultpriceRangeMax: formData.stepThree.docotorConsultpriceRangeMax,
            },
          },
        };
  
        console.log('Sending Step Three data...');
        const response = await verificationStepperThreePost(payloadData);
        console.log('Step Three response:', response);
  
        if (!response.error) {
          notification.success({
            message: 'Step Three Saved',
            description: 'Your Step Three data has been saved successfully!',
          });

        } else {
          notification.error({
            message: 'Error',
            description: 'There was an issue with Step Three data.',
          });
        }
      }
    } catch (err) {
      console.error('Error in saveChangeHandlerFormOne:', err);
  
      // Show generic error notification if the try block fails
      notification.error({
        message: 'Error',
        description: 'There was an error processing your request.',
      });
    }
  };
  
  const openIndexForm = () => {
    setIsFormOpen(false);
  };


  console.log("activeStep",activeStep)

  const handleNext = (currentIndex: number) => {
    const stepKeys: (keyof FormCompletionStatus)[] = [
      "personalInfo",
      "doctorsDetail",
      "serviceDetails",
    ];
  
    const currentStepKey = stepKeys[currentIndex];
  
    // Check if the current step is completed
    if (!formCompletionStatus[currentStepKey]) {
      console.error(`Cannot proceed: "${currentStepKey}" is not completed.`);
      
      // Open the form for the current step if it is not completed
      setIsFormOpen(true);
  
      // Optionally show a notification if the step isn't completed
      notification.error({
        message: "Incomplete Step",
        description: `Please complete the "${steps[currentIndex].label}" step before proceeding.`,
      });
  
      return; // Prevent proceeding to the next step if the current step isn't completed
    }
    setIsFormOpen(true);  // Open the form for the next step
    // Proceed to the next step if the current step is completed
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
 
  };
  
  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const maxSteps = steps.length;
 

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

  // console.log("is form open",isFormOpen)

  return (
    <>
      <div className="login-Header-container">
        <div className="login-header-container-wrapper">
          <div className="brand-logo-img">
            <img src={brandLogo} />
          </div>
        </div>
      </div>
      {isFormOpen && (
        <ModelOverlay closeOverlay={openIndexForm}>
          <div className="virtual-location-container">
            <div className="virtual-location-wrapper">
              <p>Edit Info</p>

              <div className="form-stepper-section">
                <Stepper activeStep={activeStep-1} alternativeLabel>
                  {horizontalSteps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              {activeStep === 0 && (
                <div className="form-container-1">
                  {/* form one  */}
                  <div className="form-container-1-wrapper">
                    <div className="global-input-wrapper">
                      <Input
                        type="text"
                        placeholder="First Name"
                        onChange={changeHandler}
                        name="govIdName"
                        label="Practice name (as per Government Proof)"
                        externalClassName="internal-input-firstname"
                        // helperText={error["firstName"] || ""}
                        required={true}
                        variant="outlined"
                        // error={error.firstName === "" ? false : !!error.firstName}
                        value={formData.stepOne["govIdName"] || ""}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <DynamicPhoneNumber
                        value={formData.stepOne["phoneNumber"] || ""}
                        required={true}
                        disabled={false}
                        // error={error.phoneNumber === "" ? false : !!error.phoneNumber}
                        // helperText={error["phoneNumber"] || ""}
                        onChange={changeHandler}
                        externalClassName="custom-phone-input"
                        variant="outlined"
                        label="Phone Number"
                        name="phoneNumber"
                        // validatePhone={handlePhoneValidation}
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
                        value={formData.stepOne["email"] || ""}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label={"Select Time Zone"}
                        value={formData.stepOne["timeZone"] || ""}
                        options={usTimeZones}
                        onChange={changeHandler}
                        name={"timeZone"}
                        helperText={""}
                      />
                    </div>

                    <div className="buttom-wrapper">
                      <Button onClick={() => saveChangeHandlerFormOne(0)}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
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
                        value={formData.stepTwo["firstName"] || ""}
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
                        value={formData.stepTwo["lastName"] || ""}
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
                        value={
                          formData.stepTwo["dob"]
                            ? dayjs(formData.stepTwo["dob"])
                            : null
                        }
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label={"Select Specialty"}
                        options={specialtyData}
                        onChange={changeHandler}
                        name={"specialty"}
                        value={formData.stepTwo["specialty"] || ""}
                        helperText={""}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <label>Tell About Yourself</label>
                      <TextBox
                        name={"aboutYou"}
                        onchange={changeHandler}
                        value={formData.stepTwo["aboutYou"] || ""}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label={"Gender"}
                        value={formData.stepTwo["gender"] || ""}
                        options={Gender_Data}
                        onChange={changeHandler}
                        name={"gender"}
                        helperText={""}
                        // helperText={error.gender || ""}
                        // error={error.gender === "" ? false : !!error.gender}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Input
                        type="text"
                        placeholder="Enter NPI Number"
                        name="nipNumber"
                        label="NPI Number"
                        externalClassName="internal-input-lastname"
                        variant="outlined"
                        value={formData.stepTwo["nipNumber"] || ""}
                        onChange={changeHandler}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label="States"
                        options={usStates}
                        onChange={changeHandler}
                        name="state"
                        helperText=""
                        value={formData.stepTwo["state"] || ""}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label="Credentials"
                        value={formData.stepTwo["credentials"] || ""}
                        options={credentials}
                        onChange={changeHandler}
                        name="credentials"
                        helperText=""
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <Select
                        label="Language"
                        value={formData.stepTwo["language"] || ""}
                        options={languagesOption}
                        onChange={changeHandler}
                        name="language"
                        helperText=""
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <div className="checkbox-wrapper flex top-0">
                        <div className="check-box">
                          <CheckBox
                            helperText="Booking Confirmation and appointment remainder email"
                            name="smsNotification"
                            onChange={changeHandler}
                            label={
                              "Booking confirmation and appointment reminder email"
                            }
                            checked={formData.stepTwo["smsNotification"]}
                          />
                        </div>

                        <div className="check-box">
                          <CheckBox
                            helperText="Booking Confirmation and appointment remainder Phone"
                            name="emailNotification"
                            onChange={changeHandler}
                            label={
                              "Booking confirmation and appointment reminder SMS"
                            }
                            checked={formData.stepTwo["emailNotification"]}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="button-wrapper">
                      <Button onClick={() => saveChangeHandlerFormOne(1)}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="form-container-3">
                  <div className="form-container-3-wrapper">
                    <div className="global-input-wrapper">
                      <CheckBox
                        label={"Doctor Consultation (Virtual)"}
                        name="doctorConsultation"
                        onChange={changeHandler}
                        checked={formData.stepThree["doctorConsultation"]}
                      />
                    </div>
                    <div className="global-input-wrapper">
                      <Input
                        type="text"
                        placeholder="0"
                        name="docotorConsultpriceRangeMin"
                        label="Min"
                        externalClassName="internal-input-lastname"
                        variant="outlined"
                        value={
                          formData.stepThree["docotorConsultpriceRangeMin"]
                        }
                        onChange={changeHandler}
                      />

                      <Input
                        type="text"
                        placeholder="500"
                        name="docotorConsultpriceRangeMax"
                        label="Max"
                        externalClassName="internal-input-lastname"
                        variant="outlined"
                        value={
                          formData.stepThree["docotorConsultpriceRangeMax"]
                        }
                        onChange={changeHandler}
                      />
                    </div>

                    <div className="global-input-wrapper">
                      <CheckBox
                        label={"Ai Booth Consulatation (Virtual)"}
                        onChange={changeHandler}
                        name="aiBoothConsultation"
                        checked={formData.stepThree["aiBoothConsultation"]}
                      />
                    </div>
                    <div className="global-input-wrapper">
                      <Input
                        type="number"
                        placeholder="0"
                        name="aiBoothpriceRangeMin"
                        label="Min"
                        externalClassName="internal-input-lastname"
                        variant="outlined"
                        value={formData.stepThree["aiBoothpriceRangeMin"]}
                        onChange={changeHandler}
                      />
                      <Input
                        type="text"
                        placeholder="500"
                        name="aiBoothpriceRangemax"
                        label="Max"
                        externalClassName="internal-input-lastname"
                        variant="outlined"
                        value={formData.stepThree["aiBoothpriceRangeMax"]}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className="button-wrapper">
                    <Button onClick={() => saveChangeHandlerFormOne(2)}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ModelOverlay>
      )}

      <div className="dobp-container">
        <div className="dobp-wrapper">
          {/* Left Column */}
          <div className="dobp-col-1">
          <div className="profile-setup-container">
      <Typography variant="h6" className="profile-title">
        Set Up your Profile and start connecting with your patients
      </Typography>

      <Box className="progress-container">
        <Box >
      
          {/* Progress CircularProgress */}
          <CircularProgress
            variant="determinate"
            value={verificationStatus?.percentage_completion}
            className="progress-foreground"
            size={160}
            thickness={4}
            color= 'primary'
          />
          {/* Centered Content */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              className="progress-percentage"
            >
              {verificationStatus?.percentage_completion}%
            </Typography>
            <Typography
              variant="caption"
              display="block"
              className="progress-subtext"
            >
              You're Almost there!
            </Typography>
          </Box>
        </Box>
        
      </Box>

      <Typography variant="body2" className="profile-description">
        You're just a few steps away from unlocking full access to patient
        bookings and enhancing your credibility.
      </Typography>

      <Button variant="contained" className="resume-button">
        ▶ Resume
      </Button>
    </div>
          </div>

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
