import React, { useEffect, useRef, useState } from "react";
import "./timeSlotMaker.scss"; // Custom styles
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  useCreateSlotMutation,
  useGetSlotDataQuery,
  useEditSlotMutation,
} from "../../redux/services";
import { LocalStorageKeys } from "../../utils/common/constant";
import { Button } from "../../Atom/button";
import { notification } from "antd";
import { Input, Select } from "../../Atom";
import moment from "moment";

// Add the isBetween plugin
dayjs.extend(isBetween);

type TimeSlot = {
  start: string;
  end: string;
};

type DaySlot = {
  active: boolean;
  slots: TimeSlot[];
  error?: string | null;
};
type TimeZoneOption = {
  label: string;
  value: string; // Adjusted to match the string format
};
const defaultSlot: TimeSlot = { start: "09:00", end: "17:00" };

export const TimeSlotMaker = () => {
  const userId = localStorage.getItem("userId");
  const [DoctorSlots, { isLoading }] = useCreateSlotMutation();
  const { data: getSlotData } = useGetSlotDataQuery(userId);
  const [EditSlot] = useEditSlotMutation();

  const [timeSlots, setTimeSlots] = useState<Record<string, DaySlot>>({
    SUN: { active: false, slots: [] },
    MON: { active: false, slots: [] },
    TUE: { active: false, slots: [] },
    WED: { active: false, slots: [] },
    THU: { active: false, slots: [] },
    FRI: { active: false, slots: [] },
    SAT: { active: false, slots: [] },
  });
  const [formData, setFormData] = useState({
    slotCost: "0",
    timeZone: "",
    duration: "15",
    daysToShow:"0"
  });
  const [timeZones, setUsTimeZones] = useState<TimeZoneOption[]>([]);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const onchangeHandler = (value: string | number, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  
    // Clear the previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  
    // Set a new timeout
    const newTimeoutId = setTimeout(() => {
      handleSessionUpdate();
    }, 500); // Adjust the delay as needed
  
    setTimeoutId(newTimeoutId);
  };

  // const onchangeHandler = (value: string | number, name: string) => {
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }
  
  //    setTimeout(() => {
  //     handleSessionUpdate();
  //   }, 500); // Adjust the delay (500ms) as per your requirement
  // };

  console.log(formData, timeSlots);

  useEffect(() => {
    handleSessionUpdate();
  }, [timeSlots]);

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

  useEffect(() => {
    if (getSlotData) {
      setFormData({
        duration: getSlotData?.duration,
        slotCost: getSlotData?.doctor_fees,
        timeZone: getSlotData?.timezone,
        daysToShow:getSlotData?.days_to_show
      });
    }
  }, [getSlotData]);
  // Map Get API response to state
  useEffect(() => {
    if (getSlotData) {
      const updatedSlots = Object.keys(timeSlots).reduce((acc, day) => {
        const dayData =
          getSlotData.weekly_hours.find((item: any) => item.day === day) || {};
        acc[day] = {
          active: dayData.available || false,
          slots:
            dayData.time_blocks?.map((block: any) => ({
              start: block.start_time.slice(0, 5), // Format to HH:mm
              end: block.end_time.slice(0, 5),
            })) || [],
          error: null,
        };
        return acc;
      }, {} as Record<string, DaySlot>);

      setTimeSlots(updatedSlots);
    }
  }, [getSlotData]);

  const handleSessionUpdate = async () => {
    const payload = {
      userId: userId,
      slotData: {
        weekly_hours: Object.keys(timeSlots).map((day) => ({
          day,
          available: timeSlots[day].active,
          time_blocks: timeSlots[day].slots.map((slot) => ({
            start_time: `${slot.start}:00`,
            end_time: `${slot.end}:00`,
          })),
        })),
        timezone: formData.timeZone,
        duration: parseInt(formData.duration, 10),
        doctor_fees: parseInt(formData.slotCost, 10),
        days_to_show: parseInt(formData.daysToShow)
      },
    };

    try {
      await DoctorSlots(payload).unwrap();
    } catch (error) {
      console.error("Session update error:", error);
    }
  };

  // const handleAddSlot = (day: string) => {
  //   const daySlot = timeSlots[day];
  //   const totalHours = calculateTotalHours(daySlot.slots);
  //   if (totalHours >= 24) return;

  //   const newSlots = [...daySlot.slots, { ...defaultSlot }];
  //   console.log("newSlots",newSlots)
  //   setTimeSlots({
  //     ...timeSlots,
  //     [day]: { ...daySlot, slots: newSlots, error: null },
  //   });
  //   handleSessionUpdate();
  // };

  const handleAddSlot = (day: string) => {
    const daySlot = timeSlots[day];
    const newSlots = [...daySlot.slots];

    if (newSlots.length === 0) {
      // Add the default slot as the first slot
      newSlots.push({ ...defaultSlot });
    } else {
      // Get the last slot's end time
      const lastSlot = newSlots[newSlots.length - 1];
      const [lastEndHour, lastEndMinute] = lastSlot.end.split(":").map(Number);

      let nextStartHour = lastEndHour;
      let nextStartMinute = lastEndMinute;

      // Add 1 hour to the last slot's end time
      nextStartHour += 1;

      // Ensure time doesn't exceed 23:59
      if (nextStartHour >= 24) nextStartHour = 23;

      const nextStart = `${nextStartHour
        .toString()
        .padStart(2, "0")}:${nextStartMinute.toString().padStart(2, "0")}`;
      const nextEndHour = nextStartHour + 1;

      const nextEnd = `${Math.min(nextEndHour, 23)
        .toString()
        .padStart(2, "0")}:${nextStartMinute.toString().padStart(2, "0")}`;

      newSlots.push({ start: nextStart, end: nextEnd });
    }

    setTimeSlots({
      ...timeSlots,
      [day]: { ...daySlot, slots: newSlots, error: null },
    });
    handleSessionUpdate();
  };

  const handleRemoveSlot = (day: string, index: number) => {
    const daySlot = timeSlots[day];
    const newSlots = daySlot.slots.filter((_, i) => i !== index);
    setTimeSlots({
      ...timeSlots,
      [day]: { ...daySlot, slots: newSlots },
    });
    handleSessionUpdate();
  };

  const handleSlotChange = (
    day: string,
    index: number,
    key: "start" | "end",
    value: Dayjs | null
  ) => {
    const daySlot = timeSlots[day];
    const newSlots = [...daySlot.slots];
    newSlots[index][key] = value ? value.format("HH:mm") : "";

    const error = validateSlot(
      newSlots[index].start,
      newSlots[index].end,
      newSlots.filter((_, i) => i !== index)
    );

    setTimeSlots({
      ...timeSlots,
      [day]: { ...daySlot, slots: newSlots, error },
    });
    handleSessionUpdate();
  };

  const toggleDay = (day: string) => {
    const daySlot = timeSlots[day];
    setTimeSlots({
      ...timeSlots,
      [day]: {
        active: !daySlot.active,
        slots: !daySlot.active ? [{ ...defaultSlot }] : [],
        error: null,
      },
    });
    handleSessionUpdate();
  };

  const handleFinalSubmit = async () => {
    try {
      const payload = {
        userId: userId,
        slotData: {
          weekly_hours: Object.keys(timeSlots).map((day) => ({
            day,
            available: timeSlots[day].active,
            time_blocks: timeSlots[day].slots.map((slot) => ({
              start_time: `${slot.start}:00`,
              end_time: `${slot.end}:00`,
            })),
          })),
          timezone: formData.timeZone,
          duration: parseInt(formData.duration, 10),
          doctor_fees: parseInt(formData.slotCost, 10),
          days_to_show: parseInt(formData.daysToShow)
        },
      };

      const response = await EditSlot(payload).unwrap();
      notification.success({
        message: "Slots Saved Successfully",
        description: "Your availability slots have been saved to the database.",
      });
      console.log("Save Response:", response);
    } catch (error) {
      console.error("Save Error:", error);
      notification.error({
        message: "Error Saving Slots",
        description: "An error occurred while saving slots. Please try again.",
      });
    }
  };

  const calculateTotalHours = (slots: TimeSlot[]): number => {
    return slots.reduce((total, slot) => {
      const startTime = dayjs(`1970-01-01T${slot.start}`);
      const endTime = dayjs(`1970-01-01T${slot.end}`);
      return total + endTime.diff(startTime, "hour", true);
    }, 0);
  };

  const validateSlot = (
    start: string,
    end: string,
    slots: TimeSlot[]
  ): string | null => {
    if (!start || !end) return "Start and End times are required.";

    const startTime = dayjs(`1970-01-01T${start}`);
    const endTime = dayjs(`1970-01-01T${end}`);

    if (!startTime.isValid() || !endTime.isValid())
      return "Invalid time format.";
    if (endTime.isBefore(startTime))
      return "End time must be after start time.";

    for (const slot of slots) {
      const slotStart = dayjs(`1970-01-01T${slot.start}`);
      const slotEnd = dayjs(`1970-01-01T${slot.end}`);
      if (
        startTime.isBetween(slotStart, slotEnd, null, "[)") ||
        endTime.isBetween(slotStart, slotEnd, null, "(]") ||
        (startTime.isSame(slotStart) && endTime.isSame(slotEnd))
      ) {
        return "Times overlap with another slot.";
      }
    }

    return null;
  };

  return (
    <>
      <div className="time-zone-selector">
        <div className="tzs-wrapper">
          <p>Set your location’s Time Zone </p>
          <Select
            label={""}
            value={formData["timeZone"]}
            options={timeZones}
            onChange={onchangeHandler}
            name={"timeZone"}
            helperText={""}
          />

          <Input
            type="text"
            placeholder="Session Cost"
            onChange={onchangeHandler}
            name="slotCost"
            label="Per Session Cost"
            externalClassName="internal-input-firstname"
            // helperText={error["firstName"] || ""}
            required={true}
            variant="outlined"
            // error={error.firstName === "" ? false : !!error.firstName}
            value={formData["slotCost"] || ""}
          />

          <Input
            type="text"
            placeholder="Session Duration"
            onChange={onchangeHandler}
            name="duration"
            label="Per Session Duration"
            externalClassName="internal-input-firstname"
            // helperText={error["firstName"] || ""}
            required={true}
            variant="outlined"
            // error={error.firstName === "" ? false : !!error.firstName}
            value={formData["duration"] || ""}
          />

          <Input
            type="text"
            placeholder="Days To Show"
            onChange={onchangeHandler}
            name="daysToShow"
            label="Days To Show"
            externalClassName="internal-input-firstname"
            // helperText={error["firstName"] || ""}
            required={true}
            variant="outlined"
            // error={error.firstName === "" ? false : !!error.firstName}
            value={formData["daysToShow"] || ""}
          />
        </div>
      </div>
      <div className="time-slot-maker">
        {Object.entries(timeSlots).map(([day, daySlot]) => (
          <div key={day} className="day-slot">
            <div className="day-header">
              <input
                type="checkbox"
                checked={daySlot.active}
                onChange={() => toggleDay(day)}
              />
              <span>{day}</span>
              {daySlot.active && (
                <button
                  onClick={() => handleAddSlot(day)}
                  className="add-slot"
                  disabled={calculateTotalHours(daySlot.slots) >= 24}
                >
                  +
                </button>
              )}
            </div>

            {daySlot.active &&
              daySlot.slots.map((slot, index) => (
                <div key={index} className="slot-row">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={
                        slot.start ? dayjs(`1970-01-01T${slot.start}`) : null
                      }
                      onChange={(value) =>
                        handleSlotChange(day, index, "start", value)
                      }
                    />
                    <span>-</span>
                    <TimePicker
                      value={slot.end ? dayjs(`1970-01-01T${slot.end}`) : null}
                      onChange={(value) =>
                        handleSlotChange(day, index, "end", value)
                      }
                    />
                  </LocalizationProvider>
                  <button
                    onClick={() => handleRemoveSlot(day, index)}
                    className="remove-slot"
                  >
                    x
                  </button>
                </div>
              ))}
            {daySlot.error && <div className="error-text">{daySlot.error}</div>}
          </div>
        ))}

        <Button buttonText="Save Changes" onClick={handleFinalSubmit} />
      </div>
    </>
  );
};
