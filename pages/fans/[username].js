import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/themes';
import TopBar from '../../components/AppBar';
import Box from '@mui/material/Box';
import Head from 'next/head';
import Button from '@mui/material/Button';
import ListenLink from '../../components/ListenLink';
import RateVersion from '../../components/RateVersion';
import { supabase } from '../../utils/supabaseClient';
import Stack from '@mui/material/Stack';
import AddListenLink from '../../components/AddListenLink';

export default function Contributor({
	ratings,
	songs,
	versions,
	ideas,
	allSongs,
	versionsRated,
}) {
	const router = useRouter();
	const { username } = router.query;
	const [fetchedData, setFetchedData] = useState(false);
	const profile = useRef(null);
	const [showRatings, setShowRatings] = useState(false);
	const [showVersions, setShowVersions] = useState(false);
	const [showIdeas, setShowIdeas] = useState(false);
	const [showSongs, setShowSongs] = useState(false);
  const [user, setUser] = useState(null)

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
		};
		if (!user) {
			getUser();
		}
	});

	useEffect(() => {
		if (user && !profile) {
			async function fetchProfile() {
				if (user) {
					let id = user.id;
					let { data } = await supabase
						.from('profiles')
						.select('*')
						.eq('id', id)
						.limit(1);
					if (data) {
						profile = data[0];
					}
				}
			}
			fetchProfile();
		}
	}, [user]);

	function handleShowHide(category) {
		switch (category) {
			case 'ratings':
				setShowRatings(!showRatings);
				break;
			case 'versions':
				setShowVersions(!showVersions);
				break;
			case 'songs':
				setShowSongs(!showSongs);
				break;
			case 'ideas':
				setShowIdeas(!showIdeas);
				break;
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Head></Head>
			<Box
				sx={{
					bgcolor: 'primary.graybg',
					minHeight: '100vh',
					maxWidth: '100vw',
					overflow: 'hidden',
				}}
			>
				<TopBar
					showButton={false}
					user={user}
					router={router}
				/>
				<Box
					m={'1em'}
					maxWidth={'700px'}
					mx={'auto'}
					padding={'0.5em'}
				>
					{username && (
						<>
							<Typography
								fontSize={28}
								textAlign={'center'}
								mt={'1em'}
							>
								{username}&apos;s Contributions
							</Typography>
							<Typography
								textAlign={'center'}
								mb={'1em'}
							>
								Thank you!
							</Typography>
						</>
					)}
					{ratings && ratings.length > 0 && (
						<>
							<Typography fontSize={24}>
								Comments, Ratings ({ratings.length})
							</Typography>
							<Button onClick={() => handleShowHide('ratings')}>
								{showRatings ? 'Hide' : 'Show'}
							</Button>
						</>
					)}
					{showRatings && (
						<Box alignItems={'center'}>
							{ratings.map((rating, index) => {
								return (
									<Box
										key={index}
										textAlign={'center'}
										mb={'2em'}
										bgcolor={'white'}
										borderRadius={'15px'}
										width={'fit-content'}
										p={'1em'}
										boxShadow={1}
										mx={'auto'}
									>
										<Typography fontSize={22}>
											{rating?.versionInfo?.song_name}
										</Typography>
										<Typography>
											{new Date(
												rating?.versionInfo?.date + 'T18:00:00Z'
											).toDateString()}{' '}
											- {rating?.versionInfo?.location}
											<br />
											{rating?.versionInfo?.artist}
											<br />
											{rating?.rating.comment ? rating?.rating.comment : null}
											{rating?.rating.comment ? <br /> : null}
											{rating?.rating?.rating
												? `Rating: ${rating?.rating?.rating} - `
												: null}
											Average: {rating?.versionInfo?.avg_rating} - Ratings:{' '}
											{rating?.versionInfo?.num_ratings}
										</Typography>
										{rating?.versionInfo?.listen_link ? (
											<Stack
												direction='row'
												alignItems='center'
												justifyContent='center'
												spacing={2}
											>
												<ListenLink
													link={rating?.versionInfo?.listen_link}
													jam={rating?.versionInfo}
												/>
												<RateVersion
													song={rating.versionInfo.song_name}
													date={rating.versionInfo.date}
													location={rating.versionInfo.location}
													user={user}
													profile={profile.current}
													jam={rating.versionInfo}
													initialButtonText={'Rate, Comment'}
													songs={allSongs}
												/>
											</Stack>
										) : (
											<Stack
												direction='row'
												alignItems='center'
												justifyContent='center'
												spacing={2}
											>
												<AddListenLink
													song={rating.versionInfo.song_name}
													date={rating.versionInfo.date}
													location={rating.versionInfo.location}
													user={user}
													profile={profile.current}
													jam={rating.versionInfo}
												/>
												<RateVersion
													song={rating.versionInfo.song_name}
													date={rating.versionInfo.date}
													location={rating.versionInfo.location}
													user={user}
													profile={profile.current}
													jam={rating.versionInfo}
													initialButtonText={'Rate, Comment'}
													songs={allSongs}
												/>
											</Stack>
										)}
									</Box>
								);
							})}
						</Box>
					)}
					{versions && versions.length > 0 && (
						<>
							<Typography fontSize={24}>Jams ({versions.length})</Typography>
							<Button onClick={() => handleShowHide('versions')}>
								{showVersions ? 'Hide' : 'Show'}
							</Button>
						</>
					)}
					{showVersions &&
						versions &&
						versions.length > 0 &&
						versions.map((version, index) => {
							return (
								<Box
									key={index}
									textAlign={'center'}
									mb={'2em'}
									bgcolor={'white'}
									borderRadius={'15px'}
									width={'fit-content'}
									p={'1em'}
									boxShadow={1}
									mx={'auto'}
								>
									<Typography fontSize={22}>{version?.song_name}</Typography>
									<Typography>
										{new Date(version?.date + 'T18:00:00Z').toDateString()} -{' '}
										{version?.location}
										<br />
										{version?.artist}
										<br />
										Average: {version?.avg_rating} - Ratings:{' '}
										{version?.num_ratings}
									</Typography>
									{version?.listen_link ? (
										<Stack
											direction='row'
											alignItems='center'
											justifyContent='center'
											spacing={2}
										>
											<ListenLink
												link={version?.listen_link}
												jam={version}
											/>
											<RateVersion
												song={version.song_name}
												date={version.date}
												location={version.location}
												user={user}
												profile={profile.current}
												jam={version}
												initialButtonText={'Rate, Comment'}
												songs={allSongs}
											/>
										</Stack>
									) : (
										<Stack
											direction='row'
											alignItems='center'
											justifyContent='center'
											spacing={2}
										>
											<AddListenLink
												song={version.song_name}
												date={version.date}
												location={version.location}
												user={user}
												profile={profile.current}
												jam={version}
											/>
											<RateVersion
												song={version.song_name}
												date={version.date}
												location={version.location}
												user={user}
												profile={profile.current}
												jam={version}
												initialButtonText={'Rate, Comment'}
												songs={allSongs}
											/>
										</Stack>
									)}
								</Box>
							);
						})}
					{songs && songs.length > 0 && (
						<>
							<Typography fontSize={24}>{`Songs (${songs.length})`}</Typography>
							<Button onClick={() => handleShowHide('songs')}>
								{showSongs ? 'Hide' : 'Show'}
							</Button>
						</>
					)}
					{showSongs &&
						songs.map((song, index) => {
							return <Typography key={index}>{song.song}</Typography>;
						})}
					{ideas && ideas.length > 0 && (
						<>
							<Typography fontSize={24}>{`Ideas (${ideas.length})`}</Typography>
							<Button onClick={() => handleShowHide('ideas')}>
								{showIdeas ? 'Hide' : 'Show'}
							</Button>
						</>
					)}
					{showIdeas &&
						ideas.map((idea, index) => {
							return (
								<Typography key={index}>
									{idea.idea_body} - Done: {idea.done ? 'yes' : 'not yet'}
								</Typography>
							);
						})}
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export const getStaticProps = async (ctx) => {
	// const supabase = createServerSupabaseClient(ctx);
	// const {
	// 	data: { session },
	// } = await supabase.auth.getSession();
	const username = ctx.params.username;
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
	const allSongs = supabase.from('songs').select('*');
	let fetchedSongs,
		fetchedVersions,
		fetchedRatings,
		fetchedIdeas,
		fetchedAllSongs;
	await Promise.all([songs, versions, ratings, ideas, allSongs]).then(
		([songsObj, versionsObj, ratingsObj, ideasObj, allSongsObj]) => {
			fetchedSongs = songsObj.data;
			fetchedVersions = versionsObj.data;
			fetchedRatings = ratingsObj.data;
			fetchedIdeas = ideasObj.data;
			fetchedAllSongs = allSongsObj.data;
		}
	);
	if (!fetchedRatings) {
		return {
			props: {
				songs: fetchedSongs,
				versions: fetchedVersions,
				ratings: fetchedRatings,
				ideas: fetchedIdeas,
				allSongs: fetchedAllSongs,
			},
		};
	}
	const versionsUserHasRated = fetchedRatings.map(
		(rating) => rating.version_id
	);
	const ratedVersions = await supabase
		.from('versions')
		.select('*')
		.in('id', versionsUserHasRated);
	const versionsRated = ratedVersions.data;
	const ratingsWithVersions = fetchedRatings.map((rating) => {
		const index = versionsRated.findIndex(
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
	return {
		props: {
			ratings: ratingsWithVersions,
			songs: fetchedSongs,
			versions: fetchedVersions,
			ideas: fetchedIdeas,
			allSongs: fetchedAllSongs,
		},
	};
};

export const getStaticPaths = async (ctx) => {
  // const supabase = createServerSupabaseClient(ctx)
  const users = await supabase.from('profiles').select('name');
  const paths = users.data.map((user) => ({
    params: { username: user.name },
  }));
  return {
    paths,
    fallback: false,
  };
}