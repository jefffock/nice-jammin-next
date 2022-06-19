import { useState, useEffect, createContext, useContext, useMemo } from 'react'
import JamsTable from './JamsTable'
import { supabase } from '../utils/supabaseClient'
import Auth from './Auth'
import Account from './Account'
import DiscoverContributeSwitch from './DiscContSwitch'
import Table from '@mui/material/Table';
import Box from '@mui/material/Box'
import CollapsibleTable from './JamsTableCollapsible'
import { useRouter } from 'next/router'
import TableTitle from './TableTitle'
import Head from 'next/head'
import JamsDataGrid from './JamsDataGrid'
import FilterBar from './FilterBar'
import FilterList from './FilterList'
import AddVersion from './AddVersion'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { amber, deepOrange, grey } from '@mui/material/colors';
import TopContributors from './TopContributors';
import { fetchLeaders } from '../utils/fetchData';
import TopBar from './AppBar'
import Welcome from './Welcome'
import Gratitude from './Gratitude'


const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App({ jams, songs }) {
  const [updatedSongs, setUpdatedSongs] = useState(songs)
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [artists, setArtists] = useState(null)
  const [artist, setArtist] = useState(null)
  const [song, setSong] = useState(null)
  const [filteredSongs, setFilteredSongs] = useState(jams)
  const [sortedSongs, setSortedSongs] = useState(jams)
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('avg_rating');
  const [beforeDate, setBeforeDate] = useState('')
  const [afterDate, setAfterDate] = useState('')
  const [tagsSelected, setTagsSelected] = useState([])
  const router = useRouter()

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session !== null) {
        setUser(session.user)
      }
    })
  }, [])

  useEffect(() => {
    setUser(supabase.auth.user())
  }, [session])

  useEffect(() => {
    let newFilteredSongs = jams?.filter(filterFunc)
    setFilteredSongs(newFilteredSongs)
  }, [artist, tagsSelected, beforeDate, afterDate, song])

  useEffect(() => {
    sortSongs()
  }, [order, orderBy, filteredSongs])

  useEffect(() => {
    fetchProfile()
  }, [user])

  async function fetchProfile() {
    const user = supabase.auth.user()
    if (user) {
      let id = user.id
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .limit(1)
      if (error) {
        console.log('error getting profile', error)
      } if (data) {
        console.log('profile data', data[0])
        setProfile(data[0])
      }
    }
  }

  function filterFunc(item) {
    if (artist && artist !== 'All Bands' && item.artist !== artist) {
      return false
    } if (song && !item.song_name?.toLowerCase().includes(song.toLowerCase())) {
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

  return (
    <>
    <Head>
      {!artist && !song &&
      <>
      <title>Discover Great Jams by All Jam Bands</title>
      <meta name="keywords" content="best jam jams phish grateful dead sci goose umphreys tab jrad jgb"></meta>
      <meta name="description" content="Discover and Rate Great Jams By Phish, Grateful Dead, Goose, String Cheese Incident, Umphrey's McGee, Widespread Panic, Billy Strings, JRAD, and many more!"></meta>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
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
    {/* <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> */}
      <Box sx={{ bgcolor: 'primary.graybg', minHeight: '100vh', maxWidth: '100vw', overflow: 'hidden'}}>
        <TopBar showButton={true} user={user} session={session} router={router}/>

      {/* <Typography variant="h4" sx={{ mb: '.2em', ml: '.2em', color: 'primary.main'}}>Nice Jammin</Typography> */}
      {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton> */}
      {/* <DiscoverContributeSwitch /> */}
        <Welcome />
        <FilterBar setArtist={setArtist} artist={artist} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} beforeDate={beforeDate} setBeforeDate={setBeforeDate} afterDate={afterDate} setAfterDate={setAfterDate} songs={updatedSongs} song={song} setSong={setSong}/>
        <FilterList artist={artist} setArtist={setArtist} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} beforeDate={beforeDate} afterDate={afterDate} setBeforeDate={setBeforeDate} setAfterDate={setAfterDate} song={song} setSong={setSong}/>
        <CollapsibleTable songs={jams} sortedSongs={sortedSongs} sortSongs={sortSongs} order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} user={user} profile={profile} />
        <br></br>
        <AddVersion songs={updatedSongs} setSongs={setUpdatedSongs} jams={jams} user={user} profile={profile}/>
        <Gratitude />
        <TopContributors />
      </Box>
      {/* </ThemeProvider>
    </ColorModeContext.Provider> */}
    </>
  )
}