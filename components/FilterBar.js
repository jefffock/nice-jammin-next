import DateRangeSlider from './DateRangeSlider'
import ArtistPicker from './ArtistPicker'
import { useState, useEffect } from 'react'

export default function FilterBar({ setDates, artistName }) {

  return(
    <>
      <h1>FilterBar</h1>
      <DateRangeSlider setDates={setDates}/>
      <ArtistPicker default={artistName ? artistName : 'All Bands'}/>
    </>
  )
}