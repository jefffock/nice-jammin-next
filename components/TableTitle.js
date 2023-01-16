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

	let preTitle = '';
	let title = '';
	let subtitle = '';
	let newLimit = limit !== 'null' ? limit : 'All';
	if (tags) {
		for (var i = 0; i < tags.length; i++) {
			title += tagsList[tags[i]]
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
		subtitle += ' from ' + afterDate + ' to ' + beforeDate;
	}
	if (beforeDate && !afterDate) {
		subtitle += ' from ' + beforeDate + ' and before';
	}
	if (afterDate && !beforeDate) {
		subtitle += ' from ' + afterDate + ' and after';
	}
	if (orderBy) {
		switch (orderBy) {
			case 'id':
				preTitle += newLimit + ' recently added';
				break;
			case 'artist':
				preTitle += newLimit !== 'All' ? 'First ' + newLimit : 'All';
        beforeDate || afterDate ? (subtitle += ', sorted ') : '';
				subtitle += 'by artist name';
				order === 'asc' ? (subtitle += ' (A-Z)') : (subtitle += ' (Z-A)');
				break;
			case 'song_name':
				preTitle += newLimit !== 'All' ? 'First ' + newLimit : 'All';
        beforeDate || afterDate ? (subtitle += ', sorted ') : '';
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
				preTitle += newLimit + ' highest-rated';
				break;
			case 'num_ratings':
				preTitle += newLimit + ' most-rated';
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
