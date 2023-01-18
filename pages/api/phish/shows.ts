import getConfig from 'next/config';
import type { NextApiRequest, NextApiResponse } from 'next';
const { serverRuntimeConfig } = getConfig();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const body = JSON.parse(req.body);
	const artist = body.artist;
	const year = body.year;
	let artistId
  switch(artist) {
    case 'Phish':
      artistId = '1'
      break;
    case 'Trey Anastasio, TAB':
      artistId = '2'
      break;
    default:
      artistId = '1'
  }
  const url = `https://api.phish.net/v5/shows/showyear/${year}.json?apikey=${process.env.PHISHNET_API_KEY}`
	try {
		await fetch(url)
			.then((data) => data.json())
			.then((shows) => {
        if (shows && shows.data && shows.data.length > 0) {
          const showsRes = shows.data
          .filter(song => song.artistid === artistId)
          .map(show => {
            const location = `${show.venue}, ${show.city}, ${show.country === 'USA' ? show.state : show.country}`
            const date = new Date(show.showdate + 'T18:00:00Z')
            return { 
              location,
              showdate: show.showdate,
              label: `${date.toLocaleDateString()} - ${location}`
            }
          })
          res.status(200).send({shows: showsRes})
        } else {
          res.status(500).send({error: 'No shows found'});
        }
			});
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};
