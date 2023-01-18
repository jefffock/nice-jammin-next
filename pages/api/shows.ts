import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const url =
		'https://concerts-artists-events-tracker.p.rapidapi.com/artist/past?name=Phish&minDate=2021-05-13&maxDate=2022-01-25&page=1';

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '305d62d37bmsh3462197a6418d63p174e08jsn5d7f86ce8363',
			'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com',
		},
	};

	fetch(url, options)
		.then((res) => res.json())
		.then((json) => {
			res.status(200).json(json);
		})
		.catch((err) => console.error('error:' + err));
	// const body = JSON.parse(req.body)
	// const artist = body.artist
	// const date = body.date
	// const [year, month, day] = date.split('-')
	// const transformedDate = [day, month, year].join('-')
	// const mbid = serverRuntimeConfig.mbids[artist]
	// const url = `https://api.setlist.fm/rest/1.0/search/setlists?artistMbid=${mbid}&date=${transformedDate}`
	// let apiKey = process.env.SETLISTFM_API_KEY
	// if (mbid && transformedDate) {
	// }
};
