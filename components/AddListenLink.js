import { useState, useEffect } from 'react';
import { insertAddLink } from '../utils/dbFunctions'
import { checkUserAlreadyRated } from '../utils/fetchData'
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
import Box from '@mui/material/Box';


export default function AddListenLink({ song, date, location, tags, user, profile, jam }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [link, setLink] = useState(null)
  const [linkWarningText, setLinkWarningText] = useState(null)
  const [linkErrorText, setLinkErrorText] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value)
  }

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
    let valid = validateLink()
    if (valid) {
      let data = await insertAddLink(link, jam, profile.name)
      if (data) {
        setSuccess(true)
      } else {
        console.error('failed to add link')
      }
    } else {
      console.error('data not valid')
    }
    setLoading(false)
  }
  }

  const validateLink = () => {
    if (!user || !profile || !profile.can_write || !link) {
      return false
    }
    return true
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ borderRadius: '50px', textTransform: 'none', my: '.5em' }}
      >
        Add a link to this jam
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Link for {song} from {date}</DialogTitle>
        <Alert severity="info" sx={{ m: '1em'}}>Preferred sites: Relisten, YouTube. Link can be to audio only or audio + video. Thank you!</Alert>
        <DialogContent>
          {/* <DialogContentText>
            Rating art is always subjective, so just go with whatever rating feels right to you
          </DialogContentText> */}
          {!user &&
          <Alert severity="warning" sx={{ mb: '1em' }}>Please log in to add a link - thank you!</Alert>
          }
          <TextField
            autoFocus
            sx={{ mb: '1em', overflow: 'none'}}
            margin="dense"
            id="comment"
            label="Link"
            type="text"
            fullWidth
            variant="standard"
            multiline
            onChange={handleLinkChange}
            />
            {success &&
            <Alert severity="success" sx={{ m: '1em'}}>Successfully added link. Thank you! (The link will show if you refresh the page)</Alert>}
        </DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: 'none' }} onClick={handleClose}>Close</Button>
          <Button
          onClick={handleSubmit}
          disabled={loading || !link || !user || !profile || success}
          sx={{ borderRadius: '50px', textTransform: 'none' }}
          >Add Link</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
