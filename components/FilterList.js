import { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip';
import FilterChip from './FilterChip'

export default function FilterList({ artist, setArtist, tagsSelected, removeTag }) {

  return (
    <div className="filter-list-wrapper">
    {artist && artist !== 'All Bands' &&
    <FilterChip artist={artist} setArtist={setArtist}></FilterChip>}
    {tagsSelected &&
    tagsSelected.map((tag) => (
      <FilterChip key={tag} tag={tag} removeTag={removeTag}></FilterChip>
    ))}
    </div>
  )
}