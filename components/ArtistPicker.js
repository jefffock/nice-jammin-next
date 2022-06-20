import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


let artists = [
  'All Bands',
  'The Allman Brothers Band',
  'Billy Strings',
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
  'Phish',
  'Osees',
  'Phil Lesh & Friends',
  'String Cheese Incident',
  'Trey Anastasio, TAB',
  "Umphrey's McGee",
  'Widespread Panic'
]

export default function ArtistPicker({ artist, setArtist, size}) {

  const handleChange = (event) => {
      setArtist(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120, m:'0.25em' }} size={size ? size : 'small' }>
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
  );
}