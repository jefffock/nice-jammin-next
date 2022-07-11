import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themes'
import { useState, useEffect, createContext, useContext, useMemo, Suspense } from 'react'
import { supabase } from '../utils/supabaseClient'
import { fetchSongs, fetchAllJams } from '../utils/fetchData';
import { useRouter } from 'next/router'
import Head from 'next/head'
import CollapsibleTable from '../components/JamsTableCollapsible'
import Box from '@mui/material/Box'
import FilterBar from '../components/FilterBar'
import FilterList from '../components/FilterList'
import AddVersion from '../components/AddVersion'
import Typography from '@mui/material/Typography';
import TopBar from '../components/AppBar'
import Welcome from '../components/Welcome'
import dynamic from 'next/dynamic'
import JamsTableVirtualized from '../components/JamsTableVirtualized'

const DynamicContributorsTable = dynamic(() => import('../components/TopContributors'), {
  suspense: true
})
const DynamicJamsTable = dynamic(() => import('../components/JamsTableCollapsible'), {
  suspense: true
})
const DynamicJamsTableVirtualized = dynamic(() => import('../components/JamsTableVirtualized'), {
  suspense: true
})
const DynamicAddVersion = dynamic(() => import('../components/AddVersion'), {
  suspense: true
})
const DynamicGratitude = dynamic(() => import('../components/Gratitude'), {
  suspense: true
})
const DynamicIdeasTable = dynamic(() => import('../components/IdeasTable'), {
  suspense: true
})
const DynamicFooter = dynamic(() => import('../components/Footer'), { suspense: true})

export default function App({ jams }) {
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
  }, [])


  useEffect(() => {
    setUser(supabase.auth.user())
  }, [session])

  useEffect(() => {
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
    let newFilteredJams = updatedJams?.filter(filterFunc)
    setFilteredJams(newFilteredJams)
  }, [artist, tagsSelected, beforeDate, afterDate, song, updatedJams])

  useEffect(() => {
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
      return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
    }
    function sortJams() {
      let newSortedJams = filteredJams.slice().sort(getComparator(order, orderBy))
      setSortedJams(newSortedJams)
    }
    sortJams()
  }, [order, orderBy, filteredJams])

  useEffect(() => {
    if (user && !profile) {
      async function fetchProfile() {
        if (user) {
          let id = user.id
          let { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .limit(1)
          if (error) {
            console.error('error getting profile', error)
          } if (data) {
            setProfile(data[0])
          }
        }
      }
      fetchProfile()
    }
  }, [user, profile])

  return (
    <ThemeProvider theme={theme}>
    <Head>
    <link rel="shortcut icon" href="/favicon.ico" />
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
      <Welcome />
      <FilterBar setArtist={setArtist} artist={artist} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} beforeDate={beforeDate} setBeforeDate={setBeforeDate} afterDate={afterDate} setAfterDate={setAfterDate} songs={songs} song={song} setSong={setSong}/>
      <Typography fontSize="20px" textAlign="center" mt="1em">Filtered Jams</Typography>
      <FilterList artist={artist} setArtist={setArtist} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} beforeDate={beforeDate} afterDate={afterDate} setBeforeDate={setBeforeDate} setAfterDate={setAfterDate} song={song} setSong={setSong}/>
      <Suspense fallback={<p>Loading....</p>}>
        {/* <DynamicJamsTableVirtualized jams={jams} sortedJams={sortedJams}  order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} user={user} profile={profile} setUpdatedJams={setUpdatedJams} songs={songs} setSongs={setSongs}/> */}
        <DynamicJamsTable jams={jams} sortedJams={sortedJams}  order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} user={user} profile={profile} setUpdatedJams={setUpdatedJams} songs={songs} setSongs={setSongs}/>
        <br></br>
        <DynamicAddVersion songs={songs} setSongs={setSongs} jams={updatedJams} user={user} profile={profile} setUpdatedJams={setUpdatedJams} artist={artist} setArtist={setArtist} song={song} setSong={setSong}/>
        <DynamicGratitude />
        <DynamicIdeasTable user={user} profile={profile}/>
        <DynamicContributorsTable />
        <DynamicFooter user={user} profile={profile} />
      </Suspense>
    </Box>
    </ThemeProvider>
  )
}

export async function getStaticProps() {
  async function getJams() {
    const { data, error } = await supabase
      .from('versions')
      .select('*')
      // .gt('avg_rating', 0)
      .limit(30)
      .order('avg_rating', { ascending: false })
      .order('num_ratings', { ascending: false })
    if (error) {
      console.error(error)
    } else if (data) {
      return data
    }
  }

  const jams = await getJams()
  return {
    props: { jams }
  }
}