import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'

let sortOptions = [
    'Newest',
    'Oldest',
    'Rating',
    'Number of Ratings',
    'Recently Added',
    'Song A-Z',
    'Artist A-Z',
    'Song Z-A',
    'Artist Z-A',
]

export default function Sorter({ orderBy, setOrderBy, setOrder, size, my }) {

  const [label, setLabel] = useState('Recently Added')

  const handleChange = (event) => {
      setLabel(event.target.value);
      switch (event.target.value) {
        case 'Newest':
          setOrderBy('date')
          setOrder('desc')
          break
        case 'Oldest':
          setOrderBy('date')
          setOrder('asc')
          break;
        case 'Rating':
          setOrderBy('avg_rating')
          setOrder('desc')
          break;
        case 'Number of Ratings':
          setOrderBy('num_ratings')
          setOrder('desc')
          break;
        case 'Song A-Z':
          setOrderBy('song_name')
          setOrder('asc')
          break;
        case 'Artist A-Z':
          setOrderBy('artist')
          setOrder('asc')
          break;
        case 'Song Z-A':
          setOrderBy('song_name')
          setOrder('desc')
          break;
        case 'Artist Z-A':
          setOrderBy('artist')
          setOrder('desc')
          break;
        case 'Recently Added':
          setOrderBy('id')
          setOrder('desc')
          break;
        }
  };

  return (
    <div>
      <Box my={my ? my : '1em'} sx={{
        display: 'flex',
        justifyContent: 'center'

      }}>
        <FormControl sx={{ minWidth: 120, mx:'0.25em' }} size={size ? size : 'small' }>
          <InputLabel id="sorter">Sort by</InputLabel>
          <Select
            labelId="sorter"
            value={label}
            label="Sort by"
            onChange={handleChange}
            >
            {sortOptions.map((sort) => (
              <MenuItem key={sort} value={sort}>{sort}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}