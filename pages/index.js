import { useState, useEffect } from 'react'
import ArtistPicker from '../components/ArtistPicker'
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
import App from '../components/App.js'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home({ jams }) {
  return (
    <App jams={jams}/>
  )

}
//   const [artists, setArtists] = useState(null)
//   const [artist, setArtist] = useState(null)
//   const [songs, setSongs] = useState(null)
//   const [song, setSong] = useState(null)
//   const [session, setSession] = useState(null)

//   const router = useRouter()

//   useEffect(() => {
//     setSession(supabase.auth.session())
//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })
//   }, [])

//   async function fetchArtists() {
//     const { data, error } = await supabase
//       .from('artists')
//       .select('*')
//       .order('ratings', { ascending: false })
//     if (error) {
//       console.error(error)
//     } else {
//       console.log('artists', data)
//       setArtists(data)
//     }
//   }

//   useEffect(() => {
//     if (!artists) {
//       fetchArtists()
//     }
//   }, [artists])

//   return (
//     <>
//     <Head>
//       {!artist && !song &&
//       <>
//       <title>Discover Great Jams by All Jam Bands</title>
//       <meta name="keywords" content="best jam jams phish grateful dead sci goose umphreys tab jrad jgb"></meta>
//       <meta name="description" content="Discover and Rate Great Jams By Phish, Grateful Dead, Goose, String Cheese Incident, Umphrey's McGee, Widespread Panic, Billy Strings, JRAD, and many more!"></meta>
//       </>
//       }
//       {artist && !song &&
//       <>
//       <title>{artist} Best Jams - NiceJammin.com</title>
//       <meta name="keywords" content="best jam jams {artist}"></meta>
//       </>
//       }
//       {song && !artist &&
//       <>
//       <title>{song} Best Jams - NiceJammin.com</title>
//       </>
//       }
//       {artist && song &&
//       <>
//       <title>{artist} {song} Best Jams - NiceJammin.com</title>
//       </>
//       }
//     </Head>
//     <ThemeProvider theme={darkTheme}>
//       <h1 className="text-3xl">Nice Jammin</h1>
//       {/* <DiscoverContributeSwitch /> */}
//       <TableTitle artist={artist} song={song} />
//       <CollapsibleTable songs={jams} />
//       <h2>Filters</h2>
//       {/* <ComboBox options={artists} label={'Vibes'} setState={setArtist}/> */}
//       <ArtistPicker options={artists} label={'Artist'} setState={setArtist} default={'All Bands'}/>
//       {/* <ComboBox options={artists} label={'Song'} setState={setArtist} default={'All Songs'}/> */}
//       <DateRangeSlider />
//       <h1>Gratitude</h1>
//       <h1>Values/Philosophy/Hope</h1>
//       <h1>Top Contributors</h1>
//       <h1>Ideas</h1>
//     </ThemeProvider>
//     </>
//   )
// }

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from('versions')
    .select('*')
    .gt('avg_rating', 0)
    .limit(100)
    .order('avg_rating', { ascending: false })
    .order('num_ratings', { ascending: false })
  if (error) {
    console.error(error)
  } else if (data) {
    console.log('jams', data)
  }
  return {
    props: {
      jams: data
    }
  }
}