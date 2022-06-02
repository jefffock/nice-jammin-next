import { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DateFilter({ before, beforeDate, setBeforeDate, afterDate, setAfterDate }) {
  const [dates, setDates] = useState([1965])

  useEffect(() => {
    let fullDates = []
    let currentYear = 2022
    for (var i = 1965; i <= currentYear; i++) {
      fullDates.push(i)
    } setDates(fullDates)
  })

  function handleChange(event) {
    let newDate = event.target.value
    before ? setBeforeDate(newDate) : setAfterDate(newDate)
  }

  return (
    <>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    <InputLabel id="before-select">{before ? 'Before' : 'After'}</InputLabel>
    <Select
      labelId="before-select"
      value={before ? beforeDate : afterDate}
      label={before ? 'Before' : 'After'}
      onChange={handleChange}
      >
      {dates.map((date) => (
        <MenuItem key={date} value={date}>{date}</MenuItem>
        ))}
    </Select>
  </FormControl>
        </>
  )
}