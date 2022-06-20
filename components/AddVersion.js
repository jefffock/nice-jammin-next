import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { addOnePoint, addTenPoints } from '../utils/dbFunctions'



export default function AddVersion({ songs, jams, user, profile, setSongs }) {
  const [loading, setLoading] = useState(null)
  const [open, setOpen] = useState(false);
  const [song, setSong] = useState(null);
  const [songObj, setSongObj] = useState(null)
  const [songExists, setSongExists] = useState(true)
  const [songArray, setSongArray] = useState([])
  const [songErrorText, setSongErrorText] = useState(null)
  const [artistErrorText, setArtistErrorText] = useState(null)
  const [dateErrorText, setDateErrorText] = useState(null)
  const [locationErrorText, setLocationErrorText] = useState(null)
  const [successAlertText, setSuccessAlertText] = useState(null)
  const [artist, setArtist] = useState(null);
  const [tags, setTags] = useState([])
  const [date, setDate] = useState(null)
  const [year, setYear] = useState(null)
  const [location, setLocation] = useState(null)
  const [tagsText, setTagsText] = useState('')
  const [rating, setRating] = useState(null)
  const [comment, setComment] = useState('')
  const [listenLink, setListenLink] = useState(null)
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
      setDateErrorText(null)
      let yearString = date.slice(0,4)
      setYear(parseInt(yearString))
    } else {
      setYear(null)
    }
  }, [date])

  useEffect(() => {
    if (songs) {
      let index = songs.findIndex(item => {
        return item.song === song;
      })
      index === -1 ?
      setSongExists(false) :
      setSongExists(true)
      setSongObj(songs[index])
    }
  }, [song, songs])

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

  const handleRatingChange = (e) => {
    setRating(e.target.value)
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleLocationChange = (e) => {
    set
    setLocation(e.target.value)
  }

  const handleSubmit = async () => {
    console.log('songObj', songObj)
    setLoading(true)
    if (validateData()) {
      setSuccessAlertText("Looks good, adding jam...")
      await insertVersion()
      if (rating) {
        //rate that version
        console.log('rating', rating)
      }
    } else {
      console.log('issue with data')
    } setLoading(false)
  }

  const validateData = () => {
    let currentDate = new Date()
    if (currentDate < Date.parse(date)) {
      setDateErrorText(`Hello, time traveller! Thanks for trying to add this version of ${song}.\n\nUnfortunately, that would create a few paradoxes.\n\nIf the jam is great again in this timeline, feel free to come back and add it. Thank you, and safe travels!`)
      return false
    } if (date === '') {
      setDateErrorText('Please enter a date')
      return false
    } if (date && year && artist) {
      if (year < artistsAndDates[artist].start || (artistsAndDates[artist].end && year > artistsAndDates[artist].end)) {
        setDateErrorText(`I don't think ${artist} played in ${year}. Imagine if they did, though!`)
      }
    } if (!profile.can_write) {
      console.log('cant write')
      return false
    } if (location === '') {
      setLocationErrorText('Please enter a location')
      return false
    } if (location.length > 60) {
      setLocationErrorText('Please make the location shorter (60 characters max.)')
      return false
    }
    if (!songExists) {
      setSongErrorText('Please choose a song name that has already been added, or add a new song')
      return false
    } if (!artist) {
      setArtistErrorText('Please select an artist')
    }
      return true
  }

  const insertVersion = async () => {
    console.log('in insertVersion')
    console.log('songObj', songObj)
    const { data, error } = await supabase
      .from('versions')
      .insert(
        [{ song_id: songObj.id,
          song_name: song,
          user_id: user.id,
          submitter_name: profile.name,
          location: location,
          artist: artist,
          date: date,
          funky: funky,
          ambient: ambient,
          fast: fast,
          slow: slow,
          bliss: bliss,
          shred: shred,
          dark: dark,
          silly: silly,
          guest: guest,
          type2: type2,
          groovy: groovy,
          peaks: peaks,
          reggae: reggae,
          heavy: heavy,
          jazzy: jazzy,
          trippy: trippy,
          soaring: soaring,
          crunchy: crunchy,
          happy: happy,
          acoustic: acoustic,
          soulful: soulful,
          official_release: officialRelease,
          sloppy: sloppy,
          tease: tease,
          listen_link: listenLink,
          multi_part: multiPart,
          sludgy: sludgy,
          synthy: synthy,
          chaotic: chaotic,
          dissonant: dissonant,
          bluesy: bluesy,
          stop_start: stopStart,
          segue: segue,
          unusual: unusual,
          long: long,
          that_years_style: thatYearsStyle
        }])
    if (error) {
    } else {
      console.log('data after insert', data)
      setSuccessAlertText(`Successfully added ${song} from ${date}. Thank you for contributing!`)
      addOnePoint(songObj.submitter_name)
      addTenPoints(profile.name)
      fetchVersions(songObj.id)
      }
  }

  let artistsAndDates = {
    'The Allman Brothers Band': {
      start: 1969,
      end: 2014
    },
    'Billy Strings': {
      start: 2013,
      end: null
    },
    'Dopapod': {
      start: 2008,
      end: null
    },
    'Furthur': {
      start: 2009,
      end: 2014
    },
    'Goose': {
      start: 2014,
      end: null
    },
    'Grateful Dead': {
      start: 1965,
      end: 1995
    },
    'Greensky Bluegrass': {
      start: 2000,
      end: null
    },
    'Jerry Garcia Band, Legion of Mary': {
      start: 1960,
      end: 1995
    },
    "Joe Russo's Almost Dead": {
      start: 2013,
      end: null
    },
    'Lettuce': {
      start: 1992,
      end: null
    },
    'Lotus': {
      start: 1999,
      end: null
    },
    'Medeski Martin & Wood': {
      start: 1991,
      end: null
    },
    'moe.': {
      start: 1989,
      end: null
    },
    'Osees': {
      start: 1997,
      end: null
    },
    'Phil Lesh & Friends': {
      start: 1994,
      end: null
    },
    'Phish': {
      start: 1983,
      end: null
    },
    'String Cheese Incident': {
      start: 1993,
      end: null
    },
    'Trey Anastasio, TAB': {
      start: 1998,
      end: null
    },
    "Umphrey's McGee": {
      start: 1997,
      end: null
    },
    'Widespread Panic': {
      start: 1986,
      end: null
    }
  }

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
      <Dialog open={open} onClose={handleClose} sx={{ minHeight: '50vh' }}>
        <DialogTitle>Add a Great Jam</DialogTitle>
        <DialogContent sx={{ minHeight: '300px', minWidth: '300px' }}>
          {!user &&
            <Alert severity="warning" sx={{ mb: '1em' }}>Please log in to contribute - thank you!</Alert>
          }
          <br/><br/>
          <SongPicker songs={songs} song={song} setSong={setSong} wide={true} size={'normal'}/>

          {!songExists && song &&
          <>
          <br/><br/>
          <Alert severity="warning" sx={{ mb: '1em' }}>{song} hasn&apos;t been added yet.</Alert>
          {/* <Typography>{song} hasn&apos;t been added yet.</Typography> */}
          <AddSong song={song} user={user} songs={songs} setSong={setSong} profile={profile} setSongs={setSongs} />
          </>
          }

          {songErrorText &&
          <Alert severity="error" sx={{ my: '1em' }}>{songErrorText}</Alert>
          }
          {songExists &&
          <><br/><ArtistPicker artist={artist} setArtist={setArtist} size={'normal'}/></>
          }
          {artistErrorText &&
          <Alert severity="error" sx={{ my: '1em' }}>{artistErrorText}</Alert>
          }
          {songExists && artist &&
          <><br/><br/><DatePicker setDate={setDate}/></>
          }
          {dateErrorText &&
          <Alert severity="error" sx={{ my: '1em' }}>{dateErrorText}</Alert>
          }
          {songExists && artist && date &&
          <>
          <TextField
          sx={{ m:'0.25em', mt: '1em' }}
          autoFocus
          margin="dense"
          id="name"
          label="Location"
          type="text"
          fullWidth
          variant="standard"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          />
          {locationErrorText &&
          <Alert severity="error" sx={{ my: '1em' }}>{locationErrorText}</Alert>
          }
          <br></br>
          <br></br>
          <Typography textAlign="center" mb="1em">Optional</Typography>
          <TagPicker tagsSelected={tags} setTagsSelected={setTags} size={'normal'}/>
          <Typography>{tagsText}</Typography>
          <FormControl sx={{ minWidth: 120, mt:'1.5em', mx: '0.25em' }}>
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
          <TextField
            sx={{ mt: '1em' }}
            autoFocus
            margin="dense"
            id="comment"
            label="Comments"
            type="text"
            fullWidth
            variant="standard"
            multiline
            onChange={handleCommentChange}
          />
          <TextField
            sx={{ mt: '1em' }}
            autoFocus
            margin="dense"
            id="listen_link"
            label="Audio Link"
            type="text"
            fullWidth
            variant="standard"
            multiline
            onChange={(e) => setListenLink(e.target.value)}
          />
          </FormControl>
          </>
          }
          {successAlertText &&
          <Alert severity="success" sx={{ my: '1em' }}>{successAlertText}</Alert>
          }
        </DialogContent>
        <DialogActions>            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          {artist && song && date && location && location.length > 2 &&
          <Button onClick={handleSubmit}
            disabled={loading}
          >Add Version</Button>
          }
        </DialogActions>
      </Dialog>
    </Box>
  );
}
