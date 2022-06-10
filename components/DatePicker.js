import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function DatePicker({ setDate }) {
  const [value, setValue] = useState(null);

  const handleChange = (newValue) => {
    setValue(newValue);
    let stringedDate = newValue.toISOString().slice(0, 10)
    setDate(stringedDate)
  };

  // useEffect(() => {
  //   setDate(value)
  // }, [setDate, value])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Date"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}
