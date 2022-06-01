import DateRangeSlider from './DateRangeSlider'
import ArtistPicker from './ArtistPicker'
import TagPicker from './TagPicker'
import { useState, useEffect } from 'react'

export default function FilterBar({ setDates, artistName, setArtist }) {

  return(
    <>
      <h1>FilterBar</h1>
      {/* <DateRangeSlider setDates={setDates}/> */}
      <ArtistPicker start={artistName ? artistName : 'All Bands'} setArtist={setArtist}/>
      <TagPicker />
    </>
  )
}