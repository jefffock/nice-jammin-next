import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function TableTitle({
	artist,
	song,
	tags,
	beforeDate,
	afterDate,
	limit,
	order,
	orderBy,
}) {
	let preTitle = '';
	let title = '';
	let subtitle = '';
	console.log('limit in title', limit, typeof limit === 'string');
	let newLimit = limit !== 'null' ? limit : 'All';
	if (tags) {
		console.log('tags', tags);
		for (var i = 0; i < tags.length; i++) {
			title += tags[i][0].toUpperCase() + tags[i].substring(1);
			if (i < tags.length - 1) title += ', ';
		}
	}
	if (song) {
		title += ' ' + song + ' ';
	}
	title += ' Jams';
	if (artist) {
		title += ' by ' + artist;
	}
	if (beforeDate && afterDate) {
		title += ' from ' + afterDate + ' to ' + beforeDate;
	}
	if (beforeDate && !afterDate) {
		title += ' from ' + beforeDate + ' and before ';
	}
	if (afterDate && !beforeDate) {
		title += ' from ' + afterDate + ' and after ';
	}
	if (orderBy) {
		switch (orderBy) {
			case 'id':
				preTitle += newLimit + ' recently added';
				break;
			case 'artist':
				preTitle += newLimit !== 'All' ? 'First ' + newLimit : 'All';
				subtitle += 'by artist name';
				order === 'asc' ? (subtitle += ' (A-Z)') : (subtitle += ' (Z-A)');
				break;
			case 'song_name':
				preTitle += newLimit !== 'All' ? 'First ' + newLimit : 'All';
				subtitle += 'by song name';
				order === 'asc' ? (subtitle += ' (A-Z)') : (subtitle += ' (Z-A)');
				break;
			case 'date':
				if (order === 'asc') {
					preTitle += newLimit + ' oldest';
				} else {
					preTitle += newLimit + ' newest';
				}
				break;
			case 'avg_rating':
				preTitle += newLimit + ' highest rated';
				break;
			case 'num_ratings':
				preTitle += newLimit + ' most rated';
				break;
		}
	}
	return (
		<Stack spacing={0} mt={'1em'} pt={'1em'}>
			{preTitle && (
				<Typography
					variant='subtitle1'
					fontSize={16}
					id='tablePretitle'
					component='div'
					textAlign={'center'}
				>
					{preTitle}
				</Typography>
			)}
			<Typography
				variant='h6'
				fontSize={28}
				id='tableTitle'
				component='div'
				textAlign={'center'}
				mt={-1}
			>
				{title}
			</Typography>
			{subtitle && (
				<Typography
					mt={-1}
					variant='subtitle1'
					fontSize={16}
					id='tableSubtitle'
					component='div'
					textAlign={'center'}
				>
					{subtitle}
				</Typography>
			)}
		</Stack>
	);
}
