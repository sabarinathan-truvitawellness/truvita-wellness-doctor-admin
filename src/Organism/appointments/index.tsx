import React from "react";
import { AppointmentListCard } from "../../Atom";
import dummyProfile from "../../Assets/images/header/dummy-dotor-profile.png";
import { useAppointmentListQuery } from "../../redux/services";

interface TimeSlotDetails {
  from_date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface PatientDetails {
  first_name: string;
  last_name: string;
  country: string;
  gender: string;
  date_of_birth: string;
}

interface AppointmentData {
  id: number;
  appointment_id: string;
  patient_email: string;
  profile_picture_url: string;
  time_slot_details: TimeSlotDetails;
  symptoms: string;
  doctor: number;
  status: string;
  notes: string;
  meeting_link: string;
  patient_details: PatientDetails;
}

export const Appointments: React.FC = () => {
  const doctorId = localStorage.getItem("userId") || "";

  const { data: appointmentList } = useAppointmentListQuery({
    doctorId,
    status: "confirmed",
  });

  console.log("Appointment List", appointmentList);

  return (
    <div className="appointment-page-container">
      <div className="appointment-page-wrapper">
        <h2 className="appointment-header">Confirmed Appointments</h2>
        <div className="appointment-service-section">
          {appointmentList?.map((appointment: AppointmentData) => (
            <AppointmentListCard
              key={appointment.id}
              consultation="Doctor Consultation"
              location={appointment.patient_details.country || "Unknown"}
              doctorName={`${appointment.patient_details.first_name} ${appointment.patient_details.last_name}`}
              specialization="General Practitioner"
              startTime={appointment.time_slot_details.start_time}
              fromTime={appointment.time_slot_details.from_date}
              toTime={appointment.time_slot_details.end_time}
              profilePicture={appointment.profile_picture_url}
              onViewDetails={() =>
                window.open(appointment.meeting_link, "_blank")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
