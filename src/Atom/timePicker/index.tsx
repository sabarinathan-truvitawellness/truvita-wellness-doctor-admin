import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './timePicker.scss'

interface ControlledTimePickerProps {
  initialTime: string; 
}

export const TimeSlotPicker: React.FC<ControlledTimePickerProps> = ({ initialTime }) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(initialTime));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
};

