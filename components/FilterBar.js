import { useState, useEffect } from 'react'
import ArtistPicker from './ArtistPicker'
import TagPicker from './TagPicker'
import DateFilter from './DateFilter'
import SongPicker from './SongPicker'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import DateRangeSlider from './DateRangeSlider'

export default function FilterBar({ setDates, setArtist, tagsSelected, setTagsSelected, artist, beforeDate, setBeforeDate, afterDate, setAfterDate, song, setSong, songs }) {

  return (
    <Box sx={{ mx: '0.5em' }}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'top', mx: 'auto', mt: '0.5em', justifyContent: 'center', bgcolor: 'primary.bg', borderRadius: '.25em', width: 'fit-content', p:'0.3em'}}>
      <ArtistPicker setArtist={setArtist} artist={artist} />
      <SongPicker songs={songs} setSong={setSong} song={song} />
      <TagPicker tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} />
      <DateFilter before={false} afterDate={afterDate} setAfterDate={setAfterDate} />
      <DateFilter before={true} beforeDate={beforeDate} setBeforeDate={setBeforeDate} />
    </Box>
    </Box>
  )
}