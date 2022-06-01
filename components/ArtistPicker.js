import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function ArtistPicker({ start, setArtist }) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const router = useRouter()

  let artists = [
    {
      url: '/',
      label: 'All Bands'
    },
    {
      url: 'allman-brothers',
      label: 'The Allman Brothers Band'
    },
    {
      url: 'billy-strings',
      label: 'Billy Strings'
    },
    {
      url: 'dopapod',
      label: 'Dopapod'
    },
    {
      url: 'furthur',
      label: 'Furthur'
    },
    {
      url: 'grateful-dead',
      label: 'Grateful Dead'
    },
    {
      url: 'goose',
      label: 'Goose'
    },
    {
      url: 'greensky',
      label: 'Greensky Bluegrass'
    },
    {
      url: 'jgb-lom',
      label: 'Jerry Garcia Band, Legion of Mary'
    },
    {
      url: 'joe-russos-almost-dead',
      label: "Joe Russo's Almost Dead"
    },
    {
      url: 'lettuce',
      label: 'Lettuce'
    },
    {
      url: 'lotus',
      label: 'Lotus'
    },
    {
      url: 'medeski-martin-wood',
      label: 'Medeski Martin & Wood'
    },
    {
      url: 'moe',
      label: 'moe.'
    },
    {
      url: 'osees',
      label: 'Osees'
    },
    {
      url: 'phil-lesh',
      label: 'Phil Lesh & Friends'
    },
    {
      url: 'phish',
      label: 'Phish'
    },
    {
      url: 'string-cheese-incident',
      label: 'String Cheese Incident'
    },
    {
      url: 'trey-anastasio-band',
      label: 'Trey Anastasio, TAB'
    },
    {
      url: 'umphreys-mcgee',
      label: "Umphrey's McGee"
    },
    {
      url: 'widespread-panic',
      label: 'Widespread Panic'
    }
  ]



  useEffect(() => {
    console.log('value', value)
    if (value !== 'All Bands' && value.label !== 'All Bands') {
      setArtist(value.label)
    }
  }, [value])

  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      value={value ? value : 'All Bands'}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      options={artists}
      sx={{ width: 300 , m: '1rem'}}
      renderInput={(params) => <TextField {...params} label="Band"/>}
    />
  );
}