import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/themes';
import TopBar from '../../components/AppBar';
import Box from '@mui/material/Box';
import Head from 'next/head';
import Button from '@mui/material/Button';
import { supabase } from '../../utils/supabaseClient';
import JamCard from '../../components/JamCard';
import Link from 'next/link';
import AddVersion from '../../components/AddVersion';
import { useUser } from '@supabase/auth-helpers-react'

export default function Jam() {
	const router = useRouter();
	const { versionId } = router.query;
	const [ratings, setRatings] = useState(null);
	const [session, setSession] = useState(null);
	const [profile, setProfile] = useState(null);
	const [version, setVersion] = useState(null);
	const [songs, setSongs] = useState(null);
	const [setlist, setSetlist] = useState(null);
	const [loadingSetlist, setLoadingSetlist] = useState(false);
  const user = useUser()

	// useEffect(() => {
	// 	setSession(supabase.auth.session());
	// 	supabase.auth.onAuthStateChange((_event, session) => {
	// 		setSession(session);
	// 		if (session !== null) {
	// 			setUser(session.user);
	// 		}
	// 	});
	// }, []);

	// useEffect(() => {
	// 	setUser(supabase.auth.user());
	// }, [session]);

  console.log('user', user)

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
		if (versionId) {
			const data = JSON.stringify({ versionId });
			const fetchRatings = fetch('/api/ratings', {
				method: 'POST',
				body: data,
			});
			const fetchVersionInfo = fetch('/api/version', {
				method: 'POST',
				body: data,
			});
			const fetchSongs = fetch('/api/songs');
			try {
				Promise.all([fetchRatings, fetchVersionInfo, fetchSongs])
					.then((responses) =>
						Promise.all(responses.map((_res) => _res.json()))
					)
					.then((responses) => {
						if (responses[0] && responses[1]) {
							setRatings(responses[0]);
							setVersion(responses[1][0]);
							setSongs(responses[2]);
						}
					});
			} catch (error) {
				console.error(error);
			}
		}
	}, [versionId]);

	useEffect(() => {
		if (version && !setlist) {
			const data = JSON.stringify({
				date: version.date,
				artist: version.artist,
			});
			const fetchNJVersionsByDate = fetch('/api/versions', {
				method: 'POST',
				body: data,
			});
			let fetchSetlist;
			switch (version.artist) {
				case 'Phish':
				case 'Trey Anastasio, TAB':
					fetchSetlist = fetch('/api/phish/setlists', {
						method: 'POST',
						body: data,
					});
					break;
				case 'Eggy':
				case 'Goose':
				case "Umphrey's McGee":
				case 'Neighbor':
					fetchSetlist = fetch('/api/songfish/setlists', {
						method: 'POST',
						body: data,
					});
					break;
				case 'Squeaky Feet':
					break;
				default:
					fetchSetlist = fetch('/api/setlistfm/setlists', {
						method: 'POST',
						body: data,
					});
			}
			if (fetchSetlist) {
				try {
					Promise.all([fetchSetlist, fetchNJVersionsByDate])
						.then((responses) =>
							Promise.all(responses.map((_res) => _res.json()))
						)
						.then((responses) => {
							const setlist = responses[0].titles;
							const njVersions = responses[1];
							const location = responses[0].location;
							if (!setlist || setlist.length === 0) {
								setSetlist(null);
								setLoadingSetlist(false);
							} else {
								const comboSetlist = setlist.map((song) => {
									const jam = njVersions.find(
										(version) => version.song_name === song
									);
									if (!jam) {
										return {
											song,
											alreadyAdded: false,
										};
									}
									if (jam) {
										return { song, alreadyAdded: true, versionId: jam.id };
									}
								});
								setSetlist(comboSetlist);
								setLoadingSetlist(false);
							}
						});
				} catch (error) {
					setLoadingSetlist(false);
					console.error('Error getting setlist', error);
				}
			}
		}
	}, [version]);

	return (
		<ThemeProvider theme={theme}>
			<Head>
      <title>NiceJammin</title>
				<link
					rel='shortcut icon'
					href='/favicon.ico'
				/>
				<meta
					name='keywords'
					content='jam jamband band jams best phish grateful dead sci goose umphreys um tab jrad jgb'
				></meta>
				<meta
					name='description'
					content="Discover and rate great jams by Phish, Grateful Dead, Goose, String Cheese Incident, Umphrey's McGee, Widespread Panic, Billy Strings, JRAD, and many more!"
				></meta>
				<meta
					name='viewport'
					content='initial-scale=1, width=device-width'
				/>
      </Head>
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
				{version && (
					<JamCard
						jam={version}
						songs={songs}
						user={user}
						profile={profile}
					/>
				)}
				{loadingSetlist && <Typography>Loading setlist...</Typography>}
				{setlist && (
					<Box
						bgcolor={'white'}
						maxWidth='fit-content'
						p='1em'
						mx='auto'
						borderRadius={5}
						my='1em'
					>
						<Typography
							textAlign={'center'}
							fontSize={20}
						>
							Setlist
						</Typography>
						{setlist.length > 0 &&
							setlist.map((song) => {
								if (song.versionId) {
									return (
										<Link
											my='0.3em'
											href={`/jams/${encodeURIComponent(song.versionId)}`}
										>
											{song.song}
										</Link>
									);
								} else {
									return <Typography my='0.3em'>{song.song}</Typography>;
								}
							})}
					</Box>
				)}
        {version &&
        <AddVersion date={version.date} artist={version.artist} songs={songs} profile={profile} user={user} />}
			</Box>
		</ThemeProvider>
	);
}
