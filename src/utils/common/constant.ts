
import { AppRoutes } from '../../routes';
import {
  DashboardIconActive,
  DashboardIconInactive,
  AppointmentsIconActive,
  AppointmentsIconInactive,
  ChatIconActive,
  ChatIconInactive,
  ScheduleIconActive,
  ScheduleIconInactive,
  AnalyticsActive,
  AnalyticsInActive,
  SettingsActive,
  SettingsInActive,
  PrescriptionActive,
  PrescriptionInactive,
  PatientRecordsActive,
  PatientRecordsInActive
} from './svgIcons';


const REGEX_CONSTANT: { [key: string]: RegExp } = {
  ONLY_CHARACTERS: /^[a-zA-Z]+$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_NUMBER: /^(?:\(\d{3}\)\s?|\d{3}[-.\s]?)(\d{3})[-.\s]?(\d{4})$/,
  PASSWORD_VERIFY: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&]).{8,}$/,
  USER_NAME: /^(?=.*[a-zA-Z])(\w*(?=\d)\w*)+$|^[a-zA-Z]+$/,
  ONLY_NUMBER:/^\d+$/

};

 let LocalStorageKeys = {
  authToken:"authToken",
  version:"version"
};

const Gender_Data=  [
  {
     label:"Male",
     value:"male"
  },
  {
    label:"Female",
    value:"female"
 },
 {
  label:"Others",
  value:"others"
}

]

const specialtyData = [
  { label: "Cardiology", value: "cardiology" },
  { label: "Dermatology", value: "dermatology" },
  { label: "Endocrinology", value: "endocrinology" },
  { label: "Gastroenterology", value: "gastroenterology" },
  { label: "Hematology", value: "hematology" },
  { label: "Neurology", value: "neurology" },
  { label: "Oncology", value: "oncology" },
  { label: "Orthopedics", value: "orthopedics" },
  { label: "Pediatrics", value: "pediatrics" },
  { label: "Psychiatry", value: "psychiatry" },
  { label: "Radiology", value: "radiology" },
  { label: "Rheumatology", value: "rheumatology" },
  { label: "Urology", value: "urology" },
  { label: "Ophthalmology", value: "ophthalmology" },
  { label: "Obstetrics and Gynecology", value: "obstetrics_gynecology" },
  { label: "General Surgery", value: "general_surgery" },
  { label: "Plastic Surgery", value: "plastic_surgery" },
  { label: "Anesthesiology", value: "anesthesiology" },
  { label: "Pathology", value: "pathology" },
  { label: "Family Medicine", value: "family_medicine" },
];

const hearAboutUs_Data = [
      {
        label:"TV",
        value:"tv"
      },
      {
        label:"Google Search",
        value:"googlesearch"
      },
      {
        label: "Social Media",
        value:"socialmedia"
      },
      {
        label:"Mail",
        value:"mail"
      },
      {
        label:"Bill Board",
        value: "billboard"
      },
      {
        label:"Other",
        value:"other"
      }
]

