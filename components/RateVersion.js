import { useState, useEffect } from 'react';
import { rateVersion, updateRating, updateTags } from '../utils/dbFunctions';
import { checkUserAlreadyRated } from '../utils/fetchData';
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
import Link from 'next/link';

export default function RateVersion({
	song,
	date,
	location,
	tags,
	user,
	profile,
	jam,
	songs,
	initialButtonText,
}) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [rating, setRating] = useState(10);
	const [comment, setComment] = useState('');
	const [newTags, setNewTags] = useState([]);
	const [existingTags, setExistingTags] = useState(null);
	const [tagsToAddText, setTagsToAddText] = useState('');
	const [tagsObj, setTagsObj] = useState(null);
	const [songSubmitter, setSongSubmitter] = useState(null);
	const [userAlreadyRated, setUserAlreadyRated] = useState(false);
	const [buttonText, setButtonText] = useState('Rate');
	const [commentWarningText, setCommentWarningText] = useState(null);
	const [ratingErrorText, setRatingErrorText] = useState(null);
	const [successAlertText, setSuccessAlertText] = useState(null);
	const [funky, setFunky] = useState(false);
	const [ambient, setAmbient] = useState(false);
	const [fast, setFast] = useState(false);
	const [slow, setSlow] = useState(false);
	const [bliss, setBliss] = useState(false);
	const [shred, setShred] = useState(false);
	const [dark, setDark] = useState(false);
	const [silly, setSilly] = useState(false);
	const [guest, setGuest] = useState(false);
	const [type2, setType2] = useState(false);
	const [groovy, setGroovy] = useState(false);
	const [peaks, setPeaks] = useState(false);
	const [reggae, setReggae] = useState(false);
	const [heavy, setHeavy] = useState(false);
	const [jazzy, setJazzy] = useState(false);
	const [trippy, setTrippy] = useState(false);
	const [soaring, setSoaring] = useState(false);
	const [crunchy, setCrunchy] = useState(false);
	const [happy, setHappy] = useState(false);
	const [acoustic, setAcoustic] = useState(false);
	const [soulful, setSoulful] = useState(false);
	const [officialRelease, setOfficialRelease] = useState(false);
	const [sloppy, setSloppy] = useState(false);
	const [tease, setTease] = useState(false);
	const [multiPart, setMultiPart] = useState(false);
	const [sludgy, setSludgy] = useState(false);
	const [synthy, setSynthy] = useState(false);
	const [chaotic, setChaotic] = useState(false);
	const [dissonant, setDissonant] = useState(false);
	const [bluesy, setBluesy] = useState(false);
	const [stopStart, setStopStart] = useState(false);
	const [segue, setSegue] = useState(false);
	const [unusual, setUnusual] = useState(false);
	const [long, setLong] = useState(false);
	const [thatYearsStyle, setThatYearsStyle] = useState(false);
	const [grimy, setGrimy] = useState(false);
	const [historic, setHistoric] = useState(false);
	const [lowkey, setLowkey] = useState(false);
	const [mellow, setMellow] = useState(false);
	const [melodic, setMelodic] = useState(false);
	const [rocking, setRocking] = useState(false);
	const [tensionRelease, setTensionRelease] = useState(false);
	const [trance, setTrance] = useState(false);
	const [upbeat, setUpbeat] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
		setLoading(false);
		setSuccessAlertText(null);
	};

	const handleClose = () => {
		setLoading(false);
		setOpen(false);
		setSuccessAlertText(null);
	};

	const handleRatingChange = (e) => {
		setRating(e.target.value);
	};

	const handleCommentChange = (e) => {
		setComment(e.target.value);
		if (e.target.value.length > 10000) {
			setCommentWarningText(
				'Your enthusiasm is commendable! Also, character limit exceeded'
			);
		} else {
			setCommentWarningText(null);
		}
	};

	useEffect(() => {
		if (!tags) {
			let allTags = '';
			if (jam.acoustic) {
				allTags += 'Acoustic, ';
			}
			if (jam.ambient) {
				allTags += 'Ambient/Space, ';
			}
			if (jam.bliss) {
				allTags += 'Bliss, ';
			}
			if (jam.bluesy) {
				allTags += 'Bluesy, ';
			}
			if (jam.chaotic) {
				allTags += 'Chaotic, ';
			}
			if (jam.crunchy) {
				allTags += 'Crunchy, ';
			}
			if (jam.dark) {
				allTags += 'Dark, ';
			}
			if (jam.dissonant) {
				allTags += 'Dissonant, ';
			}
			if (jam.fast) {
				allTags += 'Fast, ';
			}
			if (jam.funky) {
				allTags += 'Funky, ';
			}
			if (jam.grimy) {
				allTags += 'Grimy, ';
			}
			if (jam.groovy) {
				allTags += 'Groovy, ';
			}
			if (jam.guest) {
				allTags += 'Guest, ';
			}
			if (jam.happy) {
				allTags += 'Happy, ';
			}
			if (jam.heavy) {
				allTags += 'Heavy, ';
			}
			if (jam.historic) {
				allTags += 'Historic, ';
			}
			if (jam.jazzy) {
				allTags += 'Jazzy, ';
			}
			if (jam.long) {
				allTags += 'Long, ';
			}
			if (jam.low_key) {
				allTags += 'Low-key, ';
			}
			if (jam.mellow) {
				allTags += 'Mellow, ';
			}
			if (jam.melodic) {
				allTags += 'Melodic, ';
			}
			if (jam.multi_part) {
				allTags += 'Multi-part, ';
			}
			if (jam.official_release) {
				allTags += 'Official Release, ';
			}
			if (jam.peaks) {
				allTags += 'Peaks, ';
			}
			if (jam.reggae) {
				allTags += 'Reggae, ';
			}
			if (jam.rocking) {
				allTags += 'Rocking, ';
			}
			if (jam.segue) {
				allTags += 'Segue, ';
			}
			if (jam.shred) {
				allTags += 'Shred, ';
			}
			if (jam.silly) {
				allTags += 'Silly, ';
			}
			if (jam.sloppy) {
				allTags += 'Sloppy, ';
			}
			if (jam.slow) {
				allTags += 'Slow, ';
			}
			if (jam.sludgy) {
				allTags += 'Sludgy, ';
			}
			if (jam.soaring) {
				allTags += 'Soaring, ';
			}
			if (jam.soulful) {
				allTags += 'Soulful, ';
			}
			if (jam.stop_start) {
				allTags += 'Stop-start, ';
			}
			if (jam.synthy) {
				allTags += 'Synthy, ';
			}
			if (jam.tease) {
				allTags += 'Teases, ';
			}
			if (jam.tension_release) {
				allTags += 'Tension and Release, ';
			}
			if (jam.trance) {
				allTags += 'Trance, ';
			}
			if (jam.trippy) {
				allTags += 'Trippy, ';
			}
			if (jam.type2) {
				allTags += 'Type II, ';
			}
			if (jam.unusual) {
				allTags += 'Unusual, ';
			}
			if (jam.upbeat) {
				allTags += 'Upbeat, ';
			}
			let trimmed =
				allTags.length > 2 ? allTags.slice(0, allTags.length - 2) : '';
			setExistingTags(trimmed);
		}
	}, [jam]);

	useEffect(() => {
		let index = songs.findIndex((item) => {
			return item.song === song;
		});
		if (index !== -1) {
			setSongSubmitter(songs[index].submitter_name);
		} else {
			setSongSubmitter(null);
		}
	}, []);

	const handleSubmit = async () => {
		setLoading(true);
		let valid = validateRatingData();
		if (valid) {
			let data;
			if (userAlreadyRated) {
				await updateRating(jam?.id, profile.name, rating, comment);
				if (newTags.length > 0) {
					await updateTags(
						tagsObj,
						jam.id,
						profile.name,
						tagsToAddText,
						newTags.length
					);
					setSuccessAlertText(
						'Successfully updated your rating and added sound tags. Thank you for contributing!'
					);
				} else {
					setSuccessAlertText(
						'Successfully updated your rating. Thank you for contributing!'
					);
				}
			} else {
				await rateVersion(
					jam.id,
					jam.song_id,
					profile.name,
					rating,
					comment,
					jam.submitter_name,
					jam.song_submitter_name ?? songSubmitter,
					user.id
				);
				if (newTags.length > 0) {
					await updateTags(
						tagsObj,
						jam.id,
						profile.name,
						tagsToAddText,
						newTags.length
					);
					setSuccessAlertText(
						'Successfully added your rating and sound tags. Thank you for contributing!'
					);
				} else {
					setSuccessAlertText(
						'Successfully added your rating. Thank you for contributing!'
					);
				}
			}
		}
		setLoading(false);
	};

	const validateRatingData = () => {
		if (comment?.length > 10000) {
			return false;
		}
		if (!profile.can_write) {
			return false;
		}
		return true;
	};

	useEffect(() => {
		if (open) {
			setComment(null);
			setRating(null);
			setUserAlreadyRated(false);
			setButtonText('Rate');
			let checkRated = async () => {
				let data = await checkUserAlreadyRated(profile.name, jam.id);
				if (data) {
					setRating(data[0].rating);
					setComment(data[0].comment);
					setUserAlreadyRated(true);
					setButtonText('Update');
				}
			};
      if (profile) {
        checkRated();
      }
		}
	}, [user, profile, jam, open]);

	useEffect(() => {
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
		let newTagsObj = {};
		let newTagsText = '';
		for (var i = 0; i < newTags.length; i++) {
			newTagsText += tagsList[newTags[i]] + ', ';
			newTagsObj[newTags[i]] = true;
		}
		let trimmedTags = newTagsText.slice(0, newTagsText.length - 2);
		setTagsToAddText(trimmedTags);
		setTagsObj(newTagsObj);
		newTags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false);
		newTags.indexOf('ambient') !== -1 ? setAmbient(true) : setAmbient(false);
		newTags.indexOf('bliss') !== -1 ? setBliss(true) : setBliss(false);
		newTags.indexOf('bluesy') !== -1 ? setBluesy(true) : setBluesy(false);
		newTags.indexOf('chaotic') !== -1 ? setChaotic(true) : setChaotic(false);
		newTags.indexOf('crunchy') !== -1 ? setCrunchy(true) : setCrunchy(false);
		newTags.indexOf('dark') !== -1 ? setDark(true) : setDark(false);
		newTags.indexOf('dissonant') !== -1
			? setDissonant(true)
			: setDissonant(false);
		newTags.indexOf('fast') !== -1 ? setFast(true) : setFast(false);
		newTags.indexOf('funky') !== -1 ? setFunky(true) : setFunky(false);
		newTags.indexOf('groovy') !== -1 ? setGroovy(true) : setGroovy(false);
		newTags.indexOf('guest') !== -1 ? setGuest(true) : setGuest(false);
		newTags.indexOf('happy') !== -1 ? setHappy(true) : setHappy(false);
		newTags.indexOf('jazzy') !== -1 ? setJazzy(true) : setJazzy(false);
		newTags.indexOf('long') !== -1 ? setLong(true) : setLong(false);
		newTags.indexOf('multi_part') !== -1
			? setMultiPart(true)
			: setMultiPart(false);
		newTags.indexOf('official_release') !== -1
			? setOfficialRelease(true)
			: setOfficialRelease(false);
		newTags.indexOf('peaks') !== -1 ? setPeaks(true) : setPeaks(false);
		newTags.indexOf('reggae') !== -1 ? setReggae(true) : setReggae(false);
		newTags.indexOf('segue') !== -1 ? setSegue(true) : setSegue(false);
		newTags.indexOf('shred') !== -1 ? setShred(true) : setShred(false);
		newTags.indexOf('silly') !== -1 ? setSilly(true) : setSilly(false);
		newTags.indexOf('sloppy') !== -1 ? setSloppy(true) : setSloppy(false);
		newTags.indexOf('slow') !== -1 ? setSlow(true) : setSlow(false);
		newTags.indexOf('sludgy') !== -1 ? setSludgy(true) : setSludgy(false);
		newTags.indexOf('soaring') !== -1 ? setSoaring(true) : setSoaring(false);
		newTags.indexOf('soulful') !== -1 ? setSoulful(true) : setSoulful(false);
		newTags.indexOf('stop_start') !== -1
			? setStopStart(true)
			: setStopStart(false);
		newTags.indexOf('synthy') !== -1 ? setSynthy(true) : setSynthy(false);
		newTags.indexOf('tease') !== -1 ? setTease(true) : setTease(false);
		newTags.indexOf('that_years_style') !== -1
			? setThatYearsStyle(true)
			: setThatYearsStyle(false);
		newTags.indexOf('trippy') !== -1 ? setTrippy(true) : setTrippy(false);
		newTags.indexOf('type2') !== -1 ? setType2(true) : setType2(false);
		newTags.indexOf('unusual') !== -1 ? setUnusual(true) : setUnusual(false);
		newTags.indexOf('grimy') !== -1 ? setGrimy(true) : setGrimy(false);
		newTags.indexOf('historic') !== -1 ? setHistoric(true) : setHistoric(false);
		newTags.indexOf('low_key') !== -1 ? setLowkey(true) : setLowkey(false);
		newTags.indexOf('mellow') !== -1 ? setMellow(true) : setMellow(false);
		newTags.indexOf('melodic') !== -1 ? setMelodic(true) : setMelodic(false);
		newTags.indexOf('rocking') !== -1 ? setRocking(true) : setRocking(false);
		newTags.indexOf('tension_release') !== -1
			? setTensionRelease(true)
			: setTensionRelease(false);
		newTags.indexOf('trance') !== -1 ? setTrance(true) : setTrance(false);
		newTags.indexOf('upbeat') !== -1 ? setUpbeat(true) : setUpbeat(false);
	}, [newTags]);

	return (
		<div>
			<Button
				variant='contained'
				onClick={handleClickOpen}
				sx={{ borderRadius: '50px', textTransform: 'none', my: '.5em' }}
			>
				{initialButtonText ?? 'Rate this Jam'}
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>
					Add your rating for {song} by {jam?.artist} from {location} on{' '}
					{new Date(date + 'T18:00:00Z').toDateString()}
				</DialogTitle>
				<DialogContent>
					{!user && (
						<Alert
							severity='info'
							sx={{ mb: '1em' }}
						>
							Please <Link href='/login'>log in</Link> to rate this jam - thank you!
						</Alert>
					)}
					{user && (
						<>
							<Box sx={{ minWidth: '120px', mx: '0.25em', my: '1em' }}>
								<FormControl>
									<InputLabel id='rating-select-label'>Rating</InputLabel>
									<Select
										sx={{ minWidth: '120px' }}
										size='normal'
										labelId='rating-select-label'
										id='rating-select'
										value={rating}
										label='Rating'
										onChange={handleRatingChange}
									>
										<MenuItem value={10}>10</MenuItem>
										<MenuItem value={9}>9</MenuItem>
										<MenuItem value={8}>8</MenuItem>
										<MenuItem value={7}>7</MenuItem>
										<MenuItem value={6}>6</MenuItem>
										<MenuItem value={5}>5</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={null}>No rating</MenuItem>
									</Select>
								</FormControl>
								{ratingErrorText && (
									<Alert
										severity='error'
										sx={{ mb: '1em' }}
									>
										{ratingErrorText}
									</Alert>
								)}
							</Box>
							<Typography
								mx='0.25em'
								mt='1em'
							>
								Optional:
							</Typography>
							<TextField
								autoFocus
								sx={{ mx: '0.25em', mb: '1em' }}
								margin='dense'
								id='comment'
								label='Comments'
								value={comment}
								type='text'
								fullWidth
								variant='standard'
								multiline
								onChange={handleCommentChange}
							/>
							<TagPicker
								tagsSelected={newTags}
								setTagsSelected={setNewTags}
								size={'normal'}
							/>
							{tags && <Typography>Current Sounds: {tags}</Typography>}
							{tagsToAddText && (
								<Typography>Sounds to Add: {tagsToAddText}</Typography>
							)}
							{successAlertText && (
								<Alert
									severity='success'
									sx={{ my: '1em' }}
								>
									{successAlertText}
								</Alert>
							)}
						</>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						sx={{ textTransform: 'none' }}
					>
						Close
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={
							loading || commentWarningText || !user || !profile || (!rating && !comment && newTags?.length === 0)
						}
						sx={{ textTransform: 'none' }}
						aria-label='submit'
					>
						{buttonText}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
