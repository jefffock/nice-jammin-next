import { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip';
import FilterChip from './FilterChip'

export default function FilterList({ artist, setArtist, tagsSelected, setTagsSelected, beforeDate, afterDate, setBeforeDate, setAfterDate, song, setSong }) {

  return (
    <div className="filter-list-wrapper">
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
    </div>
  )
}