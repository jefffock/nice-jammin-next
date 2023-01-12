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
	initialArtist,
	initialSong,
	initialBeforeDate,
	initialAfterDate,
	initialTags,
	initialOrder,
	initialOrderBy,
	initialLimit,
	initialShowMoreFilters,
	initialShowListenable,
}) {
	// const [currentJams, setCurrentJams] = useState(jams);
	const [songs, setSongs] = useState(initialSongs);
	const [user, setUser] = useState(initialUser);
	const [session, setSession] = useState(initialSession);
	const [profile, setProfile] = useState(null);
	const [artists, setArtists] = useState(null);
	const [artist, setArtist] = useState(initialArtist);
	const [song, setSong] = useState(initialSong);
	const [songObj, setSongObj] = useState(null);
	const [songExists, setSongExists] = useState(true);
	// const [filteredJams, setFilteredJams] = useState(jams);
	// const [sortedJams, setSortedJams] = useState(jams);
	const [order, setOrder] = useState(initialOrder);
	const [orderBy, setOrderBy] = useState(initialOrderBy);
	const [beforeDate, setBeforeDate] = useState(initialBeforeDate);
	const [afterDate, setAfterDate] = useState(initialAfterDate);
	const [tagsSelected, setTagsSelected] = useState(initialTags);
	const router = useRouter();
	const [showRatings, setShowRatings] = useState(false);
	const isMounted = useRef(false);
	const [showMoreFilters, setShowMoreFilters] = useState(
		initialShowMoreFilters
	);
	const [showListenable, setShowListenable] = useState(initialShowListenable);
	const [limit, setLimit] = useState(initialLimit);

	useEffect(() => {
		if (isMounted.current) {
			//check song exists or no song before reloading
			if (!song || (song && songExists)) {
				let index = songs.findIndex((item) => {
					return item.song === song;
				});
				if ((song && index > -1) || !song) {
					let query = {};
					if (artist) query.artist = artist;
					if (song) query.song = song;
					if (tagsSelected.length > 0) query.sounds = tagsSelected;
					if (beforeDate) query.beforeDate = beforeDate;
					if (afterDate) query.afterDate = afterDate;
					if (order !== 'desc') query.order = order;
					if (orderBy !== 'id') query.orderBy = orderBy;
					if (showMoreFilters) query.showMoreFilters = showMoreFilters;
					if (showListenable) query.showListenable = showListenable;
					if (limit !== 20) query.limit = limit;
					const params = new URLSearchParams(query).toString();
					if (params.length > 0) {
						router.push(`/?${params}`, null, {
							scroll: false,
						});
					} else {
						router.push('/');
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
		showListenable,
		limit,
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
			setUser(user);
		};
		if (!user) {
			getUser();
		}
	}, []);

	useEffect(() => {
		if (user && !profile) {
			const getProfile = async () => {
				const { data, error } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', user.id)
					.single();
				if (error) {
					console.error(error);
				}
				if (data) {
					setProfile(data);
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
				{/* {artist && !song && (
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
				)} */}
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
					setSession={setSession}
				/>
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
					order={order}
					orderBy={orderBy}
					setOrderBy={setOrderBy}
					setOrder={setOrder}
					showRatings={showRatings}
					handleShowRatingsChange={handleShowRatingsChange}
					jams={jams && jams.length > 0}
					showMoreFilters={showMoreFilters}
					setShowMoreFilters={setShowMoreFilters}
					showListenable={showListenable}
					setShowListenable={setShowListenable}
					limit={limit}
					setLimit={setLimit}
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
					jams={jams && jams.length > 0}
				/>
				<Suspense fallback={<p>Loading....</p>}>
					<DynamicJamsTable
						jams={jams}
						order={order}
						orderBy={orderBy}
						setOrder={setOrder}
						setOrderBy={setOrderBy}
						user={user}
						profile={profile}
						// setCurrentJams={setCurrentJams}
						songs={songs}
						setSongs={setSongs}
						showRatings={showRatings}
					/>
					<br></br>
					<DynamicAddVersion
						songs={songs}
						setSongs={setSongs}
						jams={jams}
						user={user}
						profile={profile}
						// setCurrentJams={setCurrentJams}
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
	const params = ctx.query;
	console.log('params', params);
	const artist = params?.artist;
	const song = params?.song;
	const sounds = params?.sounds;
	let tags = sounds?.split(',') ?? [];
	const beforeDate = params?.beforeDate;
	const afterDate = params?.afterDate;
	const orderBy = params?.orderBy ?? 'id';
	const asc = params?.order === 'asc' ? true : false;
	const limit = params?.limit ?? 20;
	const showMoreFilters = params?.showMoreFilters === 'true';
	const showListenable = params?.showListenable === 'true';
	let jams = supabase.from('versions').select('*');
	if (artist) {
		jams = jams.eq('artist', artist);
	}
	if (song) {
		jams = jams.eq('song_name', song);
	}
	if (afterDate) {
		let after = afterDate + '-01-01';
		jams = jams.gte('date', after);
	}
	if (beforeDate) {
		let before = beforeDate + '-12-31';
		jams = jams.lte('date', before);
	}
	if (tags) {
		tags.forEach((tag) => {
			jams = jams.eq(tag, true);
		});
	}
	if (showListenable) {
		jams = jams.not('listen_link', 'is', null);
	}
	jams = jams.order(orderBy, { ascending: asc });
	if (orderBy === 'avg_rating') {
		jams = jams.order('num_ratings', { ascending: false });
	}
	if (orderBy === 'num_ratings') {
		jams = jams.order('avg_rating', { ascending: false });
	}
	jams = jams.limit(limit);
	const ideas = supabase
		.from('ideas')
		.select('idea_body, done, votes, id')
		.order('id', { ascending: false });
	// const jams = await supabase
	// 	.from('versions')
	// 	.select('*')
	// 	.limit(20)
	// 	.order('id', { ascending: false });
	const leaders = supabase
		.from('profiles')
		.select('name, points')
		.not('name', 'eq', 'Henrietta')
		.limit(20)
		.order('points', { ascending: false });
	const songs = supabase
		.from('songs')
		.select('*')
		// .gt('avg_rating', 0)
		// .limit(100)
		.order('song', { ascending: true });
	let fetchedJams, fetchedIdeas, fetchedLeaders, fetchedSongs;
	await Promise.all([jams, ideas, leaders, songs]).then(
		([jams, ideas, leaders, songs]) => {
			fetchedJams = jams;
			fetchedIdeas = ideas;
			fetchedLeaders = leaders;
			fetchedSongs = songs;
		}
	);
	return {
		props: {
			initialSession: session ?? null,
			initialUser: session?.user ?? null,
			jams: fetchedJams.data,
			ideas: fetchedIdeas.data,
			leaders: fetchedLeaders.data,
			initialSongs: fetchedSongs.data,
			initialArtist: artist || null,
			initialSong: song || null,
			initialTags: tags || [],
			initialBeforeDate: beforeDate || '',
			initialAfterDate: afterDate || '',
			initialOrderBy: orderBy,
			initialOrder: asc ? 'asc' : 'desc',
			initialLimit: limit,
			initialShowListenable: showListenable,
			initialShowMoreFilters: showMoreFilters,
		},
	};
};
