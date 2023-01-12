import type { NextApiRequest, NextApiResponse } from 'next';
import { version } from 'uuid';
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
		.order('id', { ascending: false })
		.eq('submitter_name', username);
	const versions = supabase
		.from('versions')
		.select('*')
		.order('id', { ascending: false })
		.eq('submitter_name', username);
	const ratings = supabase
		.from('ratings')
		.select('rating, comment, version_id, id')
		.order('id', { ascending: false })
		.eq('submitter_name', username);
	const ideas = supabase
		.from('ideas')
		.select('idea_body, done, votes, id')
		.order('id', { ascending: false })
		.eq('user_name', username);
  const allSongs = supabase
    .from('songs')
    .select('*')
	try {
		Promise.all([songs, versions, ratings, ideas, allSongs])
			.then(([songsObj, versionsObj, ratingsObj, ideasObj, allSongsObj]) => {
				const songs = songsObj.data;
				const versions = versionsObj.data;
				const ratings = ratingsObj.data;
				const ideas = ideasObj.data;
        const allSongs = allSongsObj.data;
				if (ratings) {
					const versionsUserHasRated = ratings.map(
						(rating) => rating.version_id
					);
					const fetchVersionsRated = supabase
						.from('versions')
						.select('*')
						.in('id', versionsUserHasRated);
					Promise.all([fetchVersionsRated])
						.then(([ratedVersions]) => {
							const versionsRated: Array<any> | null = ratedVersions.data;
							if (versionsRated) {
								const ratingsWithVersions = ratings.map((rating) => {
									const index: number = versionsRated.findIndex(
										(version) => version.id === rating.version_id
									);
									let versionInfo;
									if (versionsRated && (index || index === 0)) {
										versionInfo = versionsRated[index];
									}
									return {
										rating,
										versionInfo,
									};
								});
								res.status(200).send({
									ratings: ratingsWithVersions,
									songs,
									versions,
									ideas,
                  allSongs
								});
							}
						})
						.catch((error) => {
							console.error(error);
							res
								.status(500)
								.send({ message: 'fetch rated versions rejected' });
						});
				} else {
					res.status(200).send({
						ratings,
						songs,
						versions,
						ideas,
            allSongs
					});
				}
			})
			.catch((error) => {
				console.error(error);
				res
					.status(500)
					.send({ message: 'one of the initial promises rejected' });
			});
	} catch (error) {
		res.status(500).send(error);
	}
};
