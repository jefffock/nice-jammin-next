import { useState, useEffect } from 'react';
import { rateVersion, updateRating } from '../utils/dbFunctions'
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


export default function RateVersion({ song, date, location, tags, user, profile, jam }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(null)
  const [comment, setComment] = useState('')
  const [newTags, setNewTags] = useState([])
  const [tagsToAddText, setTagsToAddText] = useState('')
  const [userAlreadyRated, setUserAlreadyRated] = useState(false)
  const [buttonText, setButtonText] = useState('Rate')
  const [funky, setFunky] = useState(false)
  const [ambient, setAmbient] = useState(false)
  const [fast, setFast] = useState(false)
  const [slow, setSlow] = useState(false)
  const [bliss, setBliss] = useState(false)
  const [shred, setShred] = useState(false)
  const [dark, setDark] = useState(false)
  const [silly, setSilly] = useState(false)
  const [guest, setGuest] = useState(false)
  const [type2, setType2] = useState(false)
  const [groovy, setGroovy] = useState(false)
  const [peaks, setPeaks] = useState(false)
  const [reggae, setReggae] = useState(false)
  const [heavy, setHeavy] = useState(false)
  const [jazzy, setJazzy] = useState(false)
  const [trippy, setTrippy] = useState(false)
  const [soaring, setSoaring] = useState(false)
  const [crunchy, setCrunchy] = useState(false)
  const [happy, setHappy] = useState(false)
  const [acoustic, setAcoustic] = useState(false)
  const [soulful, setSoulful] = useState(false)
  const [officialRelease, setOfficialRelease] = useState(false)
  const [sloppy, setSloppy] = useState(false)
  const [tease, setTease] = useState(false)
  const [multiPart, setMultiPart] = useState(false)
  const [sludgy, setSludgy] = useState(false)
  const [synthy, setSynthy] = useState(false)
  const [chaotic, setChaotic] = useState(false)
  const [dissonant, setDissonant] = useState(false)
  const [bluesy, setBluesy] = useState(false)
  const [stopStart, setStopStart] = useState(false)
  const [segue, setSegue] = useState(false)
  const [unusual, setUnusual] = useState(false)
  const [long, setLong] = useState(false)
  const [thatYearsStyle, setThatYearsStyle] = useState(false)

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

  const validateRatingData = () => {

  }

  useEffect(() => {
    if (open) {
      console.log('open, about to check if already rated')
      let checkRated = async () => {
        let data = await checkUserAlreadyRated(profile.name, jam.id)
        if (data) {
          setComment(data[0].comment)
          setRating(parseInt(data[0].rating))
          setUserAlreadyRated(true)
          setButtonText('Update')
        }
      }
      checkRated()
    }
  }, [user, profile, jam, open])

  useEffect(() => {
    const tagsList = {
      'acoustic': 'Acoustic',
      'ambient': 'Ambient/Space',
      'bliss': 'Bliss',
      'bluesy': 'Bluesy',
      'chaotic': 'Chaotic',
      'crunchy': 'Crunchy',
      'dark': 'Dark',
      'dissonant': 'Dissonant',
      'fast': 'Fast',
      'funky': 'Funky',
      'groovy': 'Groovy',
      'guest': 'Guest',
      'happy': 'Happy',
      'heavy': 'Heavy',
      'jazzy': 'Jazzy',
      'long': 'Long',
      'multi_part': 'Multi-part',
      'official_release': 'Official Release',
      'peaks': 'Peaks',
      'reggae': 'Reggae',
      'seque': 'Segue',
      'shred': 'Shred',
      'silly': 'Silly',
      'sloppy': 'Sloppy',
      'slow': 'Slow',
      'sludgy': 'Sludgy',
      'soaring': 'Soaring',
      'soulful': 'Soulful',
      'stop_start': 'Stop-start',
      'synthy': 'Synthy',
      'teases': 'Teases',
      'that_years_style': "That Year's Style",
      'trippy': 'Trippy',
      'type2': 'Type II',
      'unusual': 'Unusual',
    }
    let newTagsText = ''
    for (var i = 0; i < newTags.length; i++) {
      newTagsText += tagsList[newTags[i]] + ', '
    } let trimmedTags = newTagsText.slice(0, newTagsText.length - 2)
    setTagsToAddText(trimmedTags)
    newTags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    newTags.indexOf('ambient') !== -1 ? setAmbient(true) : setAmbient(false)
    newTags.indexOf('bliss') !== -1 ? setBliss(true) : setBliss(false)
    newTags.indexOf('bluesy') !== -1 ? setBluesy(true) : setBluesy(false)
    newTags.indexOf('chaotic') !== -1 ? setChaotic(true) : setChaotic(false)
    newTags.indexOf('crunchy') !== -1 ? setCrunchy(true) : setCrunchy(false)
    newTags.indexOf('dark') !== -1 ? setDark(true) : setDark(false)
    newTags.indexOf('dissonant') !== -1 ? setDissonant(true) : setDissonant(false)
    newTags.indexOf('fast') !== -1 ? setFast(true) : setFast(false)
    newTags.indexOf('funky') !== -1 ? setFunky(true) : setFunky(false)
    newTags.indexOf('groovy') !== -1 ? setGroovy(true) : setGroovy(false)
    newTags.indexOf('guest') !== -1 ? setGuest(true) : setGuest(false)
    newTags.indexOf('happy') !== -1 ? setHappy(true) : setHappy(false)
    newTags.indexOf('jazzy') !== -1 ? setJazzy(true) : setJazzy(false)
    newTags.indexOf('long') !== -1 ? setLong(true) : setLong(false)
    newTags.indexOf('multi_part') !== -1 ? setMultiPart(true) : setMultiPart(false)
    newTags.indexOf('official_release') !== -1 ? setOfficialRelease(true) : setOfficialRelease(false)
    newTags.indexOf('peaks') !== -1 ? setPeaks(true) : setPeaks(false)
    newTags.indexOf('reggae') !== -1 ? setReggae(true) : setReggae(false)
    newTags.indexOf('segue') !== -1 ? setSegue(true) : setSegue(false)
    newTags.indexOf('shred') !== -1 ? setShred(true) : setShred(false)
    newTags.indexOf('silly') !== -1 ? setSilly(true) : setSilly(false)
    newTags.indexOf('sloppy') !== -1 ? setSloppy(true) : setSloppy(false)
    newTags.indexOf('slow') !== -1 ? setSlow(true) : setSlow(false)
    newTags.indexOf('sludgy') !== -1 ? setSludgy(true) : setSludgy(false)
    newTags.indexOf('soaring') !== -1 ? setSoaring(true) : setSoaring(false)
    newTags.indexOf('soulful') !== -1 ? setSoulful(true) : setSoulful(false)
    newTags.indexOf('stop_start') !== -1 ? setStopStart(true) : setStopStart(false)
    newTags.indexOf('synthy') !== -1 ? setSynthy(true) : setSynthy(false)
    newTags.indexOf('tease') !== -1 ? setTease(true) : setTease(false)
    newTags.indexOf('that_years_style') !== -1 ? setThatYearsStyle(true) : setThatYearsStyle(false)
    newTags.indexOf('trippy') !== -1 ? setTrippy(true) : setTrippy(false)
    newTags.indexOf('type2') !== -1 ? setType2(true) : setType2(false)
    newTags.indexOf('Unusual') !== -1 ? setUnusual(true) : setUnusual(false)
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
        <DialogTitle>{song} - {location} - {date}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Rating art is always subjective, so just go with whatever rating feels right to you
          </DialogContentText> */}
          {!user &&
          <Alert severity="warning" sx={{ mb: '1em' }}>Please log in to rate this jam - thank you!</Alert>
          }
            <Box sx={{ minWidth: 120, mx:'0.25em', my: '1em' }}>
            <InputLabel id="rating-select-label">Rating</InputLabel>
            <Select
            size="normal"
            labelId="rating-select-label"
            id="rating-select"
            value={rating}
            label="Rating"
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
          </Box>
          <TextField
            autoFocus
            sx={{ mx:'0.25em', mb: '1em'}}
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
          <TagPicker tagsSelected={newTags} setTagsSelected={setNewTags} size={'normal'}/>
          {tags &&
          <Typography>Current Tags: {tags}</Typography>
          }
          {tagsToAddText &&
          <Typography>Tags to Add: {tagsToAddText}</Typography>
          }
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button onClick={handleSubmit} disabled={loading}>{buttonText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
