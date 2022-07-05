import { useState, useEffect } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = [
  {label: 'Acoustic',
  value: 'acoustic'},
  {label: 'Ambient/Space',
  value: 'ambient'},
  {label: 'Bliss',
  value: 'bliss'},
  {label: 'Bluesy',
  value: 'bluesy'},
  {label: 'Chaotic',
  value: 'chaotic'},
  {label: 'Crunchy',
  value: 'crunchy'},
  {label: 'Dark',
  value: 'dark'},
  {label: 'Dissonant',
  value: 'dissonant'},
  {label: 'Fast',
  value: 'fast'},
  {label: 'Funky',
  value: 'funky'},
  {label: 'Grimy',
  value: 'grimy'},
  {label: 'Groovy',
  value: 'groovy'},
  {label: 'Guest',
  value: 'guest'},
  {label: 'Happy',
  value: 'happy'},
  {label: 'Heavy',
  value: 'heavy'},
  {label: 'Historic',
  value: 'historic'},
  {label: 'Jazzy',
  value: 'jazzy'},
  {label: 'Long',
  value: 'long'},
  {label: 'Low-key',
  value: 'low_key'},
  {label: 'Mellow',
  value: 'mellow'},
  {label: 'Melodic',
  value: 'melodic'},
  {label: 'Multi-part',
  value: 'multi_part'},
  {label: 'Official Release',
  value: 'official_release'},
  {label: 'Peaks',
  value: 'peaks'},
  {label: 'Reggae',
  value: 'reggae'},
  {label: 'Rocking',
  value: 'rocking'},
  {label: 'Segue',
  value: 'seque'},
  {label: 'Shred',
  value: 'shred'},
  {label: 'Silly',
  value: 'silly'},
  {label: 'Sloppy',
  value: 'sloppy'},
  {label: 'Slow',
  value: 'slow'},
  {label: 'Sludgy',
  value: 'sludgy'},
  {label: 'Soaring',
  value: 'soaring'},
  {label: 'Soulful',
  value: 'soulful'},
  {label: 'Stop-start',
  value: 'stop_start'},
  {label: 'Synthy',
  value: 'synthy'},
  {label: 'Teases',
  value: 'teases'},
  {label: 'Tension and Release',
  value: 'tension_release'},
  {label: "That Year's Style",
  value: 'that_years_style'},
  {label: 'Trance',
  value: 'trance'},
  {label: 'Trippy',
  value: 'trippy'},
  {label: 'Type II',
  value: 'type2'},
  {label: 'Unusual',
  value: 'unusual'},
  {label: 'Upbeat',
  value: 'upbeat'},
];

export default function TagPicker({ tagsSelected, setTagsSelected, size, mx, my }) {

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTagsSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box mx={mx ? mx : '0.25em'} my={my ? my : '0.25em'} minWidth="120px">
      <FormControl sx={{ minWidth: 120 }} size={size ? size : "small"}>
        <InputLabel id="tag-filter-select-label">Tags</InputLabel>
        <Select
          labelId="tag-filter-select-label"
          id="tag-filter-select-checkbox"
          multiple
          // sx={{ bgcolor: 'primary.main' }}
          value={tagsSelected}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={() => (`${tagsSelected.length} selected`)}
          MenuProps={MenuProps}
        >
          {tags.map((tag) => (
            <MenuItem key={tag.value} value={tag.value}>
              <Checkbox checked={tagsSelected.indexOf(tag.value) > -1} />
              <ListItemText primary={tag.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

