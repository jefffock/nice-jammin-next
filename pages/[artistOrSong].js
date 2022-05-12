import { useState, useEffect } from 'react'
import ComboBox from '../components/ComboBox'
import JamsTable from '../components/JamsTable'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import DiscoverContributeSwitch from '../components/DiscContSwitch'
import Table from '@mui/material/Table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CollapsibleTable from '../components/JamsTableCollapsible'
import DateRangeSlider from '../components/DateRangeSlider'
import { useRouter } from 'next/router'
import TableTitle from '../components/TableTitle'
import Head from 'next/head'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home({ jams }) {
  const [artists, setArtists] = useState(null)
  const [artist, setArtist] = useState(null)
  const [songs, setSongs] = useState(null)
  const [song, setSong] = useState(null)
  const [session, setSession] = useState(null)

  const router = useRouter()

  useEffect(() => {
    console.log('router.query', router.query)
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  async function fetchArtists() {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .order('ratings', { ascending: false })
    if (error) {
      console.error(error)
    } else {
      setArtists(data)
    }
  }

  useEffect(() => {
    if (!artists) {
      fetchArtists()
    }
  }, [artists])

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
      <DiscoverContributeSwitch />
      <TableTitle artist={artist} song={song} />
      <CollapsibleTable songs={jams} />
      <h2>Want to narrow things down a bit?</h2>
      {/* <ComboBox options={artists} label={'Vibes'} setState={setArtist}/> */}
      <ComboBox options={artists} label={'Artist'} setState={setArtist} default={'All Bands'}/>
      <ComboBox options={artists} label={'Song'} setState={setArtist} default={'All Songs'}/>
      <DateRangeSlider />
      <h1>Gratitude</h1>
      <h1>Values/Philosophy/Hope</h1>
      <h1>Top Contributors</h1>
      <h1>Ideas</h1>
    </ThemeProvider>
    </>
  )
}

export async function getServerSideProps(context) {
  let artistSlugs = {
    'allman-brothers': 'The Allman Brothers Band',
    'billy-strings': 'Billy Strings',
    dopapod: 'Dopapod',
    furthur: 'Furthur',
    'grateful-dead': 'Grateful Dead',
    goose: 'Goose',
    greensky: 'Greensky Bluegrass',
    'jgb-lom': 'Jerry Garcia Band, Legion of Mary',
    'joe-russos-almost-dead': 'Joe Russo\'s Almost Dead',
    lettuce: 'Lettuce',
    lotus: 'Lotus',
    'medeski-martin-wood': 'Medeski Martin & Wood',
    moe: 'moe.',
    osees: 'Osees',
    'phil-lesh': 'Phil Lesh & Friends',
    phish: 'Phish',
    'string-cheese-incident': 'String Cheese Incident',
    'trey-anastasio-band': 'Trey Anastasio, TAB',
    'umphreys-mcgee': 'Umphrey\'s McGee',
    'widespread-panic': 'Widespread Panic'
  }
  let artistSlug, songId, artistName
  //if it's a number, it's a song, else, it's an artist
  isNaN(context.query.artistOrSong) ? artistSlug = context.query.artistOrSong : songId = context.query.artistOrSong
  let jams
  if (artistSlug) {
    artistName = artistSlugs[artistSlug]
    //for artist slug
    const { data, error } = await supabase
    .from('versions')
    .select('*')
    .eq('artist', `${artistName}`)
    .limit(100)
    .order('avg_rating', { ascending: false })
    .order('num_ratings', { ascending: false })
    if (error) {
      console.error(error)
    } else if (data) {
      jams = data
    }
  }
return {
  props: {
    jams: jams
  }
}
}