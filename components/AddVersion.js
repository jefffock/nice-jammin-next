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
        }
          {location &&
          <TagPicker tagsSelected={tags} setTagsSelected={setTags}/>
          }
          {/* <DialogContentText>
            Know a great jam that hasn't been add
          </DialogContentText> */}
          {/* song
          artist
          date
          tags
          location
          */}

          {song &&
          <>
            <Typography>Summary:</Typography>
            <Typography>{song}</Typography>
            <Typography>{artist}</Typography>
            <Typography>{date}</Typography>
            <Typography>{location}</Typography>
            <Typography>{tags}</Typography>
          </>
          }
        </DialogContent>
        <DialogActions>            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          {artist && song && date && location &&
          <Button onClick={handleClose}>Subscribe</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
