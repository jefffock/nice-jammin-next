import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body)
  const artist = body.artist
  const date = body.date
  const [year, month, day] = date.split('-')
  const transformedDate = [day, month, year].join('-')
  const mbid = serverRuntimeConfig.mbids[artist]
  const url = `https://api.setlist.fm/rest/1.0/search/setlists?artistMbid=${mbid}&date=${transformedDate}`
  let apiKey = process.env.SETLISTFM_API_KEY
  if (mbid && transformedDate) {
    try {
      await fetch(url, {
        headers: {
          'x-api-key': `${apiKey}`,
          'Accept': 'application/json'
        }
      })
        .then(data => data.json())
        .then(data => {
          if (data && data.setlist && data.setlist.length > 0 && data.setlist[0].sets && data.setlist[0].sets.set && data.setlist[0].sets.set.length > 0) {
            const venueInfo = data.setlist[0].venue
            const location = `${venueInfo.name}, ${venueInfo.city.name}, ${venueInfo.city.country.code === 'US' ? venueInfo.city.stateCode : venueInfo.city.country.name}`
            let titles : string[] = []
            const setlistInfo = data.setlist[0].sets.set
            for (var i = 0; i < setlistInfo.length; i ++) {
              for (var j = 0; j < setlistInfo[i].song.length; j++) {
                titles.push(setlistInfo[i].song[j].name)
              }
            }
            res.status(200).json({ titles, location })
          } else {
            console.error('no setlist found')
            res.status(500).send({message: 'no setlist found or error'})
          }
        })
    } catch (error) {
      console.error('error in /setlistfm/setlists')
      res.status(500).send(error)
    }
  }
}