import Home from '../components/Home';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themes';
import { supabase } from '../utils/supabaseClient';


// const DynamicContributorsTable = dynamic(
// 	() => import('../components/TopContributors'),
// 	{
// 		suspense: true,
// 	}
// );
// const DynamicJamsTable = dynamic(
// 	() => import('../components/JamsTableCollapsible'),
// 	{
// 		suspense: true,
// 	}
// );

// const DynamicAddVersion = dynamic(() => import('../components/AddVersion'), {
// 	suspense: true,
// });
// const DynamicGratitude = dynamic(() => import('../components/Gratitude'), {
// 	suspense: true,
// });
// const DynamicIdeasTable = dynamic(() => import('../components/IdeasTable'), {
// 	suspense: true,
// });
// const DynamicFooter = dynamic(() => import('../components/Footer'), {
// 	suspense: true,
// });

export default function testHome({
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
		<ThemeProvider theme={theme}>
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
		</ThemeProvider>
	);
}

export const getServerSideProps = async (ctx) => {
	// const supabase = createServerSupabaseClient(ctx);
	// const {
	// 	data: { session },
	// } = await supabase.auth.getSession();
	const fullUrl = ctx.resolvedUrl;
	const query = ctx.query;
	let showMore;
	let urlToShow = '/';
	if (query?.showMoreFilters) {
		console.log('query.showMore', query);
		showMore = JSON.parse(JSON.stringify(query.showMoreFilters));
		delete query.showMoreFilters;
	}
	console.log('showMore', showMore);
	const url = ctx.resolvedUrl
		.replaceAll('&showMoreFilters=true', '')
		.replaceAll('?showMoreFilters=true', '');
	console.log('url', url);
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
