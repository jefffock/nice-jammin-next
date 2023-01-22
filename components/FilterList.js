import FilterChip from './FilterChip';
import Box from '@mui/material/Box';

export default function FilterList({
	artist,
	setArtist,
	tagsSelected,
	setTagsSelected,
	beforeDate,
	afterDate,
	setBeforeDate,
	setAfterDate,
	song,
	setSong,
}) {
	return (
		<Box
			display='flex'
			mx='auto'
			maxWidth='900px'
			my={-2}
			minHeight={'3.4em'}
		>
			<Box sx={{ p: '0.5em' }}>
				{artist && artist !== 'All Bands' && (
					<FilterChip
						artist={artist}
						setArtist={setArtist}
						key={artist}
					></FilterChip>
				)}
				{song && (
					<FilterChip
						song={song}
						setSong={setSong}
						key={song}
					></FilterChip>
				)}
				{afterDate && !beforeDate && (
					<FilterChip
						afterDate={afterDate}
						setAfterDate={setAfterDate}
						key={afterDate}
					></FilterChip>
				)}
				{beforeDate && !afterDate && (
					<FilterChip
						beforeDate={beforeDate}
						setBeforeDate={setBeforeDate}
						key={beforeDate}
					></FilterChip>
				)}
        {beforeDate && afterDate && (
          <FilterChip
            beforeDate={beforeDate}
            afterDate={afterDate}
            setBeforeDate={setBeforeDate}
            setAfterDate={setAfterDate}
            key={beforeDate}
          ></FilterChip>
            )}
				{tagsSelected &&
					tagsSelected.map((tag) => (
						<FilterChip
							key={tag}
							tag={tag}
							tagsSelected={tagsSelected}
							setTagsSelected={setTagsSelected}
						></FilterChip>
					))}
			</Box>
		</Box>
	);
}
