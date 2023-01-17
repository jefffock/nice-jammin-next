import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Box from '@mui/material/Box';

export default function DatePicker({ setDate, my, date }) {
  const [value, setValue] = useState(null);

  const handleChange = (newValue) => {
    if (newValue) {
      setValue(newValue);
      let stringedDate = newValue.toJSON().slice(0, 10)
      setDate(stringedDate)
    }
  };
  
  useEffect(() => {
    if (!date) {
      setValue(null)
    }
  })

  return (
    <Box my={my ? my : '0.5em'} sx={{ mx:'0.25em' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Date"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            />
      </LocalizationProvider>
    </Box>
  );
}
