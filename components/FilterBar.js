import { useState, useEffect } from 'react'
import ArtistPicker from './ArtistPicker'
import TagPicker from './TagPicker'
import DateFilter from './DateFilter'
// import DateRangeSlider from './DateRangeSlider'

export default function FilterBar({ setDates, setArtist, tagsSelected, setTagsSelected, artist, beforeDate, setBeforeDate, afterDate, setAfterDate }) {

  return(
    <div className="filter-bar-wrapper">
      <ArtistPicker setArtist={setArtist} artist={artist}/>
      <TagPicker tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} />
      <DateFilter before={false} afterDate={afterDate} setAfterDate={setAfterDate}></DateFilter>
      <DateFilter before={true} beforeDate={beforeDate} setBeforeDate={setBeforeDate}></DateFilter>
      {/* <DateRangeSlider setDates={setDates}/> */}
    </div>
  )
}