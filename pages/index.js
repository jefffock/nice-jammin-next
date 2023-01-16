import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themes';
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

export const getServerSideProps = async (ctx) => {
	const fullUrl = ctx.resolvedUrl;
	const query = ctx.query;
	let showMore;
	let urlToShow = '/';
	if (query?.showMoreFilters) {
		showMore = JSON.parse(JSON.stringify(query.showMoreFilters));
		delete query.showMoreFilters;
	}
	const url = ctx.resolvedUrl
		.replaceAll('&showMoreFilters=true', '')
		.replaceAll('?showMoreFilters=true', '');
	if (url !== '/') {
		const list = await supabase
			.from('lists')
			.select('*')
			.eq('url', url)
			.single();
		if (list.data) {
			urlToShow = '/lists/' + list.data.id;
		} else {
			let newList = await supabase
				.from('lists')
				.insert([{ url: url, query: JSON.stringify(query) }])
				.select();
			urlToShow = '/lists/' + newList.data[0].id;
		}
	}
	const params = ctx.query;
	const artist = params?.artist;
	const song = params?.song;
	const sounds = params?.sounds;
	let tags = sounds?.split(',') ?? [];
	const beforeDate = params?.beforeDate;
	const afterDate = params?.afterDate;
	const orderBy = params?.orderBy ?? 'id';
	const asc = params?.order === 'asc' ? true : false;
	const limit = params?.limit ?? 50;
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
	const list = supabase.from('lists').select('*').eq('url', url).single();
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
			initialShowMoreFilters: showMore ?? false,
			initialShowRatings: showRatings,
			fullUrl: fullUrl,
			urlToShow: urlToShow,
		},
	};
};
