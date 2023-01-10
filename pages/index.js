import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themes';
import { useState, useEffect, useRef, Suspense } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Box from '@mui/material/Box';
import FilterBar from '../components/FilterBar';
import FilterList from '../components/FilterList';
import Typography from '@mui/material/Typography';
import TopBar from '../components/AppBar';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const DynamicContributorsTable = dynamic(
	() => import('../components/TopContributors'),
	{
		suspense: true,
	}
);
const DynamicJamsTable = dynamic(
	() => import('../components/JamsTableCollapsible'),
	{
		suspense: true,
	}
);

const DynamicAddVersion = dynamic(() => import('../components/AddVersion'), {
	suspense: true,
});
const DynamicGratitude = dynamic(() => import('../components/Gratitude'), {
	suspense: true,
});
const DynamicIdeasTable = dynamic(() => import('../components/IdeasTable'), {
	suspense: true,
});
const DynamicFooter = dynamic(() => import('../components/Footer'), {
	suspense: true,
});

export default function App({
	jams,
	ideas,
	initialSession,
	initialUser,
	leaders,
	initialSongs,
}) {
	const [currentJams, setCurrentJams] = useState(jams);
	const [songs, setSongs] = useState(initialSongs);
	const [user, setUser] = useState(initialUser);
	const [session, setSession] = useState(initialSession);
	const [profile, setProfile] = useState(null);
	const [artists, setArtists] = useState(null);
	const [artist, setArtist] = useState(null);
	const [song, setSong] = useState(null);
	const [songObj, setSongObj] = useState(null);
	const [songExists, setSongExists] = useState(true);
	const [filteredJams, setFilteredJams] = useState(jams);
	const [sortedJams, setSortedJams] = useState(jams);
	const [order, setOrder] = useState('desc');
	const [orderBy, setOrderBy] = useState('id');
	const [beforeDate, setBeforeDate] = useState('');
	const [afterDate, setAfterDate] = useState('');
	const [tagsSelected, setTagsSelected] = useState([]);
	const router = useRouter();
	const [showRatings, setShowRatings] = useState(false);
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			if ((!song || (song && songExists)) && songs) {
				//double check song exists - before, when you deleted a char from an existing song, songExists updated after the GET request for versions had been sent
				let index = songs.findIndex((item) => {
					return item.song === song;
				});
				if ((song && index > -1) || !song) {
					const data = JSON.stringify({
						artist,
						song,
						afterDate: afterDate ? afterDate.toString() : null,
						beforeDate: beforeDate ? beforeDate.toString() : null,
						tags: tagsSelected,
						orderBy,
						order,
						fetchFullJams: true,
					});
					try {
						fetch('/api/versions', {
							method: 'POST',
							body: data,
						})
							.then((data) => data.json())
							.then((versions) => {
								setCurrentJams(versions);
							});
					} catch (error) {
						console.error(error);
					}
				}
			}
		}
	}, [
		artist,
		tagsSelected,
		beforeDate,
		afterDate,
		song,
		songExists,
		order,
		orderBy,
	]);

	useEffect(() => {
		if (songs) {
			let index = songs.findIndex((item) => {
				return item.song === song;
			});
			index === -1 ? setSongExists(false) : setSongExists(true);
			setSongObj(songs[index]);
		}
	}, [song, songs]);

	useEffect(() => {
		setTimeout(() => {
			isMounted.current = true;
		}, 1000);
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			console.log('user', user);
			setUser(user);
		};
		if (!user) {
			getUser();
		}
	}, []);

  useEffect(() => {
    console.log('user', user)
    console.log('profile', profile)
    if (user && !profile) {
      const getProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (error) {
          console.log('error', error);
        }
        console.log('data from profile', data)
        if (data && data.length > 0) {
          console.log('data', data)
          // setProfile(data);
        } else {
          router.push('/welcome');
        }
      };
      getProfile();
    }
  }, [user]);
  
	//to do: if jams length is less than 100 and order/orderby changes,
	//sort the jams client side instead of fetching them
	// useEffect(() => {
	//   function descendingComparator(a, b, orderBy) {
	//     if (b[orderBy] < a[orderBy]) {
	//       return -1;
	//     }
	//     if (b[orderBy] > a[orderBy]) {
	//       return 1;
	//     }
	//     return 0;
	//   }
	//   function getComparator(order, orderBy) {
	//     return order === 'desc'
	//     ? (a, b) => descendingComparator(a, b, orderBy)
	//     : (a, b) => -descendingComparator(a, b, orderBy);
	//   }
	//   function sortJams() {
	//     let newSortedJams = filteredJams.slice().sort(getComparator(order, orderBy))
	//     setSortedJams(newSortedJams)
	//   }
	//   sortJams()
	// }, [order, orderBy, filteredJams])

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
						setProfile(data[0] ?? null);
					}
				}
			}
			fetchProfile();
		}
	}, [user, profile]);

	function handleShowRatingsChange(e) {
		setShowRatings(e.target.checked);
	}

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<link
					rel='shortcut icon'
					href='/favicon.ico'
				/>
				{!artist && !song && (
					<>
						<title>Discover Great Jams by All Jam Bands</title>
						<meta
							name='keywords'
							content='best jam jams phish grateful dead sci goose umphreys tab jrad jgb'
						></meta>
						<meta
							name='description'
							content="Discover and Rate Great Jams By Phish, Grateful Dead, Goose, String Cheese Incident, Umphrey's McGee, Widespread Panic, Billy Strings, JRAD, and many more!"
						></meta>
						<meta
							name='viewport'
							content='initial-scale=1, width=device-width'
						/>
					</>
				)}
				{artist && !song && (
					<>
						<title>{artist} Great Jams - NiceJammin.com</title>
						<meta
							name='keywords'
							content='best jam jams {artist}'
						></meta>
					</>
				)}
				{song && !artist && (
					<>
						<title>{song} Jams - NiceJammin.com</title>
					</>
				)}
				{artist && song && (
					<>
						<title>
							{artist} {song} Jams - NiceJammin.com
						</title>
					</>
				)}
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
					session={session}
					router={router}
					user={user}
          setUser={setUser}
          setSession={setSession}/>
				<Box
					my='3em'
					mx='auto'
					px='0.5em'
					width='96vw'
					maxWidth='fit-content'
				>
					<Typography
						textAlign='center'
						fontSize='32px'
						my='1em'
						fontWeight={300}
					>
						Making it easier to find 🔥 jams
					</Typography>
				</Box>
				<FilterBar
					setArtist={setArtist}
					artist={artist}
					tagsSelected={tagsSelected}
					setTagsSelected={setTagsSelected}
					beforeDate={beforeDate}
					setBeforeDate={setBeforeDate}
					afterDate={afterDate}
					setAfterDate={setAfterDate}
					songs={songs}
					song={song}
					setSong={setSong}
					orderBy={orderBy}
					setOrderBy={setOrderBy}
					setOrder={setOrder}
					showRatings={showRatings}
					handleShowRatingsChange={handleShowRatingsChange}
					jams={currentJams && currentJams.length > 0}
				/>
				<FilterList
					artist={artist}
					setArtist={setArtist}
					tagsSelected={tagsSelected}
					setTagsSelected={setTagsSelected}
					beforeDate={beforeDate}
					afterDate={afterDate}
					setBeforeDate={setBeforeDate}
					setAfterDate={setAfterDate}
					song={song}
					setSong={setSong}
					jams={currentJams.length > 0}
				/>
				<Suspense fallback={<p>Loading....</p>}>
					<DynamicJamsTable
						jams={currentJams}
						order={order}
						orderBy={orderBy}
						setOrder={setOrder}
						setOrderBy={setOrderBy}
						user={user}
						profile={profile}
						setCurrentJams={setCurrentJams}
						songs={songs}
						setSongs={setSongs}
						showRatings={showRatings}
					/>
					<br></br>
					<DynamicAddVersion
						songs={songs}
						setSongs={setSongs}
						jams={currentJams}
						user={user}
						profile={profile}
						setCurrentJams={setCurrentJams}
						artist={artist}
						setArtist={setArtist}
						song={song}
						setSong={setSong}
						songExists={songExists}
						songObj={songObj}
					/>
					<DynamicGratitude />
					<DynamicIdeasTable
						user={user}
						profile={profile}
						ideas={ideas}
					/>
					<DynamicContributorsTable leaders={leaders} />
					<DynamicFooter
						user={user}
						profile={profile}
					/>
				</Suspense>
			</Box>
		</ThemeProvider>
	);
}

export const getServerSideProps = async (ctx) => {
	const supabase = createServerSupabaseClient(ctx);
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const ideas = await supabase
		.from('ideas')
		.select('idea_body, done, votes, id')
		.order('id', { ascending: false });
	const jams = await supabase
		.from('versions')
		.select('*')
		.limit(20)
		.order('id', { ascending: false });
	const leaders = await supabase
		.from('profiles')
		.select('name, points')
		.not('name', 'eq', 'Henrietta')
		.limit(20)
		.order('points', { ascending: false });
	const songs = await supabase
		.from('songs')
		.select('*')
		// .gt('avg_rating', 0)
		// .limit(100)
		.order('song', { ascending: true });
	return {
		props: {
			initialSession: session ?? null,
			initialUser: session?.user ?? null,
			jams: jams.data,
			ideas: ideas.data,
			leaders: leaders.data,
			initialSongs: songs.data,
		},
	};
};
