import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


let artists = [
  'Phish',
  'Grateful Dead',
  'All Bands',
  'The Allman Brothers Band',
  'Billy Strings',
  'Dopapod',
  'Furthur',
  'Goose',
  'Greensky Bluegrass',
  'Jerry Garcia Band, Legion of Mary',
  "Joe Russo's Almost Dead",
  'Lettuce',
  'Lotus',
  'Medeski Martin & Wood',
  'moe.',
  'Osees',
  'Phil Lesh & Friends',
  'String Cheese Incident',
  'Trey Anastasio, TAB',
  "Umphrey's McGee",
  'Widespread Panic'
]

export default function ArtistPicker({ artist, setArtist}) {

  const handleChange = (event) => {
      setArtist(event.target.value);
  };

  return (
    <FormControl sx={{ mb:1, minWidth: 120 }} size="small">
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