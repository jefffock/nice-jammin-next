import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SongPicker from './SongPicker'
import ArtistPicker from './ArtistPicker'
import TagPicker from './TagPicker'
import DatePicker from './DatePicker'
import Typography from '@mui/material/Typography';


export default function AddVersion({ songs, jams }) {
  const [open, setOpen] = useState(false);
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState(null);
  const [tags, setTags] = useState([])
  const [date, setDate] = useState(null)
  const [location, setLocation] = useState(null)
  const [tagsText, setTagsText] = useState('')
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
    setSong(null)
    setArtist(null)
    setTags([])
    setDate(null)
    setLocation(null)
    setOpen(false);
  };

  useEffect(() => {
    let newTagsText = ''
    for (var i = 0; i < tags.length; i++) {
      newTagsText += tagsList[tags[i]] + ', '
    } let trimmedTagsText = newTagsText.slice(0, newTagsText.length - 2)
    setTagsText(trimmedTagsText);
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('ambient') !== -1 ? setAmbient(true) : setAmbient(false)
    tags.indexOf('bliss') !== -1 ? setBliss(true) : setBliss(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
  }, [tags])

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

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Version
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Version</DialogTitle>
        <DialogContent>
          <br></br>
          <SongPicker songs={songs} song={song} setSong={setSong} wide={true}/>
          <br></br>
          {song &&
          <ArtistPicker artist={artist} setArtist={setArtist}/>
          }
          {artist &&
          <>
          <br></br>
          <br></br>
          <DatePicker setDate={setDate}/>
          </>
          }
          {date &&
          <>
          <br></br>
          <br></br>
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Location"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setLocation(e.target.value)}
          />
          </>
          }
          {location &&
          <>
          <br></br>
          <br></br>
          <TagPicker tagsSelected={tags} setTagsSelected={setTags}/>
          </>
          }
          {/* <DialogContentText>
            Know a great jam that hasn't been add
          </DialogContentText> */}
          {song && tagsText &&
          <>
            {/* <Typography>Summary:</Typography>
            <Typography>{song}</Typography>
            <Typography>{artist}</Typography>
            <Typography>{date}</Typography>
            <Typography>{location}</Typography> */}
            <Typography>Tags: {tagsText}</Typography>
          </>
          }
        </DialogContent>
        <DialogActions>            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          {artist && song && date && location &&
          <Button onClick={handleClose}>Add Version</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
