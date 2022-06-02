import { useEffect, useState} from 'react';
import Chip from '@mui/material/Chip';


const tags = {
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

export default function FilterChip({ tag, artist, setArtist, removeTag }) {
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (artist) {
      setLabel(artist)
    } if (tag) {
      setLabel(tags[tag])
    }
  }, [])

  const handleDelete = () => {
    if (artist) {
      setArtist('All Bands')
    } if (tag) {
      removeTag(tag)
    }
  };


  return (
      <Chip label={label} onDelete={handleDelete} />
  );
}