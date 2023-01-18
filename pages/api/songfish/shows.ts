import getConfig from 'next/config';
import type { NextApiRequest, NextApiResponse } from 'next';
const { serverRuntimeConfig } = getConfig();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const body = JSON.parse(req.body);
	const artist = body.artist;
	const year = body.year;
	let baseUrl;
	switch (artist) {
		case 'Goose':
			baseUrl = serverRuntimeConfig.baseUrls.gooseBaseUrl;
			break;
		case 'Eggy':
			baseUrl = serverRuntimeConfig.baseUrls.eggyBaseUrl;
			break;
		case "Umphrey's McGee":
			baseUrl = serverRuntimeConfig.baseUrls.umphreysBaseUrl;
			break;
		case 'Neighbor':
			baseUrl = serverRuntimeConfig.baseUrls.neighborBaseUrl;
			break;
	}
	// const url = `${baseUrl}/shows/show_year/${year}.json?order_by=showdate`
	const url = `${baseUrl}/shows/show_year/${year}.json?order_by=showdate`;
	try {
		await fetch(url)
			.then((data) => data.json())
			.then((shows) => {
        if (shows && shows.data && shows.data.length > 0) {
          const showsRes = shows.data
          .filter(song => song.artist_id === '1')
          .map(show => {
            const location = `${show.venuename}, ${show.city}, ${show.country === 'USA' ? show.state : show.country}`
            const date = new Date(show.showdate + 'T18:00:00Z')
            return { 
              location,
              showdate: show.showdate,
              label: `${date.toLocaleDateString()} - ${location}`
            }
          })
          res.status(200).send(showsRes)
        }
				res.status(200).send(shows.data);
			});
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};
