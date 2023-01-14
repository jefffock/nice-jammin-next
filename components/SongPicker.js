import { useState, useEffect, useTransition, startTransition } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export default function SongPicker({
	artist,
	songs,
	song,
	setSong,
	setlist,
	wide,
	size,
	mx,
	my,
}) {
	const [value, setValue] = useState(song || '');
	const [inputValue, setInputValue] = useState(song || '');
	const [uniqueSongs, setUniqueSongs] = useState(null);
	const [songsByArtist, setSongsByArtist] = useState(null);

	useEffect(() => {
		let titlesOnly = new Set();
		let formattedSongs = [];
		if (setlist) {
			setlist.forEach((song) => {
				formattedSongs.push({
					label: song.song,
					alreadyAdded: song.alreadyAdded,
				});
			});
		} else if (songs) {
			if (artist) {
				let artistSongs = new Set();
				let otherSongs = new Set();
				if (
					artist === "Joe Russo's Almost Dead" ||
					artist === 'Furthur' ||
					artist === 'Dead & Company'
				) {
					for (var i = 0; i < songs.length; i++) {
						if (
							songs[i].artist === 'Grateful Dead' ||
							songs[i].artist === artist
						) {
							artistSongs.add(songs[i].song);
						} else {
							otherSongs.add(songs[i].song);
						}
					}
				} else {
					for (var i = 0; i < songs.length; i++) {
						if (songs[i].artist === artist) {
							artistSongs.add(songs[i].song);
						} else {
							otherSongs.add(songs[i].song);
						}
					}
				}
				artistSongs.forEach((song) => titlesOnly.add(song));
				otherSongs.forEach((song) => titlesOnly.add(song));
			} else {
				//no artist
				songs.forEach((song) => {
					titlesOnly.add(song.song);
				});
			}
			titlesOnly.forEach((song) => {
				formattedSongs.push({
					label: song,
				});
			});
		}
		setUniqueSongs(formattedSongs);
	}, [songs, setlist, artist]);

	useEffect(() => {
		setSong(inputValue);
	}, [inputValue]);

	useEffect(() => {
		if (!song) {
			setValue('');
			setInputValue('');
		}
	}, [song]);

	const handleSetlistSongChange = (event) => {
		setValue(event.target.value);
		setSong(event.target.value);
	};

	if (!setlist || setlist.length === 0) {
		return (
			<Box
				mx={mx ? mx : '0.5em'}
				my={my ? my : '0.4em'}
				sx={{
					minWidth: '180px',
					maxWidth: '240px',
				}}
			>
				<Autocomplete
					// disablePortal
					ListboxProps={{
						sx: { maxHeight: '50vh' },
					}}
					freeSolo
					selectOnFocus={true}
					openOnFocus={true}
					fullWidth
					value={value ? value : ''}
					isOptionEqualToValue={(option, value) => option === value}
					onChange={(event, newValue) => {
						setValue(newValue);
						// setOpen(false)
					}}
					inputValue={inputValue}
					onInputChange={(event, newInputValue) => {
						startTransition(() => {
							setInputValue(newInputValue);
						});
					}}
					id='song-picker'
					// maxHeight="95vh"
					// sx={{maxHeight: '95vh'}}
					options={uniqueSongs ?? [{ label: 'Loading songs...' }]}
					size={size ? size : 'small'}
					renderInput={(params) => (
						<TextField
							{...params}
							// InputProps={{
							//   style: { maxHeight: 100}
							// }}
							label='Song'
						/>
					)}
				/>
			</Box>
		);
	} else {
		//setlist is present
		return (
			<Box my={my ? my : '0.25em'}>
				<FormControl
					sx={{ minWidth: 120, mx: '0.25em' }}
					size={size ? size : 'small'}
				>
					<InputLabel id='song-select'>Song</InputLabel>
					<Select
						labelId='song-select'
						value={song ?? ''}
						label='Song'
						onChange={handleSetlistSongChange}
					>
						{uniqueSongs?.map((song, index) => {
							const label = (song.alreadyAdded ? '(Added) ' : '') + song.label;
							return (
								<MenuItem
									key={index}
									value={song.label}
								>
									{label}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</Box>
		);
	}
}
