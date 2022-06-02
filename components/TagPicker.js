import { useState, useEffect } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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
  {label: 'Groovy',
  value: 'groovy'},
  {label: 'Guest',
  value: 'guest'},
  {label: 'Happy',
  value: 'happy'},
  {label: 'Heavy',
  value: 'heavy'},
  {label: 'Jazzy',
  value: 'jazzy'},
  {label: 'Long',
  value: 'long'},
  {label: 'Multi-part',
  value: 'multi_part'},
  {label: 'Official Release',
  value: 'official_release'},
  {label: 'Peaks',
  value: 'peaks'},
  {label: 'Reggae',
  value: 'reggae'},
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
  {label: "That Year's Style",
  value: 'that_years_style'},
  {label: 'Trippy',
  value: 'trippy'},
  {label: 'Type II',
  value: 'type2'},
  {label: 'Unusual',
  value: 'unusual'},
];

export default function TagPicker({ tagsSelected, setTagsSelected }) {

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
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="tag-filter-select-label">Tags</InputLabel>
        <Select
          labelId="tag-filter-select-label"
          id="tag-filter-select-checkbox"
          multiple
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
    </div>
  );
}

