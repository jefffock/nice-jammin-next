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
import { fetchIdeas } from '../utils/fetchData'
import FormHelperText from '@mui/material/FormHelperText';



export default function AddIdea({ user, profile, setIdeas }) {
  const [open, setOpen] = useState(false);
  const [idea, setIdea] = useState(null)
  const [ideaError, setIdeaError] = useState(false)
  const [ideaErrorText, setIdeaErrorText] = useState(null)
  const [ideaType, setIdeaType] = useState(null)
  const [ideaTypeError, setIdeaTypeError] = useState(false)
  const [loading, setLoading] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleClickOpen = () => {
    setLoading(false)
    setSuccess(null)
    setOpen(true);
  };

  const handleClose = () => {
    setLoading(false)
    setSuccess(null)
    setIdea(null)
    setIdeaType(null)
    setIdeaError(false)
    setIdeaTypeError(false)
    setIdeaErrorText(null)
    setSuccess(false)
    setOpen(false);
  };

  const handleIdeaChange = (e) => {
    setIdea(e.target.value)
    if (ideaError) {
      setIdeaError(false)
      setIdeaErrorText(null)
    } if (success) {
      setSuccess(null)
    }
  }

  const handleTypeChange = (e) => {
    if (ideaTypeError) {
      setIdeaTypeError(false)
    }
    setIdeaType(e.target.value)
    if (success) {
      setSuccess(null)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const valid = validate()
    if (valid) {
      console.log('user', user)
      await insertIdea()
    }
    setLoading(false)
  }

  function validate() {
    if (!ideaType) {
      setIdeaTypeError(true)
      return false
    } if (!idea) {
      setIdeaError(true)
      setIdeaErrorText('Required')
      return false
    } if (idea.length > 1000) {
      setIdeaError(true)
      setIdeaErrorText('Brevity, please (1000 character limit)')
      return false
    }
    if (!user || !profile || !profile.can_write) {
      return false
    } return true
  }

  async function insertIdea() {
    let ideaToAdd = {
      user_name: profile.name,
      idea_body: idea,
      tag_idea: (ideaType === 'tag'),
      artist_idea: (ideaType === 'artist'),
      other_idea: (ideaType === 'other')
    }
    console.log('idea to add', ideaToAdd)
    const { error } = await supabase
      .from('ideas')
      .insert(ideaToAdd)
    if (error) {
      console.log('error adding idea', error)
    } else {
      setSuccess(true)
      addTenPoints(profile.name)
      let newIdeas = await fetchIdeas()
      setIdeas(newIdeas)
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
          Add Your Suggestion
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Suggestion</DialogTitle>
        <DialogContent>
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
                <MenuItem key={1} value={'artist'}>Artist to add</MenuItem>
                <MenuItem key={2} value={'tag'}>Tag to add</MenuItem>
                <MenuItem key={3} value={'other'}>Other idea</MenuItem>
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
            value={idea}
            variant="standard"
            multiline
            onChange={handleIdeaChange}
            error={ideaError}
            helperText={ideaError ? ideaErrorText : ''}
            />
            {success &&
            <Alert severity="success" sx={{ mb: '1em' }}>Suggestion added - thank you!</Alert>
            }
        </DialogContent>
        <DialogActions>
          {!success &&
          <>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}
              disabled={loading || !user || !profile || !idea || !ideaType}>
            Add This Suggestion</Button>
          </>
          }
          {success &&
            <Button onClick={handleClose}>Close</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
