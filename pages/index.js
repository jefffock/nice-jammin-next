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


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Home() {
  const [artists, setArtists] = useState(null)
  const [artist, setArtist] = useState(null)
  const [songs, setSongs] = useState(null)
  const [song, setSong] = useState(null)
  const [session, setSession] = useState(null)

  const router = useRouter()

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  async function fetchTopJams(artist, song, dateRange, tags) {
    if (!artist && !dateRange && !tags) {
      const { data, error } = await supabase
      .from('versions')
      .select('*')
      .gt('avg_rating', 0)
      .limit(100)
      .order('avg_rating', { ascending: false })
      if (error) {
        console.error(error)
      } else if (data) {
        setSongs(data)
      }
    } if (artist) {
      if (song) {
        if (tags) {

        } if (!tags) {

        }
      }
    }
  }

  async function fetchArtists() {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .order('ratings', { ascending: false })
    if (error) {
      console.error(error)
    } else {
      console.log('artists', data)
      setArtists(data)
    }
  }

  useEffect(() => {
    if (!songs) {
      fetchTopJams()
    }
  }, [songs])

  useEffect(() => {
    if (!artists) {
      fetchArtists()
    }
  }, [artists])

  useEffect(() => {
    if (artist !== router.query.artist && artist !== null) {
      router.push(`/?artist=${artist}`)
    }
  }, [artist, router])

  function handleArtistSelect(e) {
    console.log(e.target.value)
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <h1 className="text-3xl">Nice Jammin</h1>
      <DiscoverContributeSwitch />
      <TableTitle artist={artist} song={song} />
      <CollapsibleTable songs={songs} />
      <h2>Want to narrow things down a bit?</h2>
      <ComboBox options={artists} label={'Artist'} setState={setArtist} default={'All Bands'}/>
      {artist &&
      <ComboBox options={artists} label={'Song'} setState={setArtist} default={'All Songs'}/>
      }
      {/* <ComboBox options={artists} label={'Vibes'} setState={setArtist}/> */}
      <DateRangeSlider />
      <h1>Gratitude</h1>
      <h1>Values/Philosophy/Hope</h1>
      <h1>Top Contributors</h1>
      <h1>Ideas</h1>
      {/* <JamsTable songs={songs}/> */}
    </ThemeProvider>
  )
}

export default Home