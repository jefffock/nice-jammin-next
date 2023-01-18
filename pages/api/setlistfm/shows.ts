import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body)
  const artist = body.artist
  const year = body.year
  const mbid = serverRuntimeConfig.mbids[artist]
  const url = `https://api.setlist.fm/rest/1.0/search/setlists?artistMbid=${mbid}&year=${year}`
  let apiKey = process.env.SETLISTFM_API_KEY
  if (mbid && year) {
    try {
      await fetch(url, {
        headers: {
          'x-api-key': `${apiKey}`,
          'Accept': 'application/json'
        }
      })
        .then(data => data.json())
        .then(data => {
            res.status(200).json(data)
        })
    } catch (error) {
      console.error('error in /setlistfm/shows')
      res.status(500).send(error)
    }
  }
}