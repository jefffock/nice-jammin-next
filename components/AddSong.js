import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import TagPicker from './TagPicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { addTenPoints } from '../utils/dbFunctions';
import { fetchSongs } from '../utils/fetchData';
import ArtistPicker from './ArtistPicker';

export default function AddSong({
	song,
	setSong,
	user,
	songs,
	profile,
	setSongs,
	artist,
	setArtist,
}) {
	const [open, setOpen] = useState(false);
	const [songToAdd, setSongToAdd] = useState(song);
	const [loading, setLoading] = useState(null);
	const [successAlertText, setSuccessAlertText] = useState(null);

	useEffect(() => {
		setSongToAdd(song);
	}, [song]);

	useEffect(() => {
		setSuccessAlertText(null);
	}, [artist]);

	const handleClickOpen = () => {
		setLoading(false);
		setSuccessAlertText(null);
		setOpen(true);
	};

	const handleClose = () => {
		setLoading(false);
		setSuccessAlertText(null);
		setSongToAdd(null);
		setOpen(false);
	};

	const handleSongChange = (e) => {
		setSongToAdd(e.target.value);
		if (successAlertText) {
			setSuccessAlertText(null);
		}
	};

	const handleSubmit = async (event) => {
		setSongToAdd(songToAdd.trim());
		event.preventDefault();
		setLoading(true);
		const valid = validate();
		if (valid) {
			await insertSong();
		}
		setLoading(false);
	};

	function validate() {
		let index;
		songs.find((song, i) => {
			if (song.song === songToAdd) {
				index = i;
			}
		});
		if (index) {
			setSong(songToAdd);
			handleClose();
			return false;
		}
		if (!user || !profile || !profile.can_write) {
			return false;
		}
		if (!artist) {
			return false;
		}
		if (!index) {
			if (songToAdd.length > 0) {
				return true;
			}
		}
	}

	async function insertSong() {
		const { error } = await supabase
			.from('songs')
			.insert(
				{ song: songToAdd, submitter_name: profile.name, artist: artist },
				{ returning: 'minimal' }
			);
		if (error) {
			console.error(error);
		} else {
			setSuccessAlertText(`${songToAdd} added successfully - Thank you!`);
			setLoading(false);
			addTenPoints(profile.name);
			let newSongs = await fetchSongs();
			setSongs(newSongs);
		}
	}

	return (
		<div>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					variant='contained'
					onClick={handleClickOpen}
					sx={{ borderRadius: '50px', textTransform: 'none', my: '.5em' }}
				>
					Add {song}
				</Button>
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Add {songToAdd}</DialogTitle>
				<DialogContent>
					{!user && (
						<Alert
							severity='info'
							sx={{ mb: '1em' }}
						>
							Please log in to add this song - thank you!
						</Alert>
					)}
					<FormControl></FormControl>
					<TextField
						autoFocus
						margin='dense'
						id='song-to-add'
						// label="Song"
						type='text'
						fullWidth
						value={songToAdd}
						variant='standard'
						multiline
						onChange={handleSongChange}
						sx={{ mb: '1em' }}
					/>
					{user && !successAlertText && (
						<Alert
							severity='info'
							sx={{ my: '1em' }}
						>
							Please double check for typos. Thank you!
						</Alert>
					)}
					<ArtistPicker
						setArtist={setArtist}
						artist={artist}
					/>
					{user && !successAlertText && (
						<Alert
							severity='info'
							sx={{ my: '1em' }}
						>
							The band doesn't have to be the original artist, just the band on
							NiceJammin that plays it the most.
						</Alert>
					)}
					{successAlertText && (
						<Alert
							severity='success'
							sx={{ my: '1em' }}
						>
							{successAlertText}
						</Alert>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						sx={{ textTransform: 'none' }}
					>
						Close
					</Button>
					{!successAlertText && (
						<Button
							onClick={handleSubmit}
							disabled={
								loading || !song || !user || !artist || artist === 'All Bands'
							}
							sx={{ textTransform: 'none' }}
						>
							Add song
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
}
