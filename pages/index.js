import { supabase } from '../utils/supabaseClient';
import Home from '../components/Home';

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
	return (
			<Home
				jams={jams}
				ideas={ideas}
				initialSession={initialSession}
				initialUser={initialUser}
				leaders={leaders}
				initialSongs={initialSongs}
				initialArtist={initialArtist}
				initialSong={initialSong}
				initialBeforeDate={initialBeforeDate}
				initialAfterDate={initialAfterDate}
				initialTags={initialTags}
				initialOrder={initialOrder}
				initialOrderBy={initialOrderBy}
				initialLimit={initialLimit}
				initialShowMoreFilters={initialShowMoreFilters}
				initialShowListenable={initialShowListenable}
				initialShowRatings={initialShowRatings}
				initialProfile={initialProfile}
				fullUrl={fullUrl}
				urlToShow={urlToShow}
			/>
	);
}

export const getStaticProps = async (ctx) => {
	const orderBy = 'id';
	const asc = false;
	const limit = 100;
	const showListenable = false;
	const showRatings = false;
	let jams = supabase.from('versions').select('*');
	jams = jams.order(orderBy, { ascending: asc });
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
			jams: fetchedJams.data,
			ideas: fetchedIdeas.data,
			leaders: fetchedLeaders.data,
			initialSongs: fetchedSongs.data,
			initialArtist: null,
			initialSong: null,
			initialTags: [],
			initialBeforeDate: '',
			initialAfterDate: '',
			initialOrderBy: orderBy,
			initialOrder: 'desc',
			initialLimit: limit,
			initialShowListenable: showListenable,
			initialShowMoreFilters: false,
			initialShowRatings: showRatings,
			fullUrl: '/',
			urlToShow: null,
		},
    revalidate: 10, 
	};
};
