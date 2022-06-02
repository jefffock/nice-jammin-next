import DateRangeSlider from './DateRangeSlider'
import ArtistPicker from './ArtistPicker'
import TagPicker from './TagPicker'
import { useState, useEffect } from 'react'

export default function FilterBar({ setDates, setArtist, tagsSelected, setTagsSelected, artist}) {

  return(
    <>
      <h1>FilterBar</h1>
      {/* <DateRangeSlider setDates={setDates}/> */}
      <ArtistPicker setArtist={setArtist} artist={artist}/>
      <TagPicker tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} />
    </>
  )
}