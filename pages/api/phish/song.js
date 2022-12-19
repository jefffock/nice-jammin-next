import { supabase } from '../../../utils/supabaseClient'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//alumni-blues
export default async function handler(req, res) {
  const body = JSON.parse(req.body)
  let songName = body.song
  console.log('songName', songName)
  try {
    const { data, error } = await supabase
      .from('phishnet_songs')
      .select('*')
      .eq('song', songName)
  if (error) {
    console.error('error getting phishnet songs from supabase', error)
  } else {
    console.log('data[0] from supabase in /song', data[0])
    const songId = data[0].songid
    if (songId) {
      const url = `https://api.phish.net/v5/setlists/songid/${songId}.json?apikey=${process.env.PHISHNET_API_KEY}`
      fetch(url)
        .then(data => data.json())
        .then(versions => {
          const versionsLessData = versions.data
            .filter(version => version.artistid === '1')
            .map(version => {
              console.log('version', version)
              if (version.artistid === '1') {
                const date = new Date(version.showdate)
                return ({ showdate: version.showdate, isjamchart: version.isjamchart, venue: version.venue, city: version.city, state: version.state, country: version.country, artistid: version.artistid, label: `${date.toDateString()} - ${version.venue}, ${version.city}, ${version.state ?? ''} ${(version.country === 'USA') ? '' : version.country}` })
              } else {
                return null
              }
            })
            res.status(200).send(JSON.stringify(versionsLessData.reverse()));
          //label: `${showdate}, ${venue}, ${city}, ${state}`
        })
      }
    }
    //use song title to get phishnet songid from supabase, or just add phishnet songid to the song
    //use phishnet song id to get performances
  }
  catch (error) {
    console.error('/song error', error)
    res.status(500).send(error);
  } 
}