import { useState, useEffect } from 'react'
import ArtistPicker from './ArtistPicker'
import JamsTable from './JamsTable'
import { supabase } from '../utils/supabaseClient'
import Auth from './Auth'
import Account from './Account'
import DiscoverContributeSwitch from './DiscContSwitch'
import Table from '@mui/material/Table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CollapsibleTable from './JamsTableCollapsible'
import DateRangeSlider from './DateRangeSlider'
import { useRouter } from 'next/router'
import TableTitle from './TableTitle'
import Head from 'next/head'
import JamsDataGrid from './JamsDataGrid'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ jams, artistName, songId, songName2 }) {
  const [artists, setArtists] = useState(null)
  const [artist, setArtist] = useState(null)
  const [songs, setSongs] = useState(null)
  const [song, setSong] = useState(null)
  const [session, setSession] = useState(null)
  const [dates, setDates] = useState(null)
  const [filteredSongs, setFilteredSongs] = useState(null)
  const [sortedSongs, setSortedSongs] = useState(jams)
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('avg_rating');

  const router = useRouter()

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    console.log('dates', dates)
    if (jams.length < 100) {
      filterSongs()
    } else {
      //new db call
    }
  }, [dates, jams])

  useEffect(() => {
    sortSongs(order, orderBy)
  }, [order, orderBy])

  function filterSongs() {
    console.log('dates in filterSongs', dates)
    //filter by date
    let filteredSongs = []
    for (var i = 0; i < jams.length; i++) {
      let passesFilters = true
        let year = parseInt(jams[i].date.slice(0,4))
        if ( (dates && year < dates[0]) || (dates && year > dates[1])) {
          passesFilters = false
        } if (passesFilters) {
          filteredSongs.push(jams[i])
        }
      }
    setFilteredSongs(filteredSongs)
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    console.log('in get comparator main', order, orderBy)
    // if (orderBy === 'avg_rating') {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

  function sortSongs(order, orderBy) {
    let newSortedSongs = jams.slice().sort(getComparator(order, orderBy))
    console.log('newSortedSongs', newSortedSongs)
    setSortedSongs(newSortedSongs)
  }

  // }

  // async function fetchArtists() {
  //   const { data, error } = await supabase
  //     .from('artists')
  //     .select('*')
  //     .order('ratings', { ascending: false })
  //   if (error) {
  //     console.error(error)
  //   } else {
  //     console.log('artists', data)
  //     setArtists(data)
  //   }
  // }

  // useEffect(() => {
  //   if (!artists) {
  //     fetchArtists()
  //   }
  // }, [artists])

  return (
    <>
    <Head>
      {!artist && !song &&
      <>
      <title>Discover Great Jams by All Jam Bands</title>
      <meta name="keywords" content="best jam jams phish grateful dead sci goose umphreys tab jrad jgb"></meta>
      <meta name="description" content="Discover and Rate Great Jams By Phish, Grateful Dead, Goose, String Cheese Incident, Umphrey's McGee, Widespread Panic, Billy Strings, JRAD, and many more!"></meta>
      </>
      }
      {artist && !song &&
      <>
      <title>{artist} Best Jams - NiceJammin.com</title>
      <meta name="keywords" content="best jam jams {artist}"></meta>
      </>
      }
      {song && !artist &&
      <>
      <title>{song} Best Jams - NiceJammin.com</title>
      </>
      }
      {artist && song &&
      <>
      <title>{artist} {song} Best Jams - NiceJammin.com</title>
      </>
      }
    </Head>
    <ThemeProvider theme={darkTheme}>
      <h1 className="text-3xl">Nice Jammin</h1>
      {/* <DiscoverContributeSwitch /> */}
      <TableTitle artist={artist} song={song} artistName={artistName} songName={songName2}/>
      <br /><br />
      <CollapsibleTable songs={jams} sortedSongs={sortedSongs} sortSongs={sortSongs} order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy}/>
      <h2>Filters</h2>
      {/* <ComboBox options={artists} label={'Vibes'} setState={setArtist}/> */}
      <ArtistPicker default={artistName ? artistName : 'All Bands'}/>
      {/* <ComboBox options={artists} label={'Song'} setState={setArtist} default={'All Songs'}/> */}
      <DateRangeSlider setDates={setDates}/>
      <h1>Gratitude</h1>
      <h1>Values/Philosophy/Hope</h1>
      <h1>Top Contributors</h1>
      <h1>Ideas</h1>
    </ThemeProvider>
    </>
  )
}