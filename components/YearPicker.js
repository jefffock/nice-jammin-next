import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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

export default function YearPicker({ setShows, artist, year, setYear, clearYear, date }) {
  const [years, setYears] = useState(null)
  const [artistStartYear, setArtistStartYear] = useState(1960);
  const [artistEndYear, setArtistEndYear] = useState(2023);

  useEffect(() => {
    const fetchArtistInfo = async () => {
      let body = JSON.stringify({ artist: artist })
      const response = await fetch(`/api/artist`, {
        method: 'POST',
        body: body,
      });
      const data = await response.json();
      console.log(data)
      setArtistStartYear(data.start_year)
      const endYear = data.end_year || new Date().getFullYear()
      setArtistEndYear(endYear)
    }
    if (artist) {
      fetchArtistInfo()
    }
  }, [artist])

  useEffect(() => {
    let yearsArr = []
    const endYear = artistEndYear || new Date().getFullYear()
    const startYear = artistStartYear || 1960
    for (var i = endYear; i >= startYear; i--) {
      yearsArr.push(i);
    }
    yearsArr.push('Clear Year')
    setYears(yearsArr)
  }, [artistStartYear, artistEndYear])

  useEffect(() => {
    const fetchShows = async () => {
      let body = JSON.stringify({ artist: artist, year: year })
      let url
      switch(artist) {
        case 'Eggy':
				case 'Goose':
				case "Umphrey's McGee":
				case 'Neighbor':
          url = '/api/songfish/shows'
          break;
      }
      if (url) {
        const response = await fetch(url, {
          method: 'POST',
          body: body,
        });
        const data = await response.json();
        console.log('data', data)
        setShows(data);
      }
    }
    if (artist && year) {
      fetchShows()
    }
  }, [artist, year])

  const handleChange = (event) => {
		const yearVal =
			event.target.value === 'Clear Year' ? '' : event.target.value;
		setYear(yearVal);
	};

  if (!date) {
    return (
      <Box sx={{
        my: '0.4em',
        mb: '1em'
      }}>
        <FormControl
          sx={{ minWidth: 180, mx: '0.25em' }}
        >
          <InputLabel id='year-select'>Year</InputLabel>
          <Select
            labelId='artist-select'
            value={year ?? ''}
            label='Year'
            onChange={handleChange}
            MenuProps={MenuProps}
          >
            {years && years?.map((year, index) => (
              <MenuItem
                key={index}
                value={year}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br/>
        {year &&
        <Button onClick={clearYear}>Clear Year</Button>
        }
      </Box>
    );
  }
}
