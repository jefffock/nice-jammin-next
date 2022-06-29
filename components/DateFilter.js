import { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DateFilter({ before, beforeDate, setBeforeDate, afterDate, setAfterDate }) {
  const [dates, setDates] = useState([1965])

  useEffect(() => {
    let fullDates = []
    let currentYear = new Date().getFullYear()
    for (var i = currentYear; i > 1964; i--) {
      fullDates.push(i)
    } setDates(fullDates)
  }, [])

  function handleChange(event) {
    let newDate = event.target.value
    before ? setBeforeDate(newDate) : setAfterDate(newDate)
  }

  return (
    <>
    <FormControl sx={{ minWidth: 120,  m:'0.25em' }} size="small">
    <InputLabel id={ before ? "before-date-select" : "after-date-select"}>{before ? 'Before' : 'After'}</InputLabel>
    <Select
      labelId={ before ? "before-date-select" : "after-date-select"}
      value={before ? beforeDate : afterDate}
      label={before ? 'Before' : 'After'}
      onChange={handleChange}
      // sx={{ bgcolor: 'primary.main' }}
      >
      {dates.map((date) => (
        <MenuItem key={date} value={date}>{date}</MenuItem>
        ))}
    </Select>
  </FormControl>
        </>
  )
}