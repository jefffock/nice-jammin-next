import { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip';

export default function FilterList({ artist, setArtist, tagsSelected, setTagsSelected }) {

  return (
    <>
    <h1>Filter List</h1>
    <h1>{artist}</h1>
    {tagsSelected &&
    tagsSelected.map((tag) => (
      <p key={tag}>{tag}</p>
      // <h1 key={tag}>{tag}</h1>
    ))}
    </>
  )
}