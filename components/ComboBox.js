import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox(props) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loaded, setLoaded] = useState(false)
  const [formattedLabels, setFormattedLabels] = useState([{ label:  `${props.default}` }])

  useEffect(() => {
    if (!loaded) {
      if (props.options) {
        let formattedArtists = [{ label: `${props.default}` }]
        for (var i = 0; i < props.options.length; i++) {
          formattedArtists.push({
            label: props.options[i].artist,
            slug: props.options[i].url
          })
        } setFormattedLabels(formattedArtists)
        setLoaded(true)
      }
    }
  }, [loaded, props, setFormattedLabels, setLoaded])

  useEffect(() => {
    console.log('value', value)
  }, [value])

  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      value={value ? value : props.default}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.setState(newValue ? newValue : '');
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      options={formattedLabels}
      sx={{ width: 300 , m: '1rem'}}
      renderInput={(params) => <TextField {...params} label={props.label}/>}
    />
  );
}