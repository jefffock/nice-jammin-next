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

export default function SongPicker({ artist, songs, song, setSong, wide, size, mx, my }) {
  const [value, setValue] = useState(song || '');
  const [inputValue, setInputValue] = useState(song || '');
  const [uniqueSongs, setUniqueSongs] = useState(null)
  const [songsByArtist, setSongsByArtist] = useState(null)

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
    let artistSongSet = new Set()
    let formattedSongs = []
    if (artist) {
      //if artist is gd, jrad, furthur, dead and co
      if (artist === 'Grateful Dead' || artist === "Joe Russo's Almost Dead" || artist === 'Furthur' || artist === 'Dead & Company') {
        for (var i = 0; i < songs.length; i++) {
          if (songs[i].artist === 'Grateful Dead' || songs[i].artist === "Joe Russo's Almost Dead" || songs[i].artist === 'Furthur' || songs[i].artist === 'Dead & Company') {
            artistSongSet.add(songs[i].song)
          }
        } artistSongSet.forEach(song => {
          formattedSongs.push({ label: song })
        })
      } else {
        for (var i = 0; i < songs.length; i++) {
          if (songs[i].artist === artist) {
            formattedSongs.push({ label: songs[i].song })
          }
        }
      } setSongsByArtist(formattedSongs)
        //add songs from any of those artists
      //else
        //add songs from the artist
    }
  }, [artist])

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
      <Box mx={mx ? mx : '0.25em'}  my={my ? my : '0.25em'} sx={{ minWidth: '240px', maxWidth: '240px' }}>
        <Autocomplete
          // disablePortal
          ListboxProps={{
            sx: {maxHeight: '90vh'}
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
          options={artist ? songsByArtist :
            (uniqueSongs ? uniqueSongs : [{ label: 'Loading songs...' }])}
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