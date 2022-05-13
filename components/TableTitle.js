import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';

export default function TableTitle({ artist, song, artistName, songName }) {

  return (
    <>
    {/* {!artistName && !songName &&
      <Typography>Great Jams by All Bands</Typography>
    } */}
    {artistName && !song &&
      <Typography>Great Jams by {artistName}</Typography>
    }
    {songName && !artistName &&
      <Typography>Great {songName} Jams</Typography>
    }
  </>
  )
}