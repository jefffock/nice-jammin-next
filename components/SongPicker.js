import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

export default function SongPicker({ songs, song, setSong, wide }) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [uniqueSongs, setUniqueSongs] = useState(null)


  useEffect(() => {
    let titlesOnly = new Set()
    if (songs) {
      for (var i = 0; i < songs.length; i++) {
        titlesOnly.add(songs[i].song)
      }
      let formattedSongs = []
      titlesOnly.forEach(song => {
        formattedSongs.push({
          label: song
        })
      })
      setUniqueSongs(formattedSongs)
    }
  }, [])

  useEffect(() => {
    setSong(value)
  }, [value])

  useEffect(() => {
    setValue(inputValue)
    setSong(inputValue)
  }, [inputValue])

  useEffect(() => {
    if (!song) {
      setValue('')
      setInputValue('')
    }
  }, [song])

  if (!wide) {
    return (
      <Autocomplete
        disablePortal
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="song-picker"
        options={uniqueSongs ? uniqueSongs : [{ label: 'Song' }]}
        sx={{ mb:1, width: 120 }}
        size='small'
        renderInput={(params) => <TextField {...params} label="Song" />}
      />
    );
  } if (wide) {
    return (
      <Autocomplete
      disablePortal
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="song-picker"
      options={uniqueSongs ? uniqueSongs : [{ label: 'Song' }]}
      sx={{ mb:1, width: 240 }}
      size='small'
      renderInput={(params) => <TextField {...params} label="Song" />}
    />
    )
  }
}