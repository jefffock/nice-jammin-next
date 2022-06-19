import { supabase } from './supabaseClient'


async function fetchArtists() {
  const { data, error } = await supabase
  .from('artists')
  .select('*')
  .order('ratings', {ascending: false})
  if (error) {
    console.log(error)
  } else {
    setArtists(data)
  }
}

async function fetchSongs() {
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

export default async function fetchLeaders() {
  const { data, error } = await supabase
  .from('profiles')
  .select('name, points')
  .not('name', 'eq', 'Henrietta')
  .limit(20)
  .order('points', {ascending: false})
  if (error) {
    console.log('error fetching top contributors', error)
  } else {
    return data
  }
}


async function fetchVersions(songId) {
  const { data, error } = await supabase
  .from('versions')
  .select('*')
  .eq('song_id', songId)
  .order('avg_rating', {ascending: false})
  if (error) {
    console.log('error fetching versions', error)
  } else if (data) {
    setVersions(data)
  }
}

async function fetchRatings(versionId) {
  const { data, error } = await supabase
  .from('ratings')
  .select('*, versions!inner(*)')
  .eq('versions.id', versionId)
  .order('helpful', {ascending: false})
  if (error) {
    console.log(error)
  } else if (data) {
    setReviews(data)
  }
}

async function fetchIdeas() {
  const { data, error } = await supabase
  .from('ideas')
  .select('*')
  .order('votes', { ascending: false})
  if (error) {
    console.log('error fetching ideas', error)
  } else {
    setIdeas(data)
  }
}

export { fetchArtists, fetchSongs, fetchLeaders, fetchVersions, fetchRatings, fetchIdeas }