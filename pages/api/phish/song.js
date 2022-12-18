import { supabase } from '../../../utils/supabaseClient'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//alumni-blues
export default async function handler(req, res) {
  console.log('req.body', req.body);
  let songName = req.body.song
  try {
    const { data, error } = await supabase
      .from('phishnet_songs')
      .select('*')
      .eq('song', songName)
  if (error) {
    console.error(error)
  } else {
    console.log('data[0] from supabase in /song', data[0])
    const songId = data[0].songid
    if (songId) {
      const url = `https://api.phish.net/v5/setlists/songid/${songId}.json?apikey=${process.env.PHISHNET_API_KEY}`
      fetch(url)
        .then(data => data.json())
        .then(versions => {
          console.log('typeof ', typeof versions.data, Array.isArray(versions.data))
          const versionsLessData = versions.data.map(({ showdate, isjamchart, venue, city, state, country, artistid }) => ({ showdate, isjamchart, venue, city, state, country, artistid }))
            
            // version => {
            // versionsData.push({ showdate: version.showdate, isjamchart: version.isjamchart, venue: version.venue, city: version.city, state: version.state, country: version.country, artistid: version.artistid })
          console.log('respons!', versionsLessData)
          res.status(200).send(JSON.stringify(versionsLessData));
        })
      }
    }
    //use song title to get phishnet songid from supabase, or just add phishnet songid to the song
    //use phishnet song id to get performances
  }
  catch (error) {
    res.status(500).send(error);
  } 
}