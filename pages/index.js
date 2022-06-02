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

export default function Home({ jams, songs }) {
  return (
    <App jams={jams} songs={songs}/>
  )
}

export async function getServerSideProps() {
  async function getJams() {
    const { data, error } = await supabase
      .from('versions')
      .select('*')
      // .gt('avg_rating', 0)
      // .limit(100)
      .order('avg_rating', { ascending: false })
      .order('num_ratings', { ascending: false })
    if (error) {
      console.error(error)
    } else if (data) {
      return data
    }
  }
  async function getSongs() {
    const { data, error } = await supabase
      .from('songs')
      .select('song', 'id')
      // .gt('avg_rating', 0)
      // .limit(100)
      .order('song', { ascending: true })
    if (error) {
      console.error(error)
    } else if (data) {
      return data
    }
  }
  const [jams, songs] = await Promise.all([
    getJams(),
    getSongs()
  ])
  return {
    props: { jams, songs }
  }
}