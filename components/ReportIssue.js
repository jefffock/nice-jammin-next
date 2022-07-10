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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box'
import FlagIcon from '@mui/icons-material/Flag';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { reportIssue } from '../utils/dbFunctions'

export default function ReportIssue({ user, profile, version }) {

  const [open, setOpen] = useState(false);
  const [issue, setIssue] = useState(null);
  const [linkBroken, setLinkBroken] = useState(false)
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
    setIssue(null)
    setOpen(false);
  };

  const handleIssueChange = (e) => {
    setIssue(e.target.value)
  }

  const handleCheck = () => {
    setLinkBroken(!linkBroken)
  }

  const handleSubmit = async (event) => {
    console.log('linkbroken', linkBroken, 'issue', issue)
    event.preventDefault()
    setLoading(true)
    const valid = validate()
    if (valid) {
      await reportIssue(version, profile, linkBroken, issue)
      setSuccessAlertText('Thank you for reporting this issue!')
    }
    setLoading(false)
  }

  function validate() {
    if (!linkBroken && !issue) {
      return false
    } return true
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Button
          onClick={handleClickOpen}
          sx={{ borderRadius: '50px', textTransform: 'none' }}
          >
          <FlagIcon/>Report an issue
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Report an issue</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel control={
              <Checkbox
            checked={linkBroken}
            onChange={handleCheck}
            inputProps={{ 'aria-label': 'link-broken-checkbox' }}
          />} label="Link doesn't work"></FormControlLabel>
          </FormGroup>
          <TextField
            margin="dense"
            id="issue"
            label="Details"
            type="text"
            fullWidth
            value={issue}
            variant="standard"
            multiline
            onChange={handleIssueChange}
            sx={{ mb: '1em'}}
            />
            {successAlertText &&
            <Alert severity="success" sx={{ my: '1em' }}>{successAlertText}</Alert>
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}
          sx={{ textTransform: 'none' }}
          >Close</Button>
          {!successAlertText &&
            <Button onClick={handleSubmit}
              disabled={loading || (!issue && !linkBroken)}
              sx={{ textTransform: 'none' }}>
            Report issue</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
