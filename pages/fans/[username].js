import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

export default function Contributor() {
	const router = useRouter();
	const { username } = router.query;
	const [ratings, setRatings] = useState(null);
	const [songs, setSongs] = useState(null);
	const [versions, setVersions] = useState(null);
	const [ideas, setIdeas] = useState(null);
	const [fetchedData, setFetchedData] = useState(false);
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null);
	const [showRatings, setShowRatings] = useState(false);
	const [showVersions, setShowVersions] = useState(false);
	const [showIdeas, setShowIdeas] = useState(false);
	const [showSongs, setShowSongs] = useState(false);
	const [allSongs, setAllSongs] = useState(null);

	useEffect(() => {
		setSession(supabase.auth.session());
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			if (session !== null) {
				setUser(session.user);
			}
		});
	}, []);

	useEffect(() => {
		setUser(supabase.auth.user());
	}, [session]);

	useEffect(() => {
		if (user && !profile) {
			async function fetchProfile() {
				if (user) {
					let id = user.id;
					let { data, error } = await supabase
						.from('profiles')
						.select('*')
						.eq('id', id)
						.limit(1);
					if (error) {
						console.error('error getting profile', error);
					}
					if (data) {
						setProfile(data[0]);
					}
				}
			}
			fetchProfile();
		}
	}, [user, profile]);

	useEffect(() => {
		if (!fetchedData && username) {
			const data = JSON.stringify({ username });
			console.log('data', data);
			try {
				fetch('/api/contributions', {
					method: 'POST',
					body: data,
				})
					.then((contributions) => contributions.json())
					.then((contributions) => {
						console.log('contributions', contributions);
						setRatings(contributions.ratings);
						setSongs(contributions.songs);
						setVersions(contributions.versions);
						setIdeas(contributions.ideas);
						setAllSongs(contributions.allSongs);
						setFetchedData(true);
					});
			} catch (error) {
				console.error(error);
			}
		}
	}, [username]);

	useEffect(() => {
		console.log('ratings', ratings);
	}, [ratings]);

	useEffect(() => {
		console.log('songs', songs);
	}, [songs]);

	useEffect(() => {
		console.log('ideas', ideas);
	}, [ideas]);

	useEffect(() => {
		console.log('versions', versions);
	}, [versions]);

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
					showButton={true}
					user={user}
					session={session}
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
								{username}'s Contributions
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
													profile={profile}
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
													profile={profile}
													jam={rating.versionInfo}
												/>
												<RateVersion
													song={rating.versionInfo.song_name}
													date={rating.versionInfo.date}
													location={rating.versionInfo.location}
													user={user}
													profile={profile}
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
												profile={profile}
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
												profile={profile}
												jam={version}
											/>
											<RateVersion
												song={version.song_name}
												date={version.date}
												location={version.location}
												user={user}
												profile={profile}
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
