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
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AddSong from './AddSong'


export default function AddVersion({ songs, jams, user }) {
  const [open, setOpen] = useState(false);
  const [song, setSong] = useState(null);
  const [songExists, setSongExists] = useState(true)
  const [songArray, setSongArray] = useState([])
  const [artist, setArtist] = useState(null);
  const [tags, setTags] = useState([])
  const [date, setDate] = useState(null)
  const [year, setYear] = useState(null)
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

  useEffect(() => {
    if (date) {
      let yearString = date.slice(0,4)
      setYear(parseInt(yearString))
    } else {
      setYear(null)
    }
  }, [date])

  useEffect(() => {
    let index = songs.findIndex(item => {
      return item.song === song;
    })
    console.log('index', index, 'song', song, 'songs', songs)
    index === -1 ? setSongExists(false) : setSongExists(true)
  }, [song, songs])

  // const handleSubmit = () => {
  //   if (verifyData()) {
  //     console.log(true)
  //   }
  // }

  // const verifyData = () => {
  //   let locationValid = true
  //   let dateValid = true
  //   let currentDate = new Date()
  //   if (currentDate < Date.parse(date)) {
  //     dateValid = false
  //     alert(`Hello, time traveller! Thanks for trying to add this version of ${song.song}.\n\nUnfortunately, that would create a few paradoxes.\n\nIf the jam is great again in this timeline, feel free to come back and add it. Thank you, and safe travels!`)
  //   }
  //   if (!canWrite) {
  //     locationValid = false;
  //     dateValid = false;
  //   }
  //   if ((artist.start_year && year < artist.start_year) ||
  //   (artist.end_year && year > artist.end_year)) {
  //       dateValid = false
  //       alert(`I don't think ${artist.artist} played in ${year}. Imagine if they did, though!`)
  //   }
  //   if (location === '') {
  //     alert('Please enter a location')
  //     locationValid = false
  //   } if (location.length > 60) {
  //     locationValid = false
  //     alert('Please make the location shorter (60 characters max.)')
  //   }
  //   if (date === '') {
  //     dateValid = false
  //     alert('Please enter a date')
  //   } if (dateValid && locationValid) {


  //       insertVersion(date)
  //     } else {
  //       setShowAlreadyExistsMessage(true)
  //     }
  //     setLoading(false)
  //   }
  // }

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
    for (var i = 0; i < tags.length; i++) {
      newTagsText += tagsList[tags[i]] + ', '
    } let trimmedTagsText = newTagsText.slice(0, newTagsText.length - 2)
    setTagsText(trimmedTagsText);
    tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false)
    tags.indexOf('ambient') !== -1 ? setAmbient(true) : setAmbient(false)
    tags.indexOf('bliss') !== -1 ? setBliss(true) : setBliss(false)
    tags.indexOf('bluesy') !== -1 ? setBluesy(true) : setBluesy(false)
    tags.indexOf('chaotic') !== -1 ? setChaotic(true) : setChaotic(false)
    tags.indexOf('crunchy') !== -1 ? setCrunchy(true) : setCrunchy(false)
    tags.indexOf('dark') !== -1 ? setDark(true) : setDark(false)
    tags.indexOf('dissonant') !== -1 ? setDissonant(true) : setDissonant(false)
    tags.indexOf('fast') !== -1 ? setFast(true) : setFast(false)
    tags.indexOf('funky') !== -1 ? setFunky(true) : setFunky(false)
    tags.indexOf('groovy') !== -1 ? setGroovy(true) : setGroovy(false)
    tags.indexOf('guest') !== -1 ? setGuest(true) : setGuest(false)
    tags.indexOf('happy') !== -1 ? setHappy(true) : setHappy(false)
    tags.indexOf('jazzy') !== -1 ? setJazzy(true) : setJazzy(false)
    tags.indexOf('long') !== -1 ? setLong(true) : setLong(false)
    tags.indexOf('multi_part') !== -1 ? setMultiPart(true) : setMultiPart(false)
    tags.indexOf('official_release') !== -1 ? setOfficialRelease(true) : setOfficialRelease(false)
    tags.indexOf('peaks') !== -1 ? setPeaks(true) : setPeaks(false)
    tags.indexOf('reggae') !== -1 ? setReggae(true) : setReggae(false)
    tags.indexOf('segue') !== -1 ? setSegue(true) : setSegue(false)
    tags.indexOf('shred') !== -1 ? setShred(true) : setShred(false)
    tags.indexOf('silly') !== -1 ? setSilly(true) : setSilly(false)
    tags.indexOf('sloppy') !== -1 ? setSloppy(true) : setSloppy(false)
    tags.indexOf('slow') !== -1 ? setSlow(true) : setSlow(false)
    tags.indexOf('sludgy') !== -1 ? setSludgy(true) : setSludgy(false)
    tags.indexOf('soaring') !== -1 ? setSoaring(true) : setSoaring(false)
    tags.indexOf('soulful') !== -1 ? setSoulful(true) : setSoulful(false)
    tags.indexOf('stop_start') !== -1 ? setStopStart(true) : setStopStart(false)
    tags.indexOf('synthy') !== -1 ? setSynthy(true) : setSynthy(false)
    tags.indexOf('tease') !== -1 ? setTease(true) : setTease(false)
    tags.indexOf('that_years_style') !== -1 ? setThatYearsStyle(true) : setThatYearsStyle(false)
    tags.indexOf('trippy') !== -1 ? setTrippy(true) : setTrippy(false)
    tags.indexOf('type2') !== -1 ? setType2(true) : setType2(false)
    tags.indexOf('Unusual') !== -1 ? setUnusual(true) : setUnusual(false)
  }, [tags])


  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ borderRadius: '50px', bgcolor: 'third.main', mx: 'auto', textTransform: 'none' }}>
        Add a Jam
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ minHeight: '50%' }}>
        <DialogTitle>Add a Great Jam</DialogTitle>
        <DialogContent>
          {!user &&
          <Alert severity="warning" sx={{ mb: '1em' }}>Please log in to contribute - thank you!</Alert>
          }
          <SongPicker songs={songs} song={song} setSong={setSong} wide={true}/>
          <br></br>
          {!songExists && song &&
          <>
          <br/><br/>
          <Typography>{song} hasn&apos;t been added yet.</Typography>
          <AddSong song={song} user={user} />
          </>
          }
          {song && songExists &&
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
            <Typography>{tagsText}</Typography>
          </>
          }
        </DialogContent>
        <DialogActions>            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          {artist && song && date && location &&
          <Button onClick={handleClose}>Add Version</Button>
          }
        </DialogActions>
      </Dialog>
    </Box>
  );
}
