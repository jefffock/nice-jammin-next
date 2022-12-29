import { useState, useEffect } from 'react'
import ArtistPicker from './ArtistPicker'
import TagPicker from './TagPicker'
import DateFilter from './DateFilter'
import SongPicker from './SongPicker'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sorter from './Sorter'
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function FilterBar({ setDates, setArtist, tagsSelected, setTagsSelected, artist, beforeDate, setBeforeDate, afterDate, setAfterDate, song, setSong, songs, orderBy, setOrderBy, setOrder, showRatings, handleShowRatingsChange, jams }) {

  return (
    <Box sx={{ mx: '0.5em', mt:'1em' }} >
      <Box sx={{ bgcolor: 'primary.bg', width: 'fit-content', mx:'auto', borderRadius: '.5em', p: '0.3em', boxShadow: 1}}>
        {/* <Typography textAlign="center" fontSize={22}>What would you like to hear?</Typography> */}
        <Typography textAlign="center" fontSize={20} sx={{ m: '1em'}}>1. Choose your filters:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'top', mx: 'auto', mt: '0.1em', justifyContent: 'center', bgcolor: 'primary.bg', borderRadius: '0.25em', width: 'fit-content', p:'0.3em'}}>
          <ArtistPicker setArtist={setArtist} artist={artist} />
          <SongPicker songs={songs} setSong={setSong} song={song} size={'small'} artist={artist}/>
          <TagPicker tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} />
          <DateFilter before={false} afterDate={afterDate} setAfterDate={setAfterDate} />
          <DateFilter before={true} beforeDate={beforeDate} setBeforeDate={setBeforeDate} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mx: 'auto', mt: '0.1em', justifyContent: 'center', bgcolor: 'primary.bg', borderRadius: '0.25em', width: 'fit-content', p:'0.3em'}}>
          <Sorter orderBy={orderBy} setOrderBy={setOrderBy} setOrder={setOrder}/>
          <FormControl sx={{ display: 'flex', alignItems:'center'}}>
          <FormControlLabel control={<Checkbox checked={showRatings}
          onChange={handleShowRatingsChange}/>} label="Show Ratings"/>
          </FormControl>
        </Box>
        {jams &&
          <Typography textAlign="center" fontSize="20px" m="1em">
            2. Click a row to listen or rate
            <br />
            ❤️
          </Typography>
        }
      </Box>
    </Box>
  )
}