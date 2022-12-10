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

export default function SongPicker({ artist, songs, song, setSong, setlist, wide, size, mx, my }) {
  const [value, setValue] = useState(song || '');
  const [inputValue, setInputValue] = useState(song || '');
  const [uniqueSongs, setUniqueSongs] = useState(null)
  const [songsByArtist, setSongsByArtist] = useState(null)

  useEffect(() => {
    let titlesOnly = new Set()
    let formattedSongs = []
      if (setlist) {
        setlist.forEach(song => {
          titlesOnly.add(song)
        })
      }
      else if (songs) {
        if (artist) { 
        let artistSongs = new Set()
        let otherSongs = new Set()
        if (artist === "Joe Russo's Almost Dead" || artist === 'Furthur' || artist === 'Dead & Company') {
          for (var i = 0; i < songs.length; i++) {
            if (songs[i].artist === 'Grateful Dead' || songs[i].artist === artist) {
              artistSongs.add(songs[i].song)
            } else {
              otherSongs.add(songs[i].song)
            }
          } 
        } else {
          for (var i = 0; i < songs.length; i++) {
            if (songs[i].artist === artist) {
             artistSongs.add(songs[i].song)
            } else {
              otherSongs.add(songs[i].song)
            }
          } 
        }
        artistSongs.forEach(song => titlesOnly.add(song))
        otherSongs.forEach(song => titlesOnly.add(song))
      } else { //no artist
        songs.forEach(song => {
          titlesOnly.add(song.song);
        })
      }
    }
    titlesOnly.forEach(song => {
      formattedSongs.push({
        label: song
      })
    })
    setUniqueSongs(formattedSongs)
  }, [songs, setlist, artist])

  useEffect(() => {
    setSong(inputValue)
  }, [inputValue, setValue, setSong])

  useEffect(() => {
    if (!song) {
      setValue('')
      setInputValue('')
    }
  }, [song])

    return (
      <Box mx={mx ? mx : '0.25em'}  my={my ? my : '0.25em'} sx={{ 
        minWidth: '240px',
        maxWidth: '240px',
      }}>
        <Autocomplete
          // disablePortal
          ListboxProps={{
            sx: {maxHeight: '50vh'}
          }}
          freeSolo
          selectOnFocus={true}
          openOnFocus={true}
          fullWidth
          value={value ? value : ''}
          isOptionEqualToValue={(option, value) => option === value}
          onChange={(event, newValue) => {
            setValue(newValue);
            // setOpen(false)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="song-picker"
          // maxHeight="95vh"
          // sx={{maxHeight: '95vh'}}
          options={uniqueSongs ?? [{ label: 'Loading songs...' }]}
          size={size ? size : 'small'}
          renderInput={(params) => <TextField {...params}
          // InputProps={{
          //   style: { maxHeight: 100}
          // }}
          label="Song"/>
        }
        />
      </Box>
    );
  }