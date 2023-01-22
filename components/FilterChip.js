import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';

const tags = {
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
	teases: 'Teases',
	tension_release: 'Tension and Release',
	that_years_style: "That Year's Style",
	trance: 'Trance',
	trippy: 'Trippy',
	type2: 'Type II',
	unusual: 'Unusual',
	upbeat: 'Upbeat',
};

export default function FilterChip({
	tag,
	artist,
	setArtist,
	tagsSelected,
	setTagsSelected,
	beforeDate,
	setBeforeDate,
	afterDate,
	setAfterDate,
	song,
	setSong,
}) {
	const [label, setLabel] = useState(null);

	useEffect(() => {
		if (artist) {
			setLabel(artist);
		}
		if (tag) {
			setLabel(tags[tag]);
		}
		if (beforeDate && !afterDate) {
			setLabel(`From ${beforeDate} or before`);
		}
		if (afterDate && !beforeDate) {
			setLabel(`From ${afterDate} or after`);
		}
		if (beforeDate && afterDate) {
			if (beforeDate === afterDate) {
				setLabel(`From ${beforeDate}`);
			} else {
				setLabel(`From ${afterDate} to ${beforeDate}`);
			}
		}
		if (song) {
			setLabel(song);
		}
	}, [artist, tag, beforeDate, afterDate, song]);

	const handleDelete = () => {
		if (artist) {
			setArtist('');
		}
		if (tag) {
			removeTag(tag);
		}
		if (beforeDate) {
			setBeforeDate('');
		}
		if (afterDate) {
			setAfterDate('');
		}
		if (song) {
			setSong('');
		}
	};

	function removeTag(tag) {
		let index = tagsSelected.indexOf(tag);
		let updatedTags = tagsSelected
			.slice(0, index)
			.concat(tagsSelected.slice(index + 1));
		setTagsSelected(updatedTags);
	}

	return (
		<>
			{label && (
				<Chip
					sx={{ m: '0.25em' }}
					label={label}
					onDelete={handleDelete}
				/>
			)}
		</>
	);
}
