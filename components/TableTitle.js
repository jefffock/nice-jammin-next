import Typography from '@mui/material/Typography';

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
	let title = '';
  let subtitle = '';
	if (tags) {
		console.log('tags', tags);
    for (var i = 0; i < tags.length; i++) {
      title += tags[i][0].toUpperCase() + tags[i].substring(1)
      if (i < tags.length - 1) title += ', '
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
    title += ' from ' + afterDate + ' to ' + beforeDate
  }
	if (beforeDate && !afterDate) {
		title += ' from ' + beforeDate + ' and before '
	}
	if (afterDate && !beforeDate) {
    title += ' from ' + afterDate + ' and after '
	}
  if (orderBy) {
    switch(orderBy) {
      case 'id':
        subtitle += limit + ' most recently added'
        break;
      case 'artist':
        subtitle += limit + ' by artist name'
        order === 'asc' ? subtitle += ' (A-Z)' : subtitle += ' (Z-A)'
        break;
      case 'song_name':
        subtitle += ' by song name'
        order === 'asc' ? subtitle += ' (A-Z)' : subtitle += ' (Z-A)'
        break;
      case 'date':
        if (order === 'asc') {
          subtitle += limit + ' oldest'
        } else {
          subtitle += limit + ' newest'
        }
        break;
      case 'avg_rating':
        subtitle += limit + ' highest rated'
        break;
      case 'num_ratings':
        subtitle +=  limit + ' most rated'
        break;
      }
  }
	return (
		<div>
			<Typography
				variant='h6'
        fontSize={24}
				id='tableTitle'
				component='div'
        textAlign={'center'}
			>
				{title}
			</Typography>
      <Typography
        variant='subtitle1'
        fontSize={16}
        id='tableSubtitle'
        component='div'
        textAlign={'center'}
        >
        {subtitle}
        </Typography>
		</div>
	);
}
