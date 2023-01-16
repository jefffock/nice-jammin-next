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
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import TableTitle from '../components/TableTitle';

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
	initialShowRatings,
	initialProfile,
  fullUrl,
	urlToShow,
}) {
	// const [currentJams, setCurrentJams] = useState(jams);
	const [songs, setSongs] = useState(initialSongs);
	// const user = useUser()
	const [user, setUser] = useState(initialUser);

	const [session, setSession] = useState(initialSession);
	const [profile, setProfile] = useState(initialProfile);
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
	const tagsSelectedString = tagsSelected.join(',');
	const router = useRouter();
	const [showRatings, setShowRatings] = useState(initialShowRatings);
	const isMounted = useRef(false);
	const newUrls = useRef(0);
	const showMoreFilters = useRef(initialShowMoreFilters);
	const [showListenable, setShowListenable] = useState(initialShowListenable);
	const [limit, setLimit] = useState(initialLimit);
	const prevParamsRef = useRef('/');

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
					if (showMoreFilters.current) query.showMoreFilters = true;
					if (showListenable) query.showListenable = showListenable;
					if (limit !== 20) query.limit = limit;
					if (showRatings) query.showRatings = true;
					const params = new URLSearchParams(query).toString();
					let reducedParams = params
						.replace('&showMoreFilters=true', '')
						.replace('showMoreFilters=true', '');
					console.log('reducedParams', reducedParams, typeof reducedParams);
          console.log('fullUrl', fullUrl);
          if (fullUrl === '/' && reducedParams === '') {
            return
          }
					if ('/?' + reducedParams !== fullUrl) {
            prevParamsRef.current = reducedParams;
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
		}
	}, [
		artist,
		tagsSelectedString,
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
		setTimeout(() => {
			isMounted.current = true;
		}, 1000);
		// if (urlToShow) {
		console.log('urlToShow', urlToShow);
		window.history.replaceState(null, null, urlToShow);
		// router.replace('/xyz','/xyz', { shallow: true })
		//   // history.replaceState(null, null, urlToShow)
		// }
	}, []);

	useEffect(() => {
		if (user && !profile) {
			const getProfile = async () => {
				const { data } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', user.id)
					.single();
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
					let { data } = await supabase
						.from('profiles')
						.select('*')
						.eq('id', id)
						.limit(1);
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
					profile={profile}
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
        <TableTitle artist={artist} song={song} beforeDate={beforeDate} afterDate={afterDate} tags={tagsSelected} limit={limit} order={order} orderBy={orderBy}/>
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
						initialArtist={artist}
						initialSong={song}
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
	// const supabase = createServerSupabaseClient(ctx);
	// const {
	// 	data: { session },
	// } = await supabase.auth.getSession();
	const fullUrl = ctx.resolvedUrl
	const query = ctx.query;
	let showMore;
	let urlToShow = '/';
	if (query?.showMoreFilters) {
    console.log('query.showMore', query)
		showMore = JSON.parse(JSON.stringify(query.showMoreFilters));
		delete query.showMoreFilters;
	}
  console.log('showMore', showMore)
	const url = ctx.resolvedUrl.replaceAll('&showMoreFilters=true', '').replaceAll('?showMoreFilters=true', '');
  console.log('url', url)
	if (url !== '/') {
		const list = await supabase
			.from('lists')
			.select('*')
			.eq('url', url)
			.single();
		if (list.data) {
			console.log('list', list);
      urlToShow = '/lists/' + list.data.id;
			// return {
			// 	redirect: {
			// 		destination: `lists/${list.data.id}`,
			// 		permanent: true,
			// 	},
			// };
		} else {
			console.log(
				'no list, inserting new, query',
				query,
				'ctx.resolvedUrl',
				url
			);
			let newList = await supabase
				.from('lists')
				.insert([{ url: url, query: JSON.stringify(query) }])
				.select();
			console.log('list after insert', newList);
			urlToShow = '/lists/' + newList.data[0].id;
		}
	}
	// return {
	//   redirect: {
	//     destination: `lists/${id}`,
	//     permanent: true,
	//   }
	// }
	const params = ctx.query;
	const artist = params?.artist;
	const song = params?.song;
	const sounds = params?.sounds;
	let tags = sounds?.split(',') ?? [];
	const beforeDate = params?.beforeDate;
	const afterDate = params?.afterDate;
  console.log('params', params)
	const orderBy = params?.orderBy ?? 'id';
	const asc = params?.order === 'asc' ? true : false;
	const limit = params?.limit ?? 20;
	const showMoreFilters = params?.showMoreFilters === 'true';
	const showListenable = params?.showListenable === 'true';
	const showRatings = params?.showRatings === 'true';
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
	const list = supabase.from('lists').select('*').eq('url', url).single();
	let fetchedJams, fetchedIdeas, fetchedLeaders, fetchedSongs;
	// fetchedList;
	await Promise.all([jams, ideas, leaders, songs]).then(
		([jams, ideas, leaders, songs]) => {
			fetchedJams = jams;
			fetchedIdeas = ideas;
			fetchedLeaders = leaders;
			fetchedSongs = songs;
			// fetchedList = list;
		}
	);
	// let id = fetchedList.data?.id
	// console.log('list', fetchedList)
	// if (!fetchedList.data) {
	//   const list = await supabase.from('lists').insert([
	//     { url: ctx.resolvedUrl, params: JSON.stringify(params) },
	//   ]).select();
	//   console.log('list after inset', list)
	//   id = list.data[0].id
	// }
	// let urlToShow = '/lists/' + id
	// if (id === 1) urlToShow = null
	return {
		props: {
			// initialSession: session ?? null,
			// initialUser: session?.user ?? null,
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
			initialShowMoreFilters: showMore ?? false,
			initialShowRatings: showRatings,
      fullUrl: fullUrl,
			urlToShow: urlToShow,
		},
	};
};
