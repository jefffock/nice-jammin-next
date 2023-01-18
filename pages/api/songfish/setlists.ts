import getConfig from 'next/config'
import type { NextApiRequest, NextApiResponse } from 'next'
const { serverRuntimeConfig } = getConfig()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body)
  const artist = body.artist
  const date = body.date
  let baseUrl
  switch (artist) {
    case 'Goose':
      baseUrl = serverRuntimeConfig.baseUrls.gooseBaseUrl
      break;
    case 'Eggy':
      baseUrl = serverRuntimeConfig.baseUrls.eggyBaseUrl
      break;
    case "Umphrey's McGee":
      baseUrl = serverRuntimeConfig.baseUrls.umphreysBaseUrl
      break;
    case 'Neighbor':
      baseUrl = serverRuntimeConfig.baseUrls.neighborBaseUrl
      break;
  }
  const url = `${baseUrl}/setlists/showdate/${date}`
  try {
    await fetch(url)
      .then(data => data.json())
      .then(setlist => {
        if (setlist && setlist.data && setlist.data.length > 0) {
          const titles = setlist.data
          .filter(song => song.artist_id === '1')
          .map(({ songname }) => {
            return songname
          })
          const location = `${setlist.data[0].venuename}, ${setlist.data[0].city}, ${setlist.data[0].country === 'USA' ? setlist.data[0].state : setlist.data[0].country}`
          res.status(200).send({ titles, location })
        } else {
          res.status(200).send({ message: 'No setlist found', error: true })
        }
      })
  } catch (error) {
    res.status(500).send(error)
  }
}