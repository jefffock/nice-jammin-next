import React, { useState, useEffect } from 'react'

export default function TableTitle({ artist, song, artistName, songName }) {

  return (
    <>
    {!artistName && !songName &&
      <h1>Great Jams by All Bands</h1>
    }
    {artistName && !song &&
      <h1>Great Jams by {artistName}</h1>
    }
    {songName && !artistName &&
      <h1>Great {songName} Jams</h1>
    }
  </>
  )
}