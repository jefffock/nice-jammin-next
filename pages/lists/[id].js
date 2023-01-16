import { supabase } from '../../utils/supabaseClient';
import Home from '../../components/Home';
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

export const getServerSideProps = async (ctx) => {
	const id = ctx.query.id;
	const { data } = await supabase
		.from('lists')
		.select('*')
		.eq('id', id)
		.single();
	if (data) {
		const params = JSON.parse(data.query);
		const url = data.url;
		const artist = params?.artist;
		const song = params?.song;
		const sounds = params?.sounds;
		let tags = sounds?.split(',') ?? [];
		const beforeDate = params?.beforeDate;
		const afterDate = params?.afterDate;
		const orderBy = params?.orderBy ?? 'id';
		const asc = params?.order === 'asc' ? true : false;
		const limit = params?.limit ?? 100;
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
				initialShowMoreFilters: showMoreFilters,
				initialShowRatings: showRatings,
				fullUrl: url,
				urlToShow: null,
			},
		};
	}
};
