import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box'

export default function SongPicker({ songs, song, setSong, wide, size, mx, my }) {
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
  }, [songs])

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

    return (
      <Box mx={mx ? mx : '0.25em'}  my={my ? my : '0.25em'} sx={{ minWidth: '120px', maxWidth: '240px' }}>
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
          options={uniqueSongs ? uniqueSongs : [{ label: 'Loading songs...' }]}
          size={size ? size : 'small'}
          renderInput={(params) => <TextField {...params} label="Song"/>}
        />
      </Box>
    );
  }