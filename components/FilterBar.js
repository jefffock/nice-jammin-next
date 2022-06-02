import { useState, useEffect } from 'react'
import ArtistPicker from './ArtistPicker'
import TagPicker from './TagPicker'
import DateFilter from './DateFilter'
import SongPicker from './SongPicker'
// import DateRangeSlider from './DateRangeSlider'

export default function FilterBar({ setDates, setArtist, tagsSelected, setTagsSelected, artist, beforeDate, setBeforeDate, afterDate, setAfterDate, song, setSong, songs }) {

  return(
    <div className="filter-bar-wrapper">
      <ArtistPicker setArtist={setArtist} artist={artist}/>
      <SongPicker songs={songs} setSong={setSong} song={song}></SongPicker>
      <TagPicker tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} />
      <DateFilter before={false} afterDate={afterDate} setAfterDate={setAfterDate}></DateFilter>
      <DateFilter before={true} beforeDate={beforeDate} setBeforeDate={setBeforeDate}></DateFilter>
    </div>
  )
}