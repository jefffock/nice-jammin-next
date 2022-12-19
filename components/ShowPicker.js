import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'



export default function ShowPicker({ show, shows, setShow, setDate, setLocation, size, my }) {

  const handleChange = (event) => {
    console.log('valueee', event.target.value)
      setShow(event.target.value);
      setDate(event.target.value.showdate)
      setLocation(event.target.value.location)
  };

  return (
    <Box my={my ? my : '0.25em'}>
      <FormControl sx={{ minWidth: 120, maxWidth: 240, mx:'0.25em' }} size={size ? size : 'small' }>
        <InputLabel id="show-select">Show</InputLabel>
        <Select
          labelId="show-select"
          value={show ?? ''}
          label="Show"
          onChange={handleChange}
          >
          {shows.map((show, index) => {
            const label = (show.isjamchart === '1' ? '☆ ' : '') + (show.alreadyAdded ? '(Added) ' : '') + show.label
            return (
              <MenuItem key={index} value={show} disabled={show.alreadyAdded}>{label}</MenuItem>
            )}
          )}
        </Select>
      </FormControl>
    </Box>
  );
}