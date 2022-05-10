import React, { useState, useEffect } from 'react'

export default function TableTitle({ artist, song }) {

  return (
    <>
    {!artist &&
      <h1>Great jams by all bands</h1>
    }
    {artist && !song &&
      <h1>Great jams by {artist}</h1>
    }
    {song && artist &&
      <h1>Great {song} jams by {artist}</h1>
    }
  </>
  )
}