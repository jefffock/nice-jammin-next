import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'



let artists = [
  'All Bands',
  'The Allman Brothers Band',
  'Billy Strings',
  'Dead & Company',
  'Dopapod',
  'Furthur',
  'Goose',
  'Grateful Dead',
  'Greensky Bluegrass',
  'Jerry Garcia Band, Legion of Mary',
  "Joe Russo's Almost Dead",
  'Lettuce',
  'Lotus',
  'Medeski Martin & Wood',
  'moe.',
  'Osees',
  'Phil Lesh & Friends',
  'Phish',
  'Railroad Earth',
  'Sound Tribe Sector 9 (STS9)',
  'String Cheese Incident',
  'Trey Anastasio, TAB',
  "Umphrey's McGee",
  'Widespread Panic'
]

export default function ArtistPicker({ artist, setArtist, size, my }) {

  const handleChange = (event) => {
      setArtist(event.target.value);
  };

  return (
    <Box my={my ? my : '0.25em'}>
      <FormControl sx={{ minWidth: 120, mx:'0.25em' }} size={size ? size : 'small' }>
        <InputLabel id="artist-select">Band</InputLabel>
        <Select
          labelId="artist-select"
          value={artist ? artist : ''}
          label="Band"
          onChange={handleChange}
          >
          {artists.map((artist) => (
            <MenuItem key={artist} value={artist}>{artist}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}