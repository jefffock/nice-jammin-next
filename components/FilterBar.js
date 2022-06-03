import { useState, useEffect } from 'react'
import ArtistPicker from './ArtistPicker'
import TagPicker from './TagPicker'
import DateFilter from './DateFilter'
import SongPicker from './SongPicker'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import DateRangeSlider from './DateRangeSlider'

export default function FilterBar({ setDates, setArtist, tagsSelected, setTagsSelected, artist, beforeDate, setBeforeDate, afterDate, setAfterDate, song, setSong, songs }) {

  return(
    // <div className="filter-bar-wrapper">
    <Stack direction="row" spacing={1}>
      <ArtistPicker setArtist={setArtist} artist={artist}/>
      <SongPicker songs={songs} setSong={setSong} song={song}></SongPicker>
      <TagPicker tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} />
      <DateFilter before={false} afterDate={afterDate} setAfterDate={setAfterDate}></DateFilter>
      <DateFilter before={true} beforeDate={beforeDate} setBeforeDate={setBeforeDate}></DateFilter>
      </Stack>
    // </div>
  )
}