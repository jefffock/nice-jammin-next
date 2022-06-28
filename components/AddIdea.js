import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
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
import Box from '@mui/material/Box'
import { addTenPoints } from '../utils/dbFunctions'
import { fetchSongs } from '../utils/fetchData'
import FormHelperText from '@mui/material/FormHelperText';



export default function AddIdea({ user, profile }) {
  const [open, setOpen] = useState(false);
  const [ideaToAdd, setIdeaToAdd] = useState(null)
  const [ideaError, setIdeaError] = useState(false)
  const [ideaType, setIdeaType] = useState(null)
  const [ideaTypeError, setIdeaTypeError] = useState(false)
  const [loading, setLoading] = useState(null)

  const [successAlertText, setSuccessAlertText] = useState(null)

  const handleClickOpen = () => {
    setLoading(false)
    setSuccessAlertText(null)
    setOpen(true);
  };

  const handleClose = () => {
    setLoading(false)
    setSuccessAlertText(null)
    setIdeaToAdd(null)
    setIdeaType(null)
    setOpen(false);
  };

  const handleIdeaChange = (e) => {
    setIdeaToAdd(e.target.value)
    if (ideaError) {
      setIdeaError(false)
    } if (successAlertText) {
      setSuccessAlertText(null)
    }
  }

  const handleTypeChange = (e) => {
    if (ideaTypeError) {
      setIdeaTypeError(false)
    }
    setIdeaType(e.target.value)
    if (successAlertText) {
      setSuccessAlertText(null)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const valid = validate()
    if (valid) {
      console.log('user', user)
      await insertSong()
    }
    setLoading(false)
  }

  function validate() {
    if (!ideaType) {
      setIdeaTypeError(true)
      return false
    } if (!ideaToAdd) {
      setIdeaError(true)
      return false
    } if (!user || !profile || !profile.can_write) {
      return false
    }
  }

  async function insertSong() {
    const { error } = await supabase
      .from('songs')
      .insert(
        { song: songToAdd, submitter_name: profile.name }, { returning: 'minimal' })
    if (error) {
      console.log(error)
    } else {
      setSuccessAlertText(`Idea added successfully - Thank you!`)
      setLoading(false)
      addTenPoints(profile.name)
      let newSongs = await fetchSongs()
      setSongs(newSongs)
    }
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ borderRadius: '50px', textTransform: 'none', my: '.5em' }}
          >
          Add Suggestion
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Suggestion</DialogTitle>
        <DialogContent>
          {/*
          //select type: artist, tag, other
          //text
          */}
          {!user &&
          <Alert severity="warning" sx={{ mb: '1em' }}>Please log in to add a suggestion - thank you!</Alert>
          }
          <FormControl sx={{ minWidth: 120, mx:'0.25em', my:'1em' }}>
            <InputLabel id="idea-type">Type</InputLabel>
            <Select
              labelId="idea-type-select"
              value={ideaType ? ideaType : ''}
              label="Type"
              onChange={handleTypeChange}
              error={ideaTypeError}
              >
                <MenuItem key={1} value={'artist_idea'}>Artist</MenuItem>
                <MenuItem key={2} value={'tag_idea'}>Tag</MenuItem>
                <MenuItem key={3} value={'other_idea'}>Other</MenuItem>
            </Select>
            {ideaTypeError &&
            <FormHelperText>Required</FormHelperText>
            }
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="idea-to-add"
            label="Your suggestion"
            type="text"
            fullWidth
            value={ideaToAdd}
            variant="standard"
            multiline
            onChange={handleIdeaChange}
            error={ideaError}
            helperText={ideaError ? "Required" : ''}
            />
            {successAlertText &&
            <Alert severity="success" sx={{ mb: '1em' }}>{successAlertText}</Alert>
            }
        </DialogContent>
        <DialogActions>
          {!successAlertText &&
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}
              disabled={loading}>
            Add This Suggestion</Button>
          </>
          }
          {successAlertText &&
            <Button onClick={handleClose}>Close</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
