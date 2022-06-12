import { useState, useEffect } from 'react'
import ArtistPicker from './ArtistPicker'
import TagPicker from './TagPicker'
import DateFilter from './DateFilter'
import SongPicker from './SongPicker'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import DateRangeSlider from './DateRangeSlider'

export default function FilterBar({ setDates, setArtist, tagsSelected, setTagsSelected, artist, beforeDate, setBeforeDate, afterDate, setAfterDate, song, setSong, songs }) {

  // return(
  //   <Box>
  //     <Stack direction="row" spacing={'.4em'} sx={{ m: '0.4em' }}>
  //       <ArtistPicker setArtist={setArtist} artist={artist}/>
  //       <SongPicker songs={songs} setSong={setSong} song={song}></SongPicker>
  //     </Stack>
  //     <Stack direction="row" spacing={'.4em'} sx={{ m: '0.4em'}}>
  //       <DateFilter before={false} afterDate={afterDate} setAfterDate={setAfterDate}></DateFilter>
  //       <DateFilter before={true} beforeDate={beforeDate} setBeforeDate={setBeforeDate}></DateFilter>
  //     </Stack>
  //     <Stack direction="row" spacing={'.4em'} sx={{ m: '0.4em' }}>
  //       <TagPicker tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} />
  //     </Stack>
  //   </Box>
  // )

  return(
    <Box>
      <Stack direction="row" overflow="scroll" spacing={'.4em'} sx={{ m: '0.4em' }}>
        <ArtistPicker setArtist={setArtist} artist={artist}/>
        <SongPicker songs={songs} setSong={setSong} song={song}></SongPicker>
        <TagPicker tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} />
        <DateFilter before={false} afterDate={afterDate} setAfterDate={setAfterDate}></DateFilter>
        <DateFilter before={true} beforeDate={beforeDate} setBeforeDate={setBeforeDate}></DateFilter>
      </Stack>
    </Box>
  )
}