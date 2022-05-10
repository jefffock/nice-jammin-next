import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

export default function DateRangeSlider() {
  const [val, setVal] = useState([1965, 2022]);
  const [currentYear, setCurrentYear] = useState(2022)

  const handleChange = (event, newValue) => {
    console.log('new value', newValue)
    setVal(newValue);
  };

  useEffect(() => {
    let year =  new Date().getFullYear()
    setCurrentYear(year)
    setVal([1965, year])
  }, [])

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Date range'}
        value={val}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        min={1965}
        max={currentYear}
      />
    </Box>
  );
}
