import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const body = JSON.parse(req.body);
	const username = body.username;
	//songs
	//versions
	//ratings
	//ideas
	const songs = supabase
		.from('songs')
		.select('*')
		.eq('submitter_name', username);
	const versions = supabase
		.from('versions')
		.select('date, song_name, artist, location')
		.eq('submitter_name', username);
	const ratings = supabase
		.from('ratings')
		.select('rating, comment, version_id')
		.eq('submitter_name', username);
	const ideas = supabase
		.from('ideas')
		.select('idea_body, done, votes')
		.eq('user_name', username);
	try {
		Promise.all([songs, versions, ratings, ideas]).then(
			([songsObj, versionsObj, ratingsObj, ideasObj]) => {
				const songs = songsObj.data;
				const versions = versionsObj.data;
				const ratings = ratingsObj.data;
				const ideas = ideasObj.data;
				if (ratings) {
					const versionsUserHasRated = ratings.map(
						(rating) => rating.version_id
					);
					const fetchVersionsRated = supabase
						.from('versions')
						.select('date, song_name, artist, location, id')
						.in('id', versionsUserHasRated);
					Promise.all([fetchVersionsRated]).then(([versions]) => {
            const versionsRated = versions.data
            const ratingsWithVersions = ratings.map(rating => {
              let index = versionsRated?.findIndex(version => version.id === rating.version_id)
              console.log('index', index)
              if (index && versionsRated) {
                return {
                  rating,
                  versionInfo: versionsRated[index]
                }
              }
            })
						res.status(200).send({
							ratingsWithVersions,
							songs,
							versions,
							ideas,
						});
					});
				}
			}
		);
	} catch (error) {
		res.status(500).send(error);
	}
};
