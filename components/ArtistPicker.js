import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10,
      width: 300,
    },
  },
};

let artists = [
  'All Bands',
  'Phish',
  'Grateful Dead',
  'The Allman Brothers Band',
  'Aqueous',
  'Billy Strings',
  'Chris Robinson Brotherhood',
  'Dead & Company',
  'Disco Biscuits',
  'Dizgo',
  'Dopapod',
  'Eggy',
  'Frank Zappa',
  'Furthur',
  'Ghost Light',
  'Goose',
  "Gov't Mule",
  'Grateful Dead',
  'Greensky Bluegrass',
  'Jerry Garcia Band, Legion of Mary',
  "Joe Russo's Almost Dead",
  'King Gizzard & the Lizard Wizard',
  'Lettuce',
  'Lotus',
  'Medeski Martin & Wood',
  'moe.',
  'The Mothers of Invention',
  'Mungion',
  'My Morning Jacket',
  'Neighbor',
  'Osees',
  'Phil Lesh & Friends',
  'Phish',
  'Railroad Earth',
  'Sound Tribe Sector 9 (STS9)',
  'String Cheese Incident',
  'Squeaky Feet',
  'Tedeschi Trucks Band',
  'Trey Anastasio, TAB',
  "Umphrey's McGee",
  'Widespread Panic',
  'All Bands',
]

export default function ArtistPicker({ artist, setArtist, size, my }) {

  const handleChange = (event) => {
      const artist = event.target.value === 'All Bands' ? '' : event.target.value
      setArtist(artist);
  };

  return (
    <Box my={my ? my : '0.4em'}>
      <FormControl sx={{ minWidth: 180, mx:'0.5em' }} size={size ? size : 'small' }>
        <InputLabel id="artist-select">Band</InputLabel>
        <Select
          labelId="artist-select"
          value={artist ? artist : ''}
          label="Band"
          onChange={handleChange}
          MenuProps={MenuProps}
          >
          {artists.map((artist, index) => (
            <MenuItem key={index} value={artist}>{artist}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}