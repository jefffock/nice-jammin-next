import { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip';
import FilterChip from './FilterChip'
import Box from '@mui/material/Box';


export default function FilterList({ artist, setArtist, tagsSelected, setTagsSelected, beforeDate, afterDate, setBeforeDate, setAfterDate, song, setSong }) {

  useEffect(()=> {
    console.log('artist', artist)
    console.log('song', song)
    console.log('tagsSelected', tagsSelected)
    console.log('beforeDate', beforeDate)
    console.log('afterDate', afterDate)
  })

  return (
    //justifyContent="center"
    <Box display="flex" mx="auto" maxWidth='900px'>
      <Box sx={{ p:'0.5em' }}>
      {artist && artist !== 'All Bands' &&
      <FilterChip artist={artist} setArtist={setArtist} key={artist}></FilterChip>}
      {song &&
      <FilterChip song={song} setSong={setSong} key={song} ></FilterChip>}
      {afterDate &&
      <FilterChip afterDate={afterDate} setAfterDate={setAfterDate} key={afterDate}></FilterChip>}
      {beforeDate &&
      <FilterChip beforeDate={beforeDate} setBeforeDate={setBeforeDate} key={beforeDate}></FilterChip>}
      {tagsSelected &&
      tagsSelected.map((tag) => (
      <FilterChip key={tag} tag={tag} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected}></FilterChip>
      ))}
      </Box>
    </Box>
  )
}