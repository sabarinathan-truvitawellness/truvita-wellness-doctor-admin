import React, { useState } from "react";
import "./timeSlotMaker.scss"; // Add your custom styles

type TimeSlot = {
  start: string;
  end: string;
};

type DaySlot = {
    active: boolean;
    slots: TimeSlot[];
    error?: string | null; // Add this to allow the optional error field
  };
  

const defaultSlot: TimeSlot = { start: "9:00am", end: "5:00pm" };

export const 
TimeSlotMaker = () => {
  const [timeSlots, setTimeSlots] = useState<Record<string, DaySlot>>({
    SUN: { active: false, slots: [] },
    MON: { active: true, slots: [defaultSlot] },
    TUE: { active: false, slots: [] },
    WED: { active: false, slots: [] },
    THU: { active: false, slots: [] },
    FRI: { active: false, slots: [] },
    SAT: { active: false, slots: [] },
  });

  const validateSlot = (start: string, end: string, slots: TimeSlot[]): string | null => {
    const startTime = new Date(`1970-01-01T${convertTo24Hour(start)}`);
    const endTime = new Date(`1970-01-01T${convertTo24Hour(end)}`);

    if (endTime <= startTime) return "Choose an end time later than the start time.";

    for (const slot of slots) {
      const slotStart = new Date(`1970-01-01T${convertTo24Hour(slot.start)}`);
      const slotEnd = new Date(`1970-01-01T${convertTo24Hour(slot.end)}`);

      if (
        (startTime < slotEnd && startTime >= slotStart) ||
        (endTime > slotStart && endTime <= slotEnd)
      ) {
        return "Times overlap with another set of times.";
      }
    }

    return null;
  };

 function convertTo24Hour(time: string | undefined): string {
  if (!time) {
    console.error("convertTo24Hour received undefined time");
    return ""; // Return a default or error string
  }

  const [timeValue, period] = time.split(" "); // Ensure this is safe
  if (!timeValue || !period) {
    console.error("Invalid time format: ", time);
    return "";
  }

  const [hours, minutes] = timeValue.split(":");
  const hourIn24Format =
    period.toLowerCase() === "pm" && parseInt(hours) !== 12
      ? parseInt(hours) + 12
      : period.toLowerCase() === "am" && parseInt(hours) === 12
      ? 0
      : parseInt(hours);

  return `${hourIn24Format}:${minutes}`;
}

  const handleAddSlot = (day: string) => {
    const daySlot = timeSlots[day];
    const newSlots = [...daySlot.slots, { start: "", end: "" }];
    setTimeSlots({
      ...timeSlots,
      [day]: { ...daySlot, slots: newSlots },
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

  const handleSlotChange = (day: string, index: number, key: "start" | "end", value: string) => {
    const daySlot = timeSlots[day];
    const newSlots = [...daySlot.slots];
    newSlots[index][key] = value;
  
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
        slots: !daySlot.active ? [defaultSlot] : [],
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
              <button onClick={() => handleAddSlot(day)} className="add-slot">
                +
              </button>
            )}
          </div>

          {daySlot.active &&
            daySlot.slots.map((slot, index) => (
              <div key={index} className="slot-row">
                <input
                  type="text"
                  value={slot.start}
                  placeholder="Start Time"
                  onChange={(e) => handleSlotChange(day, index, "start", e.target.value)}
                  className={validateSlot(slot.start, slot.end, daySlot.slots.filter((_, i) => i !== index)) ? "error" : ""}
                />
                <span>-</span>
                <input
                  type="text"
                  value={slot.end}
                  placeholder="End Time"
                  onChange={(e) => handleSlotChange(day, index, "end", e.target.value)}
                  className={validateSlot(slot.start, slot.end, daySlot.slots.filter((_, i) => i !== index)) ? "error" : ""}
                />
                <button onClick={() => handleRemoveSlot(day, index)} className="remove-slot">
                  x
                </button>
                <div className="helper-text">
                  {validateSlot(slot.start, slot.end, daySlot.slots.filter((_, i) => i !== index))}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};