const usStates = [
  { label: "Alabama", value: "Alabama" },
  { label: "Alaska", value: "Alaska" },
  { label: "Arizona", value: "Arizona" },
  { label: "Arkansas", value: "Arkansas" },
  { label: "California", value: "California" },
  { label: "Colorado", value: "Colorado" },
  { label: "Connecticut", value: "Connecticut" },
  { label: "Delaware", value: "Delaware" },
  { label: "Florida", value: "Florida" },
  { label: "Georgia", value: "Georgia" },
  { label: "Hawaii", value: "Hawaii" },
  { label: "Idaho", value: "Idaho" },
  { label: "Illinois", value: "Illinois" },
  { label: "Indiana", value: "Indiana" },
  { label: "Iowa", value: "Iowa" },
  { label: "Kansas", value: "Kansas" },
  { label: "Kentucky", value: "Kentucky" },
  { label: "Louisiana", value: "Louisiana" },
  { label: "Maine", value: "Maine" },
  { label: "Maryland", value: "Maryland" },
  { label: "Massachusetts", value: "Massachusetts" },
  { label: "Michigan", value: "Michigan" },
  { label: "Minnesota", value: "Minnesota" },
  { label: "Mississippi", value: "Mississippi" },
  { label: "Missouri", value: "Missouri" },
  { label: "Montana", value: "Montana" },
  { label: "Nebraska", value: "Nebraska" },
  { label: "Nevada", value: "Nevada" },
  { label: "New Hampshire", value: "New Hampshire" },
  { label: "New Jersey", value: "New Jersey" },
  { label: "New Mexico", value: "New Mexico" },
  { label: "New York", value: "New York" },
  { label: "North Carolina", value: "North Carolina" },
  { label: "North Dakota", value: "North Dakota" },
  { label: "Ohio", value: "Ohio" },
  { label: "Oklahoma", value: "Oklahoma" },
  { label: "Oregon", value: "Oregon" },
  { label: "Pennsylvania", value: "Pennsylvania" },
  { label: "Rhode Island", value: "Rhode Island" },
  { label: "South Carolina", value: "South Carolina" },
  { label: "South Dakota", value: "South Dakota" },
  { label: "Tennessee", value: "Tennessee" },
  { label: "Texas", value: "Texas" },
  { label: "Utah", value: "Utah" },
  { label: "Vermont", value: "Vermont" },
  { label: "Virginia", value: "Virginia" },
  { label: "Washington", value: "Washington" },
  { label: "West Virginia", value: "West Virginia" },
  { label: "Wisconsin", value: "Wisconsin" },
  { label: "Wyoming", value: "Wyoming" }
];

