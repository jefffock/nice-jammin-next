import { useState, useEffect, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListenLink({ link, jam }) {
  const [open, setOpen] = useState(false);
  const [newLink, setNewLink] = useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let reformattedLink
    if (!newLink && link) {
      if (link.includes('youtu')) {
        if (link.includes('watch?v=')) {
          reformattedLink = link.replace('watch?v=', 'embed/')
        } if (link.includes('youtu.be')) {
          let youTubeId;
          let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          let match = link.match(regExp);
          if (match && match[2].length == 11) {
            youTubeId = match[2];
           reformattedLink = `//www.youtube.com/embed/${youTubeId}`
          }
        }
      }
    }
    setNewLink(reformattedLink ? reformattedLink : link)
  }, [link])

  return (
    <div>
      <Button variant="contained"
      onClick={handleClickOpen}
      sx={{ textTransform: 'none', borderRadius: '50px', my:'0.5em' }}
      >
        Listen
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"
            onClick={handleClose}>
              Back to Nice Jammin&apos;
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Box sx={{ height: '100vh', width: '100vw'}}>
          <iframe
          src={newLink ? newLink : link}
          title={`Listen to ${jam.song_name} from ${jam.date}`}
          height={'99%'}
          width={'100%'}
          ></iframe>
        </Box>
      </Dialog>
    </div>
  );
}
