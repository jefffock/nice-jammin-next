import getConfig from 'next/config';
import { supabase } from '../../../utils/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';
const { serverRuntimeConfig } = getConfig();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const body = JSON.parse(req.body);
	const artist = body.artist;
	const song = body.song;
	let dbName;
	let baseUrl;
	switch (artist) {
		case 'Eggy':
			dbName = 'eggy_songs';
			baseUrl = serverRuntimeConfig.baseUrls.eggyBaseUrl;
			break;
		case 'Goose':
			dbName = 'goose_songs';
			baseUrl = serverRuntimeConfig.baseUrls.gooseBaseUrl;
			break;
		case "Umphrey's McGee":
			dbName = 'um_songs';
			baseUrl = serverRuntimeConfig.baseUrls.umphreysBaseUrl;
			break;
		case 'Neighbor':
			dbName = 'neighbor_songs';
			baseUrl = serverRuntimeConfig.baseUrls.neighborBaseUrl;
	}
	try {
		let songId;
		//get song id from supabase
		const { data, error } = await supabase
			.from(dbName)
			.select('id')
			.eq('name', song);
		if (error || data.length === 0) {
			console.error('error getting songfish songid from supabase', error);
			res.status(500).send([]);
		} else {
			songId = data[0]?.id;
			const url = `${baseUrl}/setlists/song_id/${songId}`;
			fetch(url)
				.then((data) => data.json())
				.then((versions) => {
					if (versions && versions.data && versions.data.length > 0) {
						const versionsLessData = versions.data.map((version) => {
							const date = new Date(version.showdate + 'T18:00:00Z');
							const location = `${version.venuename}, ${version.city}, ${
								version.country === 'USA' ? version.state : version.country
							}`;
							return {
								showdate: version.showdate,
								location: location,
								label: `${date.toLocaleDateString()} - ${location}`,
							};
						});
            console.log('found shows for song', song)
						res.status(200).send(versionsLessData.reverse());
					} else {
            console.log('no shows found for song', song)
						res.status(500).send([]);
					}
				});
		}
	} catch (error) {
    console.error('error getting songfish versions', song, error)
		res.status(500).send([]);
	}
};
