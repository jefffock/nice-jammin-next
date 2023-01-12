import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'

let options = [
  {label: 20, value: 20},
  {label: 50, value: 50},
  {label: 100, value: 100},
  {label: 200, value: 200},
  {label: 'All', value: null},
]

export default function JamLimitPicker({ limit, setLimit }) {

  const handleChange = (event) => {
    setLimit(event.target.value);
  };

  return (
    <Box my='0.4em'>
      <FormControl sx={{ minWidth: 180, mx:'0.5em' }} size= 'small'>
        <InputLabel id="jam-limit-select">How many to display</InputLabel>
        <Select
          labelId="jam-limit-select"
          value={limit ?? 20}
          label="How many to display"
          onChange={handleChange}
          >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}