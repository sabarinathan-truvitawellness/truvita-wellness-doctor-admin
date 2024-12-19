import React, { useState } from "react";
import "./timeSlotMaker.scss"; // Custom styles
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useCreateSlotMutation } from "../../redux/services";
import { LocalStorageKeys } from "../../utils/common/constant";

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

const defaultSlot: TimeSlot = { start: "", end: "" };

export const TimeSlotMaker = () => {

  const userId = localStorage.get(LocalStorageKeys.authToken)

  const [DoctorSlots,{isLoading,isError}] = useCreateSlotMutation({userId:userId});

  const [timeSlots, setTimeSlots] = useState<Record<string, DaySlot>>({
    SUN: { active: false, slots: [] },
    MON: { active: true, slots: [] },
    TUE: { active: false, slots: [] },
    WED: { active: false, slots: [] },
    THU: { active: false, slots: [] },
    FRI: { active: false, slots: [] },
    SAT: { active: false, slots: [] },
  });

  console.log(timeSlots)

  const validateSlot = (start: string, end: string, slots: TimeSlot[]): string | null => {
    if (!start || !end) return "Start and End times are required.";
    
    const startTime = dayjs(`1970-01-01T${start}`);
    const endTime = dayjs(`1970-01-01T${end}`);

    if (!startTime.isValid() || !endTime.isValid()) return "Invalid time format.";
    if (endTime.isBefore(startTime)) return "The end time must be greater than the start time. Please select a valid time range.";


    for (const slot of slots) {
      const slotStart = dayjs(`1970-01-01T${slot.start}`);
      const slotEnd = dayjs(`1970-01-01T${slot.end}`);
      if (
        (startTime.isBetween(slotStart, slotEnd, null, "[)")) ||
        (endTime.isBetween(slotStart, slotEnd, null, "(]")) ||
        (startTime.isSame(slotStart) && endTime.isSame(slotEnd))
      ) {
        return "Times overlap with another slot.";
      }
    }

    return null;
  };

  const calculateTotalHours = (slots: TimeSlot[]): number => {
    return slots.reduce((total, slot) => {
      const startTime = dayjs(`1970-01-01T${slot.start}`);
      const endTime = dayjs(`1970-01-01T${slot.end}`);
      return total + endTime.diff(startTime, "hour", true);
    }, 0);
  };

  const handleAddSlot = (day: string) => {
    const daySlot = timeSlots[day];
    const totalHours = calculateTotalHours(daySlot.slots);
    if (totalHours >= 24) return;

    const newSlots = [...daySlot.slots, { ...defaultSlot }];
    setTimeSlots({
      ...timeSlots,
      [day]: { ...daySlot, slots: newSlots, error: null },
    });
  };

  const handleRemoveSlot = (day: string, index: number) => {
    const daySlot = timeSlots[day];
    const newSlots = daySlot.slots.filter((_, i) => i !== index);
    setTimeSlots({
      ...timeSlots,
      [day]: { ...daySlot, slots: newSlots },
    });
  };

  const handleSlotChange = (day: string, index: number, key: "start" | "end", value: Dayjs | null) => {
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
  };

  return (
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
                    value={slot.start ? dayjs(`1970-01-01T${slot.start}`) : null}
                    onChange={(value) => handleSlotChange(day, index, "start", value)}
                  />
                  <span>-</span>
                  <TimePicker
                    value={slot.end ? dayjs(`1970-01-01T${slot.end}`) : null}
                    onChange={(value) => handleSlotChange(day, index, "end", value)}
                  />
                </LocalizationProvider>
                <button onClick={() => handleRemoveSlot(day, index)} className="remove-slot">
                  x
                </button>
              </div>
            ))}
          {daySlot.error && <div className="error-text">{daySlot.error}</div>}
        </div>
      ))}
    </div>
  );
};
