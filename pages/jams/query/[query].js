import { supabase } from '../../../utils/supabaseClient';
import Home from '../../../components/Home';
import Head from 'next/head';

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
  console.log('ctx', ctx)
	const query = ctx.params.query;
  const params = Object.fromEntries(new URLSearchParams(query));
  console.log('params', params);
  console.log('query', query);
  console.log('stringParams', params);
	let urlToShow = '/jams/lists/';
	const list = await supabase
		.from('jams_lists')
		.select('*')
		.eq('query', query)
		.single();
	if (list.data) {
		urlToShow += list.data.id;
	} else {
		let newList = await supabase
			.from('jams_lists')
			.insert([{ query, params: JSON.stringify(params) }])
			.select();
		urlToShow += newList.data[0].id;
	}
	const artist = params?.artist;
	const song = params?.song;
	const sounds = params?.sounds;
	let tags = sounds?.split(',') ?? [];
	const beforeDate = params?.beforeDate;
	const afterDate = params?.afterDate;
	const orderBy = params?.orderBy ?? 'id';
	const asc = params?.order === 'asc' ? true : false;
	const limit = params?.limit ?? 100;
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
			initialArtist: artist || null,
			initialSong: song || null,
			initialTags: tags || [],
			initialBeforeDate: beforeDate || '',
			initialAfterDate: afterDate || '',
			initialOrderBy: orderBy,
			initialOrder: asc ? 'asc' : 'desc',
			initialLimit: limit,
			initialShowListenable: showListenable,
			initialShowMoreFilters: false,
			initialShowRatings: showRatings,
			fullUrl: query,
			urlToShow: urlToShow,
		},
		revalidate: 10,
	};
};

export const getStaticPaths = async () => {
	const lists = await supabase.from('jams_lists').select('query');
	const paths = lists?.data?.map((list) => ({
		params: { query: list.query },
	}));
	console.log('paths', paths);
	return {
		paths,
		fallback: 'blocking',
	};
};