const credentials = [
  { label: "PMHNP", value: "PMHNP" },
  { label: "CNS", value: "CNS" },
  { label: "IBCLC", value: "IBCLC" },
  { label: "LM", value: "LM" },
  { label: "OT", value: "OT" },
  { label: "APRN", value: "APRN" },
  { label: "APRN-CNP", value: "APRN-CNP" },
  { label: "ARNP", value: "ARNP" },
  { label: "AuD", value: "AUD" },
  { label: "CCC-SLP", value: "CCC_SLP" },
  { label: "CNM", value: "CNM" },
  { label: "CNP", value: "CNP" },
  { label: "CRNP", value: "CRNP" },
  { label: "DC", value: "DC" },
  { label: "DDS", value: "DDS" },
  { label: "DMD", value: "DMD" },
  { label: "DNP", value: "DNP" },
  { label: "DO", value: "DO" },
  { label: "DPM", value: "DPM" },
  { label: "DPT", value: "DPT" },
  { label: "FNP", value: "FNP" },
  { label: "FNP-BC", value: "FNP_BC" },
  { label: "FNP-C", value: "FNP_C" },
  { label: "Intern", value: "INTERN" },
  { label: "LCMFT", value: "LCMFT" },
  { label: "LCPC", value: "LCPC" },
  { label: "LCSW", value: "LCSW" },
  { label: "LMFT", value: "LMFT" },
  { label: "LMHC", value: "LMHC" },
  { label: "LMSW", value: "LMSW" },
  { label: "LPC", value: "LPC" },
  { label: "MD", value: "MD" },
  { label: "MD-AP", value: "MD_AP" },
  { label: "MSAC", value: "MSAC" },
  { label: "MSN", value: "MSN" },
  { label: "MSTOM", value: "MSTOM" },
  { label: "NP", value: "NP" },
  { label: "OD", value: "OD" },
  { label: "PA", value: "PA" },
  { label: "PA-C", value: "PA_C" },
  { label: "PhD", value: "PHD" },
  { label: "PNP", value: "PNP" },
  { label: "PT", value: "PT" },
  { label: "RD", value: "RD" },
  { label: "RDH", value: "RDH" },
  { label: "RD-LD", value: "RD_LD" },
  { label: "RN", value: "RN" },
  { label: "WHCN", value: "WHCN" },
  { label: "WHCNP", value: "WHCNP" },
  { label: "WHNP", value: "WHNP" },
  { label: "WHNP-BC", value: "WHNP_BC" },
  { label: "ANP", value: "ANP" },
  { label: "DNP-FNP", value: "DNP_FNP" },
  { label: "APN-C", value: "APN_C" },
  { label: "APRN-C", value: "APRN_C" },
  { label: "NP-C", value: "NP_C" },
  { label: "ACSW", value: "ACSW" },
  { label: "AMF", value: "AMF" },
  { label: "AMFT", value: "AMFT" },
  { label: "APC", value: "APC" },
  { label: "APCC", value: "APCC" },
  { label: "APN", value: "APN" },
  { label: "ASW", value: "ASW" },
  { label: "BCBA", value: "BCBA" },
  { label: "BSW", value: "BSW" },
  { label: "CADC", value: "CADC" },
  { label: "CMHC", value: "CMHC" },
  { label: "CPC", value: "CPC" },
  { label: "CSAC", value: "CSAC" },
  { label: "CT", value: "CT" },
  { label: "LAC", value: "LAC" },
  { label: "LADC", value: "LADC" },
  { label: "LCC", value: "LCC" },
  { label: "LCMHC", value: "LCMHC" },
  { label: "LCP", value: "LCP" },
  { label: "LCSWA", value: "LCSWA" },
  { label: "LGPC", value: "LGPC" },
  { label: "LICSW", value: "LICSW" },
  { label: "LIMHP", value: "LIMHP" },
  { label: "LISW", value: "LISW" },
  { label: "LMFTA", value: "LMFTA" },
  { label: "LMHCA", value: "LMHCA" },
  { label: "LMLP", value: "LMLP" },
  { label: "LPCC", value: "LPCC" },
  { label: "LPCA", value: "LPCA" },
  { label: "LPP", value: "LPP" },
  { label: "LSCSW", value: "LSCSW" },
  { label: "LSW", value: "LSW" },
  { label: "MA", value: "MA" },
  { label: "MFA", value: "MFA" },
  { label: "MFT", value: "MFT" },
  { label: "MHC", value: "MHC" },
  { label: "MMFT", value: "MMFT" },
  { label: "MS", value: "MS" },
  { label: "MSMFT", value: "MSMFT" },
  { label: "MSW", value: "MSW" },
  { label: "NCC", value: "NCC" },
  { label: "PLC", value: "PLC" },
  { label: "PLPC", value: "PLPC" },
  { label: "PSY", value: "PSY" },
  { label: "PSYD", value: "PSYD" },
  { label: "RMFTI", value: "RMFTI" },
  { label: "RMHCI", value: "RMHCI" },
  { label: "RMHI", value: "RMHI" },
];


const AllSideNavBars = [
  {
    label: "Dashboard",
    route: '/dashboard',
    icon: {
      active: DashboardIconActive ,
      inactive: DashboardIconInactive 
    },
  },
  {
    label: "Appointments",
    route: AppRoutes.appointments,
    icon: {
      active: AppointmentsIconActive ,
      inactive: AppointmentsIconInactive 
    },
  },
  
  {
    label: "Patient Records",
    route: AppRoutes.patientRecods,
    icon: {
      active: PatientRecordsActive ,
      inactive: PatientRecordsInActive
    },
  },
  {
    label: "Chat",
    route: '/inbox',
    icon: {
      active: ChatIconActive ,
      inactive: ChatIconInactive 
    },
  },
  {
    label: "Schedule",
    route: '/schedule',
    icon: {
      active: ScheduleIconActive ,
      inactive: ScheduleIconInactive 
    },
  },

  {
    label: "Analytics",
    route: '/analytics',
    icon: {
      active: AnalyticsActive ,
      inactive: AnalyticsInActive 
    },
  },
  {
    label: "Settings",
    route: '/settings',
    icon: {
      active: SettingsActive ,
      inactive: SettingsInActive 
    },
  },
];


export default AllSideNavBars;


export {
  REGEX_CONSTANT,
  AllSideNavBars,
  LocalStorageKeys,
  Gender_Data,
  hearAboutUs_Data,
  specialtyData,
  usStates,
  credentials
}