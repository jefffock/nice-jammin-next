import { supabase } from './supabaseClient'

async function fetchAllJams() {
  const { data, error } = await supabase
    .from('versions')
    .select('*')
    // .gt('avg_rating', 0)
    // .limit(100)
    .order('avg_rating', { ascending: false })
    .order('num_ratings', { ascending: false })
    .order('id', { ascending: false })
  if (error) {
    console.error(error)
  } else if (data) {
    return data
  }
}

async function fetchArtists() {
  const { data, error } = await supabase
  .from('artists')
  .select('*')
  .order('ratings', {ascending: false})
  if (error) {
    console.error(error)
  } else {
    setArtists(data)
  }
}

async function fetchSongs() {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    // .gt('avg_rating', 0)
    // .limit(100)
    .order('song', { ascending: true })
  if (error) {
    console.error(error)
  } else if (data) {
    return data
  }
}

async function fetchLeaders() {
  const { data, error } = await supabase
  .from('profiles')
  .select('name, points')
  .not('name', 'eq', 'Henrietta')
  .limit(20)
  .order('points', {ascending: false})
  if (error) {
    console.error('error fetching top contributors', error)
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
    console.error('error fetching versions', error)
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
    console.error(error)
  } else if (data) {
    setReviews(data)
  }
}

async function fetchIdeas() {
  const { data, error } = await supabase
  .from('ideas')
  .select('*')
  .eq('done', false)
  .order('votes', { ascending: false })
  if (error) {
    console.error('error fetching ideas', error)
    return error
  } else {
    return data
  }
}

async function fetchComments(versionId) {
  const { data, error } = await supabase
  .from('ratings')
  .select('*')
  // .neq('comment', NULL)
  .eq('version_id', versionId)
  .order('helpful', { ascending: false })
  if (error) {
    console.error(error)
  } if (data) {
    return data
  } return null
}

async function checkUserAlreadyRated(name, versionId) {
  const { data, error } = await supabase
    .from('ratings')
    .select('*')
    .eq('submitter_name', name)
    .eq('version_id', versionId)
  if (error) {
    console.error('error in checkUserAlreadyRated', error)
  } else {
    if (data.length > 0) {
      return data
    }
  }
}

export { fetchAllJams, fetchArtists, fetchSongs, fetchLeaders, fetchVersions, fetchRatings, fetchIdeas, fetchComments, checkUserAlreadyRated }