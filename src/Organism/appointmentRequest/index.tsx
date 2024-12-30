import React, { useEffect, useState } from "react";
import {
  CancelButton,
  LocationPin,
  Tick,
  TotalAppointment,
} from "../../utils/common/svgIcons";
import "./appointmentRequest.scss";
import dummyAvatar from "../../Assets/images/header/profile-image-avatar.png";
import {
  useApproveAppointmentMutation,
  useGetAppointmentRequestDataQuery,
} from "../../redux/services";
import dayjs from "dayjs";
import { Modal, notification } from "antd";

interface PatientDetails {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  country: string;
}

interface TimeSlotDetails {
  from_date: string;
  start_time: string;
  end_time: string;
}

interface AppointmentRequestData {
  appointment_id: string;
  profile_picture_url?: string;
  patient_details: PatientDetails;
  location: string;
  symptoms: string;
  placeOfVisit: string;
  time_slot_details: TimeSlotDetails;
}

export const AppointmentRequest: React.FC = () => {
  const doctorId = localStorage.getItem("userId") || "";
  const [requestList, setRequestList] = useState<AppointmentRequestData[]>([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: getAppointmentRequest, refetch } = useGetAppointmentRequestDataQuery({
    doctorId,
    status: "pending",
  });
  const [approveAppointment] = useApproveAppointmentMutation();

  const calculateAge = (birthDate: string): number => {
    const today = dayjs();
    const birthDay = dayjs(birthDate);
    return today.diff(birthDay, "year");
  };

  useEffect(() => {
    if (getAppointmentRequest) {
      setRequestList(getAppointmentRequest);
    }
  }, [getAppointmentRequest]);

  const showModal = (appId: string) => {
    setSelectedAppointmentId(appId);
    setIsModalVisible(true);
  };

  const handleApprove = async () => {
    if (!selectedAppointmentId) return;
    try {
      await approveAppointment(selectedAppointmentId);
      notification.success({
        message: "Success",
        description: "Appointment successfully approved!",
      });
      refetch(); // Fetch the updated list
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to approve the appointment.",
      });
    } finally {
      setIsModalVisible(false);
      setSelectedAppointmentId(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedAppointmentId(null);
  };

  return (
    <div className="app-request-container">
      <div className="app-request-wrapper">
        {requestList?.map((data) => (
          <div className="app-request-record-card" key={data.appointment_id}>
            <div className="patient-info-wrapper">
              <div className="image-section">
                <img
                  src={data.profile_picture_url || dummyAvatar}
                  alt="Patient"
                />
              </div>
              <div className="patient-info">
                <p>{`${data.patient_details.first_name} ${data.patient_details.last_name}`}</p>
                <p>
                  {calculateAge(data.patient_details.date_of_birth)} yrs,{" "}
                  {data?.patient_details.gender}
                </p>
                <p className="flex items-center">
                  <span className="mr-1">
                    <LocationPin />
                  </span>
                  {data.patient_details.country}
                </p>
              </div>
            </div>

            <div className="symptom-info text-center">
              <p>Symptoms</p>
              <p>{data.symptoms}</p>
            </div>
            <div className="patient-preferred-date text-center">
              <p>Preferred Date</p>
              <p>{data.time_slot_details.from_date}</p>
            </div>
            <div className="patient-preferred-time text-center">
              <p>Preferred Time</p>
              <p>
                {`${data.time_slot_details.start_time} - ${data.time_slot_details.end_time}`}
              </p>
            </div>
            <div className="icon-container">
              <div className="icon-wrapper-calender">
                <TotalAppointment />
              </div>
              <div className="icon-wrapper-cancel">
                <CancelButton />
              </div>
              <div
                className="icon-wrapper-tick"
                onClick={() => showModal(data.appointment_id)}
              >
                <Tick />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="Approve Appointment"
        visible={isModalVisible}
        onOk={handleApprove}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to approve this appointment?</p>
      </Modal>
    </div>
  );
};
