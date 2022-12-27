import getConfig from 'next/config'
import { supabase } from "../../../utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from 'next'
const { serverRuntimeConfig } = getConfig()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body)
  const artist = body.artist
  const song = body.song
  let dbName
  let baseUrl
  console.log('/songfish/versions', artist, song)
  switch (artist) {
    case 'Eggy':
      dbName = 'eggy_songs'
      baseUrl = serverRuntimeConfig.eggyBaseUrl
      break;
    case 'Goose':
      dbName = 'goose_songs'
      baseUrl = serverRuntimeConfig.gooseBaseUrl
      break;
    case "Umphrey's McGee":
      dbName = 'um_songs'
      baseUrl = serverRuntimeConfig.umphreysBaseUrl
      break;
    case 'Neighbor':
      dbName = 'neighbor_songs'
      baseUrl = serverRuntimeConfig.neighborBaseUrl
  }
  try {
    let songId
    //get song id from supabase
    const { data, error } = await supabase
      .from(dbName)
      .select('id')
      .eq('name', song)
    console.log(data)
    console.log(error)
    if (error || data.length === 0) {
      console.error('error getting songfish songid from supabase', error)
      // res.status(500).send({message: 'Error getting song id'})
    } else {
      songId = data[0]?.id
      const url = `${baseUrl}/setlists/song_id/${songId}`
      console.log('url', url)
      fetch(url)
        .then(data => data.json())
        .then(versions => {
          console.log('versions', versions)
          if (versions && versions.data && versions.data.length > 0) {
            const versionsLessData = versions.data
            .map(version => {
              const date = new Date(version.showdate + 'T18:00:00Z');
              return {
                showdate: version.showdate,
                location: `${version.venuename}, ${
                  version.city
                }, ${version.country === "USA" ? version.state : version.country}`,
                label: `${date.toLocaleDateString()} - ${version.venuename}, ${
                  version.city
                }, ${version.country === "USA" ? version.state : version.country}`
              }
            })
            res.status(200).send(versionsLessData.reverse())
          }
        })
    }
    //use songid to get versions from songfish apis
  } catch (error) {
    res.status(500).send(error)
  }
}