import { supabase } from "../../../utils/supabaseClient";

export default async function handler(req, res) {
  let data = JSON.parse(req.body)
  let artist = data.artist
  let artistName
  if (artist === 'Phish') {
    artistName = 'Phish'
  } else if (artist === 'Trey Anastasio, TAB') {
    artistName = 'Trey Anastasio'
  }
  try {
    const { data, error } = await supabase
      .from('phishnet_shows')
      .select('showdate, venue, city, state, country')
      .eq('artist_name', artistName)
    if (error) {
      console.error('error getting phishnet shows from supabase', error)
      throw new Error(error)
    } else {
      if (data && data.length > 0) {
        let formattedData = data.map(show => {
          const date = new Date(show.showdate + 'T18:00:00Z')
          return {
            showdate: show.showdate,
            location: `${show.venue}, ${show.city}, ${show.country === 'USA' ? show.state : show.country}`,
            label: `${date.toLocaleDateString()} - ${show.venue}, ${show.city}, ${show.country === 'USA' ? show.state : show.country}`
          }
      })
        res.status(200).json(formattedData)
      }
    }
  }
  catch (error) {
    res.status(501).send(error);
  } 
}