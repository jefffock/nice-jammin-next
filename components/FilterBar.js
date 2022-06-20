import { useState, useEffect } from 'react'
import ArtistPicker from './ArtistPicker'
import TagPicker from './TagPicker'
import DateFilter from './DateFilter'
import SongPicker from './SongPicker'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export default function FilterBar({ setDates, setArtist, tagsSelected, setTagsSelected, artist, beforeDate, setBeforeDate, afterDate, setAfterDate, song, setSong, songs }) {

  return (
    <Box sx={{ mx: '0.5em' }} >
      <Box sx={{ bgcolor: 'primary.bg', width: 'fit-content', mx:'auto', borderRadius: '.5em', p: '0.3em' }}>
        <Typography textAlign="center">What would you like to hear?</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'top', mx: 'auto', mt: '0.1em', justifyContent: 'center', bgcolor: 'primary.bg', borderRadius: '0.25em', width: 'fit-content', p:'0.3em'}}>
          <ArtistPicker setArtist={setArtist} artist={artist} />
          <SongPicker songs={songs} setSong={setSong} song={song} size={'small'}/>
          <TagPicker tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} />
          <DateFilter before={false} afterDate={afterDate} setAfterDate={setAfterDate} />
          <DateFilter before={true} beforeDate={beforeDate} setBeforeDate={setBeforeDate} />
        </Box>
      </Box>
    </Box>
  )
}