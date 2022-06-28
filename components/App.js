import { useState, useEffect, createContext, useContext, useMemo, Suspense } from 'react'
import { supabase } from '../utils/supabaseClient'
import { fetchLeaders, fetchSongs, fetchAllJams } from '../utils/fetchData';
import { useRouter } from 'next/router'
import Head from 'next/head'
import CollapsibleTable from './JamsTableCollapsible'
import Box from '@mui/material/Box'
import FilterBar from './FilterBar'
import FilterList from './FilterList'
import AddVersion from './AddVersion'
import AddIdea from './AddIdea'
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import { amber, deepOrange, grey } from '@mui/material/colors';
import TopContributors from './TopContributors';
import TopBar from './AppBar'
import Welcome from './Welcome'
import Gratitude from './Gratitude'
import IdeasTable from './IdeasTable'
import dynamic from 'next/dynamic'

const DynamicContributorsTable = dynamic(() => import('./TopContributors'), {
  suspense: true,
})
const DynamicJamsTable = dynamic(() => import('./JamsTableCollapsible'), {
  suspense: true,
})


const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App({ jams }) {
  const [updatedSongs, setUpdatedSongs] = useState(null)
  const [updatedJams, setUpdatedJams] = useState(jams)
  const [songs, setSongs] = useState(null)
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [artists, setArtists] = useState(null)
  const [artist, setArtist] = useState(null)
  const [song, setSong] = useState(null)
  const [filteredJams, setFilteredJams] = useState(jams)
  const [sortedJams, setSortedJams] = useState(jams)
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
    const getAllJams = async () => {
      let allJams = await fetchAllJams()
      setUpdatedJams(allJams)
    }
    getAllJams()
    if (!songs) {
      const getSongs = async () => {
        let songs = await fetchSongs()
        setSongs(songs)
        setUpdatedSongs(songs)
      }
      getSongs()
    }

  }, [])


  useEffect(() => {
    setUser(supabase.auth.user())
  }, [session])

  useEffect(() => {
    let newFilteredJams = updatedJams?.filter(filterFunc)
    setFilteredJams(newFilteredJams)
  }, [artist, tagsSelected, beforeDate, afterDate, song, updatedJams])

  useEffect(() => {
    sortJams()
  }, [order, orderBy, filteredJams])

  useEffect(() => {
    fetchProfile()
  }, [user])

  useEffect(() => {

  })

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

  function sortJams() {
    let newSortedJams = filteredJams.slice().sort(getComparator(order, orderBy))
    setSortedJams(newSortedJams)
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
      <><title>{song} Best Jams - NiceJammin.com</title></>
      }
      {artist && song &&
      <><title>{artist} {song} Best Jams - NiceJammin.com</title></>
      }
    </Head>
    <Box sx={{ bgcolor: 'primary.graybg', minHeight: '100vh', maxWidth: '100vw', overflow: 'hidden'}}>
      <TopBar showButton={true} user={user} session={session} router={router}/>
    {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton> */}
      <Welcome />
      <FilterBar setArtist={setArtist} artist={artist} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} beforeDate={beforeDate} setBeforeDate={setBeforeDate} afterDate={afterDate} setAfterDate={setAfterDate} songs={updatedSongs} song={song} setSong={setSong}/>
      <Typography variant="h5" textAlign="center" mt="2em">Favorite Jams</Typography>
      <Typography textAlign="center">Tap to listen</Typography>
      <FilterList artist={artist} setArtist={setArtist} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} beforeDate={beforeDate} afterDate={afterDate} setBeforeDate={setBeforeDate} setAfterDate={setAfterDate} song={song} setSong={setSong}/>
      <Suspense fallback={`Loading...`}>
        <DynamicJamsTable jams={jams} sortedJams={sortedJams} sortJams={sortJams} order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} user={user} profile={profile}/>
      </Suspense>
      <CollapsibleTable jams={jams} sortedJams={sortedJams} sortJams={sortJams} order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} user={user} profile={profile} />
      <br></br>
      <AddVersion songs={updatedSongs} setSongs={setUpdatedSongs} jams={updatedJams} user={user} profile={profile} setUpdatedJams={setUpdatedJams}/>
      <Gratitude />
      <IdeasTable />
      {/* <TopContributors /> */}
      <Suspense fallback={`Loading...`}>
        <DynamicContributorsTable />
      </Suspense>
    </Box>
    </>
  )
}