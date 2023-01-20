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
import TableTitle from '../components/TableTitle';
import Image from 'next/image';

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

export default function Home({
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
	const [loadingJams, setLoadingJams] = useState(false);

	useEffect(() => {
		if (isMounted.current) {
			//check song exists or no song before reloading
			if (!song || (song && songExists)) {
				let index;
				if (song && songExists) {
					index = songs.findIndex((item) => {
						return item.song === song;
					});
				}
				if ((song && index > -1) || !song) {
					setLoadingJams(true);
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
					if (limit !== 100) query.limit = limit;
					if (showRatings) query.showRatings = true;
					const params = new URLSearchParams(query).toString();
					let reducedParams = params
						.replace('&showMoreFilters=true', '')
						.replace('showMoreFilters=true', '');
					if (
						(fullUrl === '/' || fullUrl === '/jams') &&
						reducedParams === ''
					) {
            setLoadingJams(false)
						return;
					}
					if ('/?' + reducedParams !== fullUrl) {
						prevParamsRef.current = reducedParams;
						if (params.length > 0) {
              setLoadingJams(false)
							router.push(
								{
									pathname: '/jams/query/[query]',
									query: { query: reducedParams },
								},
								null,
								{
									scroll: fullUrl === '/' || fullUrl === '/jams',
								}
							);
						} else {
              setLoadingJams(false)
							router.push('/jams');
						}
					}
				}
			}
			setLoadingJams(false);
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
		if (urlToShow) {
			window.history.replaceState(null, null, urlToShow);
			// router.replace('/xyz','/xyz', { shallow: true })
			// history.replaceState(null, null, urlToShow)
		}
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

	const tagsList = {
		acoustic: 'Acoustic',
		ambient: 'Ambient/Space',
		bliss: 'Bliss',
		bluesy: 'Bluesy',
		chaotic: 'Chaotic',
		crunchy: 'Crunchy',
		dark: 'Dark',
		dissonant: 'Dissonant',
		fast: 'Fast',
		funky: 'Funky',
		grimy: 'Grimy',
		groovy: 'Groovy',
		guest: 'Guest',
		happy: 'Happy',
		heavy: 'Heavy',
		historic: 'Historic',
		jazzy: 'Jazzy',
		long: 'Long',
		low_key: 'Low-key',
		mellow: 'Mellow',
		melodic: 'Melodic',
		multi_part: 'Multi-part',
		official_release: 'Official Release',
		peaks: 'Peaks',
		reggae: 'Reggae',
		rocking: 'Rocking',
		segue: 'Segue',
		shred: 'Shred',
		silly: 'Silly',
		sloppy: 'Sloppy',
		slow: 'Slow',
		sludgy: 'Sludgy',
		soaring: 'Soaring',
		soulful: 'Soulful',
		stop_start: 'Stop-start',
		synthy: 'Synthy',
		tease: 'Teases',
		tension_release: 'Tension and Release',
		that_years_style: "That Year's Style",
		trance: 'Trance',
		trippy: 'Trippy',
		type2: 'Type II',
		unusual: 'Unusual',
		upbeat: 'Upbeat',
	};

	let title = '';
	if (initialTags) {
		for (var i = 0; i < initialTags.length; i++) {
			title += tagsList[initialTags[i]];
			if (i < initialTags.length - 1) title += ', ';
		}
	}
	if (initialSong) {
		title += ' ' + initialSong + ' ';
	}
	title += ' Jams';
	if (initialArtist) {
		title += ' by ' + initialArtist;
	}
	if (initialBeforeDate && initialAfterDate) {
		title += ' from ' + initialAfterDate + ' to ' + initialBeforeDate;
	}
	if (initialBeforeDate && !initialAfterDate) {
		title += ' from ' + initialBeforeDate + ' and before ';
	}
	if (initialAfterDate && !initialBeforeDate) {
		title += ' from ' + initialAfterDate + ' and after ';
	}
	let subtitle = '';
	let newLimit = initialLimit !== 'null' ? initialLimit : 'All';
	if (initialOrderBy) {
		switch (initialOrderBy) {
			case 'id':
				subtitle += newLimit + ' recently added';
				break;
			case 'artist':
				subtitle += newLimit !== 'All' ? 'First ' + newLimit : 'All';
				subtitle += 'by artist name';
				order === 'asc' ? (subtitle += ' (A-Z)') : (subtitle += ' (Z-A)');
				break;
			case 'song_name':
				subtitle += newLimit !== 'All' ? 'First ' + newLimit : 'All';
				subtitle += 'by song name';
				order === 'asc' ? (subtitle += ' (A-Z)') : (subtitle += ' (Z-A)');
				break;
			case 'date':
				if (order === 'asc') {
					subtitle += newLimit + ' oldest';
				} else {
					subtitle += newLimit + ' newest';
				}
				break;
			case 'avg_rating':
				subtitle += newLimit + ' highest-rated';
				break;
			case 'num_ratings':
				subtitle += newLimit + ' most-rated';
				break;
		}
	}
	title.trim();
	subtitle.trim();
	const fullTitle = title + ': ' + subtitle + ' on NiceJammin - Join Today!';

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<link
					rel='shortcut icon'
					href='/favicon.ico'
				/>
				<title>{fullTitle}</title>
				<meta
					name='keywords'
					content='best jam jams jambands phish grateful dead sci goose umphreys um tab jrad jgb moe.'
				></meta>
				<meta
					name='description'
					content="Discover, Add and Rate Great Jams By Phish, Grateful Dead, Goose, String Cheese Incident, Umphrey's McGee, Widespread Panic, Billy Strings, JRAD, and many more!"
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
					session={session}
					router={router}
					user={user}
					setUser={setUser}
					profile={profile}
				/>
				{(fullUrl === '/' || fullUrl === '/jams') && (
					<>
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
								Making it easier to find jams 🎸
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
					</>
				)}
				<TableTitle
					artist={artist}
					song={song}
					beforeDate={beforeDate}
					afterDate={afterDate}
					tags={tagsSelected}
					order={order}
					orderBy={orderBy}
					limit={limit}
				/>
				{loadingJams && (
					<Box
          sx={{display: 'flex'}}>
						<Image
							src='/spinner.gif'
							alt='loading'
							height={30}
							width={30}
						/>
						<Typography>Loading jams...</Typography>
					</Box>
				)}
				<Suspense
					fallback={
						<>
							<Image
								src='/spinner.gif'
								alt='loading'
								height={30}
								width={30}
							/>
							<Typography>Loading jams...</Typography>
						</>
					}
				>
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
					{fullUrl !== '/' && (
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
							lowerFilterBar={true}
						/>
					)}
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
