import React, { useEffect, useState } from "react";
import { Calender, CancelButton, Tick } from "../../utils/common/svgIcons";
import "./patientRecord.scss";
import dummyProfile from "../../Assets/images/header/profile-avatar-xxl.png";
import { Modal, notification } from "antd";
import dayjs from "dayjs";
import {
  useApproveAppointmentMutation,
  useGetAppointmentRequestDataQuery,
} from "../../redux/services";
import dummyAvatar from "../../Assets/images/header/profile-image-avatar.png";

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

export const PatientsRecord: React.FC = () => {
  const doctorId = localStorage.getItem("userId") || "";
  const [requestList, setRequestList] = useState<AppointmentRequestData[]>([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: getAppointmentRequest, refetch } =
    useGetAppointmentRequestDataQuery({
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
    <div className="patient-recor-super-container">
      <div className="patients-record-container">
        <h2 className="pr-title">Patient Requests</h2>
        <div className="patients-record-wrapper">
          {requestList.map((data, index) => (
          <div className="pr-short-card-container" key={index}>
            <div className="pr-short-card-wrapper">
            
              <div className="flex">
              <img
                 src={data.profile_picture_url || dummyAvatar}
                // alt={`${data.user}'s profile`}
                className="patient-image"
              />
              <div className="patient-info">
                <h3>{`${data.patient_details.first_name} ${data.patient_details.last_name}`}</h3>
                <p> {calculateAge(data.patient_details.date_of_birth)} yrs,{" "}
                {data?.patient_details.gender}</p>
              </div>
              </div>

              <div className="pr-symtom-check">
              <p>Symptoms</p>
              <p>{data.symptoms}</p>
              </div>
              <div className="pr-time">
              <p>Preferred Time</p>
              <p>
                {`${data.time_slot_details.start_time} - ${data.time_slot_details.end_time}`}
              </p>
              </div>
              <div className="pr-date">
              <p>Preferred Date</p>
              <p>{data.time_slot_details.from_date}</p>
              </div>
              <div className="btn-section">
                <button
                  className="action-btn calender-btn"
                  title="Schedule"
                  onClick={() => console.log("Calendar clicked for")}
                >
                  <Calender />
                </button>
                <button
                  className="action-btn cancel-btn"
                  title="Reject"
                  onClick={() => console.log("Rejected")}
                >
                  <CancelButton />
                </button>
                <button
                  className="action-btn tick-btn"
                  title="Accept"
                  onClick={() => showModal(data.appointment_id)}
                >
                  <Tick />
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
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
