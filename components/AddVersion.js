import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import { addOnePoint, addTenPoints, rateVersion } from '../utils/dbFunctions'
import { fetchAllJams } from '../utils/fetchData'
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

export default function AddVersion({ songs, jams, user, profile, setSongs, setUpdatedJams, artist, setArtist, song, setSong }) {
  const [loading, setLoading] = useState(null)
  const [open, setOpen] = useState(false);
  const [songObj, setSongObj] = useState(null)
  const [songExists, setSongExists] = useState(true)
  const [songErrorText, setSongErrorText] = useState(null)
  const [artistErrorText, setArtistErrorText] = useState(null)
  const [dateErrorText, setDateErrorText] = useState(null)
  const [locationErrorText, setLocationErrorText] = useState(null)
  const [successAlertText, setSuccessAlertText] = useState(null)
  const [tags, setTags] = useState([])
  const [date, setDate] = useState(null)
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
  const [grimy, setGrimy] = useState(false)
  const [historic, setHistoric] = useState(false)
  const [lowkey, setLowkey] = useState(false)
  const [mellow, setMellow] = useState(false)
  const [melodic, setMelodic] = useState(false)
  const [rocking, setRocking] = useState(false)
  const [tensionRelease, setTensionRelease] = useState(false)
  const [trance, setTrance] = useState(false)
  const [upbeat, setUpbeat] = useState(false)
  const [setlist, setSetlist] = useState(null)

  useEffect(() => {
    setSuccessAlertText(null)
    if (date) {
      setDateErrorText(null)
      if (jams && song) {
        let index = jams.findIndex(jam => {
          return (jam.song_name === song && jam.date === date);
        })
        if (index !== -1) {
          setDateErrorText(`${song} from ${date} has already been added. Great minds think alike!`)
        } else {
          setDateErrorText(null)
        }
      }
    }
  }, [date, jams, song])

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
    setSuccessAlertText(null)
    setSongErrorText(null)
    setArtistErrorText(null)
    setDateErrorText(null)
    setLocationErrorText(null)
    setSuccessAlertText(null)
    setLoading(false)
    setTags([])
    setDate(null)
    setLocation(null)
    setOpen(false);
  };

  useEffect(() => {
    async function getPhishSetlist() {
      const data = {
        "date": date
      }
      console.log('data', data)
      await fetch('/api/phish/setlist', {
        method: 'POST',
        body: JSON.stringify({
          date: date
        })
      })
      .then(setlist => setlist.json())
      .then(setlist => {
        console.log('setlist', setlist);
        setSetlist(setlist)
      })
    } 
    if (artist === 'Phish' && date && !song) {
      try {
        getPhishSetlist()
      }
      catch (error) {
        console.error(error)
      }
    } else if (artist === 'Phish' && song && !date) {
      setSetlist(null)
    }
  }, [artist, date, song])

  const handleRatingChange = (e) => {
    setRating(e.target.value)
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
      let valid = validateData()
      if (valid) {
        setSuccessAlertText("Looks good, adding jam...")
        await insertVersion()
        setLoading(false)
      } else {
        console.error('issue with data')
      } setLoading(false)
    }
  }

  const validateData = () => {
    let currentDate = new Date()
    if (currentDate < Date.parse(date)) {
      setDateErrorText(`Hello, time traveller! Thanks for trying to add this version of ${song}.\n\nUnfortunately, that would create a few paradoxes.\n\nIf the jam is great again in this timeline, feel free to come back and add it. Thank you, and safe travels!`)
      return false
    } if (date === '') {
      setDateErrorText('Please enter a date')
      return false
    } if (!profile.can_write) {
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
      return false
    } return true
  }

  const insertVersion = async () => {
    const { data, error } = await supabase
      .from('versions')
      .insert(
        [{ song_id: songObj.id,
          song_name: song,
          user_id: user.id,
          submitter_name: profile.name,
          song_submitter_name: songObj.submitter_name,
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
          that_years_style: thatYearsStyle,
          grimy: grimy,
          historic: historic,
          low_key: lowkey,
          mellow: mellow,
          melodic: melodic,
          rocking: rocking,
          tension_release: tensionRelease,
          trance: trance,
          upbeat: upbeat,
        }])
    if (error) {
      console.error(error)
    } else {
      addOnePoint(songObj.submitter_name)
      addTenPoints(profile.name)
      if (rating) {
        rateVersion(data[0].id, songObj.id, profile.name, rating, comment, profile.name, songObj.submitter_name, user.id)
        addTenPoints(profile.name)
        setSuccessAlertText(`Successfully added ${song} from ${date} and your rating. Thank you for contributing! It will be in the table the next time you refresh the page.`)
      } else {
        setSuccessAlertText(`Successfully added ${song} from ${date}. Thank you for contributing! It will be in the table the next time you refresh the page.`)
      }
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
      'grimy': 'Grimy',
      'groovy': 'Groovy',
      'guest': 'Guest',
      'happy': 'Happy',
      'heavy': 'Heavy',
      'historic': 'Historic',
      'jazzy': 'Jazzy',
      'long': 'Long',
      'low_key': 'Low-key',
      'mellow': 'Mellow',
      'melodic': 'Melodic',
      'multi_part': 'Multi-part',
      'official_release': 'Official Release',
      'peaks': 'Peaks',
      'reggae': 'Reggae',
      'rocking': 'Rocking',
      'segue': 'Segue',
      'shred': 'Shred',
      'silly': 'Silly',
      'sloppy': 'Sloppy',
      'slow': 'Slow',
      'sludgy': 'Sludgy',
      'soaring': 'Soaring',
      'soulful': 'Soulful',
      'stop_start': 'Stop-start',
      'synthy': 'Synthy',
      'tease': 'Teases',
      'tension_release': 'Tension and Release',
      'that_years_style': "That Year's Style",
      'trance': 'Trance',
      'trippy': 'Trippy',
      'type2': 'Type II',
      'unusual': 'Unusual',
      'upbeat': 'Upbeat'
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
    tags.indexOf('unusual') !== -1 ? setUnusual(true) : setUnusual(false)
    tags.indexOf('grimy') !== -1 ? setGrimy(true) : setGrimy(false)
    tags.indexOf('historic') !== -1 ? setHistoric(true) : setHistoric(false)
    tags.indexOf('low_key') !== -1 ? setLowkey(true) : setLowkey(false)
    tags.indexOf('mellow') !== -1 ? setMellow(true) : setMellow(false)
    tags.indexOf('melodic') !== -1 ? setMelodic(true) : setMelodic(false)
    tags.indexOf('rocking') !== -1 ? setRocking(true) : setRocking(false)
    tags.indexOf('tension_release') !== -1 ? setTensionRelease(true) : setTensionRelease(false)
    tags.indexOf('trance') !== -1 ? setTrance(true) : setTrance(false)
    tags.indexOf('upbeat') !== -1 ? setUpbeat(true) : setUpbeat(false)
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
            <Alert severity="error" sx={{ mb: '1em' }}>Please <a href="login">log in</a> to contribute - thank you!</Alert>
          }
          {user &&
            <ArtistPicker artist={artist} setArtist={setArtist} size={'normal'} my={'1em'}/>
          }
          {artistErrorText &&
            <Alert severity="error" sx={{ my: '1em' }}>{artistErrorText}</Alert>
          }
          {artist &&
          <SongPicker artist={artist} songs={songs} song={song} setSong={setSong} setlist={setlist} wide={true} size={'normal'} mx={'0.25em'} my={'1em'}/>
          }
          {!songExists && song &&
          <>
          <Alert severity="warning" sx={{ mb: '1em' }}>{song} hasn&apos;t been added yet.</Alert>
          <AddSong song={song} user={user} songs={songs} setSong={setSong} profile={profile} setSongs={setSongs} artist={artist} setArtist={setArtist}/>
          </>
          }
          {songErrorText &&
          <Alert severity="error" sx={{ my: '1em' }}>{songErrorText}</Alert>
          }
          {artist &&
            <DatePicker setDate={setDate} my={'1em'} date={date}/>
          }
          {dateErrorText &&
          <Alert severity="error" sx={{ my: '1em' }}>{dateErrorText}</Alert>
          }
          {songExists && artist && date &&
          <Box mx="0.25em" my="1em">
            <TextField
            autoFocus
            id="name"
            label="Location"
            type="text"
            fullWidth
            variant="standard"
            multiline
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
          </Box>
          }
          {locationErrorText &&
          <Alert severity="error" sx={{ my: '1em' }}>{locationErrorText}</Alert>
          }
          {song && artist && date && location && location.length > 2 &&
          <>
          <Typography mx="0.25em" my="1em">Optional:</Typography>
          <TagPicker tagsSelected={tags} setTagsSelected={setTags} size={'normal'} my={'1em'}/>
          {tagsText &&
          <Typography mx="0.25em" my="1em">{tagsText}</Typography>
          }
          <TextField
            sx={{ mb: '1em', mx:'0.25em' }}
            // margin="dense"
            id="listen_link"
            label="Link (Relisten, YouTube)"
            type="text"
            fullWidth
            variant="standard"
            multiline
            onChange={(e) => setListenLink(e.target.value)}
            />
          <FormControl sx={{ my:'1em', mx: '0.25em' }}>
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
            id="comment"
            label="Comments"
            type="text"
            fullWidth
            variant="standard"
            multiline
            onChange={handleCommentChange}
            />
          </FormControl>
          </>
          }
          {successAlertText &&
          <Alert severity="success" sx={{ my: '1em' }}>{successAlertText}</Alert>
        }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}
          sx={{ textTransform: 'none' }}>Close</Button>
          {artist && song && date && location && location.length > 2 && !dateErrorText && !successAlertText &&
          <Button onClick={handleSubmit}
            disabled={loading || !user || !profile}
            sx={{ textTransform: 'none' }}
          >Add Version</Button>
          }
        </DialogActions>
      </Dialog>
    </Box>
  );
}
