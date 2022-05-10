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


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Home() {
  const [artists, setArtists] = useState(null)
  const [artist, setArtist] = useState(null)
  const [songs, setSongs] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  async function fetchTopJams() {
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

  function handleArtistSelect(e) {
    console.log(e.target.value)
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <h1 className="text-3xl">Nice Jammin</h1>
      <DiscoverContributeSwitch />
      <CollapsibleTable songs={songs} />
      <h2>Want to narrow things down a bit?</h2>
      <ComboBox options={artists} label={'Artist'} setState={setArtist}/>
      {/* {artist &&
      <ComboBox options={artists} label={'Song'} setState={setArtist}/>
      } */}
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