import { useState, useEffect } from 'react'
import JamsTable from './JamsTable'
import { supabase } from '../utils/supabaseClient'
import Auth from './Auth'
import Account from './Account'
import DiscoverContributeSwitch from './DiscContSwitch'
import Table from '@mui/material/Table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CollapsibleTable from './JamsTableCollapsible'
import { useRouter } from 'next/router'
import TableTitle from './TableTitle'
import Head from 'next/head'
import JamsDataGrid from './JamsDataGrid'
import FilterBar from './FilterBar'
import FilterList from './FilterList'

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
  const [filteredSongs, setFilteredSongs] = useState(jams)
  const [sortedSongs, setSortedSongs] = useState(jams)
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('avg_rating');
  const [beforeDate, setBeforeDate] = useState(null)
  const [afterDate, setAfterDate] = useState(null)
  const [tagsSelected, setTagsSelected] = useState([])

  /*
  selecting a tag from dropdown
    if it isnt in tag filters
      add it to tag filters
    else
      remove it from tag filters
  when tag filters change
    re-filter
    re-sort
  */

  const router = useRouter()

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    let newFilteredSongs = jams.filter(filterFunc)
    setFilteredSongs(newFilteredSongs)
  }, [artist, tagsSelected, beforeDate, afterDate])

  useEffect(() => {
    sortSongs()
  }, [order, orderBy, filteredSongs])


  function filterFunc(item) {
    if (artist && artist !== 'All Bands' && item.artist !== artist) {
      return false
    } if (tagsSelected) {
      for (var i = 0; i < tagsSelected.length; i++) {
        if (!item[tagsSelected[i]]) {
          return false
        }
      }
    } let itemDate = parseInt(item.date.slice(0,4))
    if (beforeDate && beforeDate < itemDate) {
      return false
    } if (afterDate && afterDate > itemDate) {
      return false
    }
    return true
  }

  function sortSongs() {
    let newSortedSongs = filteredSongs.slice().sort(getComparator(order, orderBy))
    setSortedSongs(newSortedSongs)
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
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

  // function removeTag(tag) {
  //   console.log('tag to remove', tag)
  //   console.log('prev tags', tagsSelected)
  //   let index = tagsSelected.indexOf(tag)
  //   let updatedTags = tagsSelected.slice(0, index).concat(tagsSelected.slice(index + 1))
  //   console.log('updatedTags', updatedTags)

  //   setTagsSelected(updatedTags)
  // }

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
      <FilterBar setArtist={setArtist} artist={artist} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} beforeDate={beforeDate} setBeforeDate={setBeforeDate} afterDate={afterDate} setAfterDate={setAfterDate}/>
      <FilterList artist={artist} setArtist={setArtist} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} beforeDate={beforeDate} afterDate={afterDate} setBeforeDate={setBeforeDate} setAfterDate={setAfterDate}/>
      <CollapsibleTable songs={jams} sortedSongs={sortedSongs} sortSongs={sortSongs} order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy}/>
      <h2>Filters</h2>
      {/* <ComboBox options={artists} label={'Vibes'} setState={setArtist}/> */}
      {/* <ComboBox options={artists} label={'Song'} setState={setArtist} default={'All Songs'}/> */}
      <h1>Gratitude</h1>
      <h1>Values/Philosophy/Hope</h1>
      <h1>Top Contributors</h1>
      <h1>Ideas</h1>
    </ThemeProvider>
    </>
  )
}