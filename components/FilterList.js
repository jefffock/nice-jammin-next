import { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip';
import FilterChip from './FilterChip'
import Box from '@mui/material/Box';


export default function FilterList({ artist, setArtist, tagsSelected, setTagsSelected, beforeDate, afterDate, setBeforeDate, setAfterDate, song, setSong }) {

  return (
    //justifyContent="center"
    <Box display="flex" mx="auto" maxWidth='900px'>
      <Box sx={{ p:'0.5em' }}>
      {artist && artist !== 'All Bands' &&
      <FilterChip artist={artist} setArtist={setArtist}></FilterChip>}
      {song &&
      <FilterChip key={song} song={song} setSong={setSong}></FilterChip>}
      {afterDate &&
      <FilterChip afterDate={afterDate} setAfterDate={setAfterDate}></FilterChip>}
      {beforeDate &&
      <FilterChip beforeDate={beforeDate} setBeforeDate={setBeforeDate}></FilterChip>}
      {tagsSelected &&
      tagsSelected.map((tag) => (
      <FilterChip key={tag} tag={tag} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected}></FilterChip>
      ))}
      </Box>
    </Box>
  )
}