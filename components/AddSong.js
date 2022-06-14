import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import TagPicker from './TagPicker'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';

export default function AddSong({ song, user }) {
  const [open, setOpen] = useState(false);
  const [songToAdd, setSongToAdd] = useState(song)

  useEffect(() => {
    setSongToAdd(song)
  }, [song])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    //validate rating, comment, tags
    //verify user perms
    //submit
    //add points
  }

  const handleSongChange = (e) => {
    setSongToAdd(e.target.value)
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ borderRadius: '50px', textTransform: 'none', my: '.5em' }}
      >
        Add {song}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add {song}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Rating art is always subjective, so just go with whatever rating feels right to you
          </DialogContentText> */}
          {!user &&
          <Alert severity="warning" sx={{ mb: '1em' }}>Please log in to add this song - thank you!</Alert>
          }
          {user &&
          <Alert severity="warning" sx={{ mb: '1em' }}>Please double check for typos - thank you!</Alert>
          }
            <FormControl>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="song-to-add"
            // label="Song"
            type="text"
            fullWidth
            value={songToAdd}
            variant="standard"
            multiline
            onChange={handleSongChange}
          />
          <br></br>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add This Song</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
