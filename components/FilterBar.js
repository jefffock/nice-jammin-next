import DateRangeSlider from './DateRangeSlider'
import ArtistPicker from './ArtistPicker'
import TagPicker from './TagPicker'
import { useState, useEffect } from 'react'

export default function FilterBar({ setDates, setArtist, tagsSelected, setTagsSelected, artist}) {

  return(
    <div className="filter-bar-wrapper">
      {/* <DateRangeSlider setDates={setDates}/> */}
      <ArtistPicker setArtist={setArtist} artist={artist}/>
      <TagPicker tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} />
    </div>
  )
}