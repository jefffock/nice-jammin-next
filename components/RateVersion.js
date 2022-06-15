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

export default function RateVersion({ song, date, tags, user }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null)
  const [comment, setComment] = useState('')
  const [newTags, setNewTags] = useState([])
  const [tagsToAddText, setTagsToAddText] = useState('')

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

  const handleRatingChange = (e) => {
    setRating(e.target.value)
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const tagsList = [
    {label: 'Acoustic',
    value: 'acoustic'},
    {label: 'Ambient/Space',
    value: 'ambient'},
    {label: 'Bliss',
    value: 'bliss'},
    {label: 'Bluesy',
    value: 'bluesy'},
    {label: 'Chaotic',
    value: 'chaotic'},
    {label: 'Crunchy',
    value: 'crunchy'},
    {label: 'Dark',
    value: 'dark'},
    {label: 'Dissonant',
    value: 'dissonant'},
    {label: 'Fast',
    value: 'fast'},
    {label: 'Funky',
    value: 'funky'},
    {label: 'Groovy',
    value: 'groovy'},
    {label: 'Guest',
    value: 'guest'},
    {label: 'Happy',
    value: 'happy'},
    {label: 'Heavy',
    value: 'heavy'},
    {label: 'Jazzy',
    value: 'jazzy'},
    {label: 'Long',
    value: 'long'},
    {label: 'Multi-part',
    value: 'multi_part'},
    {label: 'Official Release',
    value: 'official_release'},
    {label: 'Peaks',
    value: 'peaks'},
    {label: 'Reggae',
    value: 'reggae'},
    {label: 'Segue',
    value: 'seque'},
    {label: 'Shred',
    value: 'shred'},
    {label: 'Silly',
    value: 'silly'},
    {label: 'Sloppy',
    value: 'sloppy'},
    {label: 'Slow',
    value: 'slow'},
    {label: 'Sludgy',
    value: 'sludgy'},
    {label: 'Soaring',
    value: 'soaring'},
    {label: 'Soulful',
    value: 'soulful'},
    {label: 'Stop-start',
    value: 'stop_start'},
    {label: 'Synthy',
    value: 'synthy'},
    {label: 'Teases',
    value: 'teases'},
    {label: "That Year's Style",
    value: 'that_years_style'},
    {label: 'Trippy',
    value: 'trippy'},
    {label: 'Type II',
    value: 'type2'},
    {label: 'Unusual',
    value: 'unusual'},
  ];

  useEffect(() => {
    let newTagText = ''
    for (var i = 0; i < tagsList.length; i++) {
      if (newTags.indexOf(tagsList[i].value) !== -1) {
        newTagText += tagsList[i].label + ', '
      }
    } let trimmedTags = newTagText.slice(0, newTagText.length - 2)
    setTagsToAddText(trimmedTags)
  }, [newTags])

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ borderRadius: '50px', textTransform: 'none', my: '.5em' }}
      >
        Rate this Jam
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rate &quot;{song}&quot; from {date}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Rating art is always subjective, so just go with whatever rating feels right to you
          </DialogContentText> */}
          {!user &&
          <Alert severity="warning" sx={{ mb: '1em' }}>Please log in to rate this jam - thank you!</Alert>
          }
            <FormControl>
            <InputLabel id="rating-select-label">Rating</InputLabel>
            <Select
            sx={{ width: 120, m:'0.25em' }}
            size="small"
            labelId="rating-select-label"
            id="rating-select"
            value={rating}
            label="Your Rating"
            onChange={handleRatingChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comments (optional)"
            type="text"
            fullWidth
            variant="standard"
            multiline
            onChange={handleCommentChange}
          />
          <br></br>
          <br></br>
          <TagPicker tagsSelected={newTags} setTagsSelected={setNewTags}/>
          {tagsToAddText &&
          <Typography>Tags to Add: {tagsToAddText}</Typography>
        }
          {tags &&
          <Typography>Current Tags: {tags}</Typography>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Rate</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
