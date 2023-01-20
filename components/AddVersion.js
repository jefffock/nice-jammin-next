import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { addOnePoint, addTenPoints, rateVersion } from '../utils/dbFunctions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SongPicker from './SongPicker';
import ArtistPicker from './ArtistPicker';
import TagPicker from './TagPicker';
import DatePicker from './DatePicker';
import ShowPicker from './ShowPicker';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AddSong from './AddSong';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import RateVersion from './RateVersion';
import Link from 'next/link';
import YearPicker from './YearPicker';
import Stack from '@mui/material/Stack';
import Image from 'next/image';

export default function AddVersion({
	songs,
	user,
	profile,
	setSongs,
	initialArtist,
	initialSong,
}) {
	const [artist, setArtist] = useState(initialArtist);
	const [song, setSong] = useState(initialSong ?? '');
	const [songObj, setSongObj] = useState(null);
	const [songExists, setSongExists] = useState(false);
	const [loading, setLoading] = useState(null);
	const [open, setOpen] = useState(false);
	const [songErrorText, setSongErrorText] = useState(null);
	const [artistErrorText, setArtistErrorText] = useState(null);
	const [dateErrorText, setDateErrorText] = useState(null);
	const [locationErrorText, setLocationErrorText] = useState(null);
	const [successAlertText, setSuccessAlertText] = useState(null);
	const [tags, setTags] = useState([]);
	const [date, setDate] = useState(null);
	const [location, setLocation] = useState(null);
	const [tagsText, setTagsText] = useState('');
	const [rating, setRating] = useState('');
	const [comment, setComment] = useState('');
	const [listenLink, setListenLink] = useState(null);
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
	const [setlist, setSetlist] = useState(null);
	const [show, setShow] = useState(null);
	const [shows, setShows] = useState(null);
	const [loadingShows, setLoadingShows] = useState(false);
	const [loadingSetlist, setLoadingSetlist] = useState(false);
	const [allShows, setAllShows] = useState(null);
	const [njVersionsDatesOnly, setNjVersionsDatesOnly] = useState(null);
	const [versionExists, setVersionExists] = useState(false);
	const [jams, setJams] = useState(null);
	const [jam, setJam] = useState(null);
	const [year, setYear] = useState('');
	const [showLocationInput, setShowLocationInput] = useState(true);
	const [noSetlistFound, setNoSetlistFound] = useState(false);

	useEffect(() => {
		if (songs) {
			let index = songs.findIndex((item) => {
				return item.song === song;
			});
			index === -1 ? setSongExists(false) : setSongExists(true);
			setSongObj(songs[index]);
		}
	}, [song, songs]);

	useEffect(() => {
		setSuccessAlertText(null);
		if (date) {
			if (jams && song) {
				let index = jams.findIndex((jam) => {
					return jam.song_name === song && jam.date === date;
				});
				if (index !== -1) {
					setVersionExists(true);
					setJam(jams[index]);
					setDateErrorText(
						`You have good taste: ${song} from ${new Date(
							date + 'T18:00:00Z'
						).toDateString()} has already been added. Click the button below to add your rating.`
					);
				} else {
					setVersionExists(false);
					setDateErrorText(null);
				}
			}
		}
		if (!date || !song) {
			setVersionExists(false);
			setDateErrorText(null);
		}
	}, [date, song, jams]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setSuccessAlertText(null);
		setSongErrorText(null);
		setArtistErrorText(null);
		setDateErrorText(null);
		setLocationErrorText(null);
		setSuccessAlertText(null);
		setLoading(false);
		setTags([]);
		setDate(null);
		setLocation(null);
		setOpen(false);
		setShows(null);
		setShow(null);
	};

	useEffect(() => {
		if (open) {
			setDate(null);
			setLocation(null);
			setSong(null);
			setShows(null);
			setAllShows(null);
			setSongErrorText(null);
		}
	}, [artist]);

	//when date changes
	//fetch setlist
	useEffect(() => {
		//make sure the date is from this millenium or the previous one before fetching versions from that date
		if (date && (date.charAt(0) === '1' || date.charAt(0) === '2') && open) {
			const data = JSON.stringify({
				date: date,
				artist: artist,
			});
			let fetchSetlist;
			const fetchNJVersionsByDate = fetch('/api/versions', {
				method: 'POST',
				body: data,
			});
			switch (artist) {
				case 'Phish':
				case 'Trey Anastasio, TAB':
					fetchSetlist = fetch('/api/phish/setlists', {
						method: 'POST',
						body: data,
					});
					break;
				case 'Eggy':
				case 'Goose':
				case "Umphrey's McGee":
				case 'Neighbor':
					fetchSetlist = fetch('/api/songfish/setlists', {
						method: 'POST',
						body: data,
					});
					break;
				case 'Squeaky Feet':
					setNoSetlistFound(true);
					break;
				default:
					fetchSetlist = fetch('/api/setlistfm/setlists', {
						method: 'POST',
						body: data,
					});
			}
			if (fetchSetlist) {
				setLoadingSetlist(true);
				try {
					Promise.all([fetchSetlist, fetchNJVersionsByDate])
						.then((responses) =>
							Promise.all(responses.map((_res) => _res.json()))
						)
						.then((responses) => {
							const setlist = responses[0].titles;
							const njVersions = responses[1];
							const location = responses[0].location;
							if (responses.error || !setlist || setlist.length === 0) {
								setSetlist(null);
								setNoSetlistFound(true);
								setShowLocationInput(true);
								setLoadingSetlist(false);
							} else {
								const comboSetlist = setlist.map((song) => {
									if (njVersions.indexOf(song) === -1) {
										return {
											song,
											alreadyAdded: false,
										};
									} else {
										return { song, alreadyAdded: true };
									}
								});
								setSetlist(comboSetlist);
								if (location) {
									setLocation(location);
									setShowLocationInput(false);
								}
								setLoadingSetlist(false);
							}
						});
				} catch (error) {
					setLoadingSetlist(false);
					console.error('Error getting setlist', error);
				}
			} else {
				setNoSetlistFound(true);
			}
		} else {
			setSetlist(null);
			setLocation(null);
		}
	}, [date, open]);

	//when song changes
	//if artist is supported, fetch all versions of that song
	useEffect(() => {
		if (song && songExists && open) {
			let url;
			switch (artist) {
				case 'Phish':
				case 'Trey Anastasio, TAB':
					url = '/api/phish/versions';
					break;
				case 'Eggy':
				case 'Goose':
				case "Umphrey's McGee":
				case 'Neighbor':
					url = '/api/songfish/versions';
					break;
			}
			const data = JSON.stringify({ artist, song });
			if (url) {
				setLoadingShows(true);
				try {
					fetch(url, {
						method: 'POST',
						body: data,
					})
						.then((data) => data.json())
						.then((allVersions) => {
							setLoadingShows(false);
							setAllShows(allVersions);
						});
				} catch (error) {
					setLoadingShows(false);
					console.error(error);
				}
			}
		} else {
			setShows(null);
		}
	}, [song, songExists, open]);

	//when NJ jams list changes, get dates and store them in state
	useEffect(() => {
		if (artist && (song || date) && open) {
			const body = JSON.stringify({
				song,
				date,
				artist,
				fetchFullJams: song && date,
			});
			try {
				fetch('/api/versions', {
					method: 'POST',
					body,
				})
					.then((data) => data.json())
					.then((njVersions) => {
						setNjVersionsDatesOnly(njVersions);
						if (date && song) {
							let index = njVersions.findIndex((njJam) => {
								return date === njJam.date;
							});
							if (index !== -1) {
								setVersionExists(true);
								setJam(njVersions[index]);
								setDateErrorText(
									`You have good taste: ${song} from ${new Date(
										date + 'T18:00:00Z'
									).toDateString()} has already been added. Click the button below to add your rating.`
								);
							} else {
								setVersionExists(false);
								setDateErrorText(null);
							}
						}
					});
				if (!date || !song) {
					setVersionExists(false);
					setDateErrorText(null);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}, [song, date, artist, open]);

	//when allShows changes, compare it to versions on NJ
	useEffect(() => {
		if (allShows && njVersionsDatesOnly) {
			const showsWithAlreadyAdded = allShows.map(
				({ showdate, isjamchart, location, label }) => {
					if (njVersionsDatesOnly.indexOf(showdate) === -1) {
						return {
							showdate,
							label,
							location,
							isjamchart,
							alreadyAdded: false,
						};
					} else {
						return {
							showdate,
							label,
							location,
							isjamchart,
							alreadyAdded: true,
						};
					}
				}
			);
			showsWithAlreadyAdded.length > 0
				? setShows(showsWithAlreadyAdded)
				: setShows(null);
		}
	}, [allShows, njVersionsDatesOnly]);

	//when setlist changes, make sure current song is in that setlist
	useEffect(() => {
		if (song && setlist) {
			let songInSetlist = false;
			setlist.forEach((songTitle) => {
				if (songTitle.song === song) {
					songInSetlist = true;
				}
			});
			if (!songInSetlist) {
				setSong(null);
			}
		}
	}, [setlist]);

	const handleRatingChange = (e) => {
		setRating(e.target.value);
	};

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	const handleLocationChange = (e) => {
		setLocation(e.target.value);
	};

	const handleSubmit = async () => {
		if (!loading) {
			setLoading(true);
			let valid = validateData();
			if (valid) {
				setSuccessAlertText('Looks good, adding jam...');
				await insertVersion();
				setLoading(false);
			} else {
				console.error('issue with data');
			}
			setLoading(false);
		}
	};

	const validateData = () => {
		let currentDate = new Date();
		if (currentDate < Date.parse(date)) {
			setDateErrorText(
				`Hello, time traveller! Thanks for trying to add this version of ${song}.\n\nUnfortunately, that would create a few paradoxes.\n\nIf the jam is great again in this timeline, feel free to come back and add it. Thank you, and safe travels!`
			);
			return false;
		}
		if (date === '') {
			setDateErrorText('Please enter a date');
			return false;
		}
		if (!profile.can_write) {
			return false;
		}
		if (location === '') {
			setLocationErrorText('Please enter a location');
			return false;
		}
		if (location.length > 60) {
			setLocationErrorText(
				'Please make the location shorter (60 characters max.)'
			);
			return false;
		}
		if (!songExists) {
			setSongErrorText(
				'Please choose a song name that has already been added, or add a new song'
			);
			return false;
		}
		if (!artist) {
			setArtistErrorText('Please select an artist');
			return false;
		}
		return true;
	};

	const clearArtist = () => {
		setArtist(null);
		setSong(null);
		setDate('');
		setLocation(null);
		setSetlist(null);
		setLoadingSetlist(false);
		setLoadingShows(false);
		setLoading(false);
	};

	const clearDate = () => {
		setDate('');
		setShow(null);
		setLocation(null);
		setSetlist(null);
		setLoadingSetlist(false);
		setLoadingShows(false);
		setLoading(false);
	};

	const clearSong = () => {
		setSong('');
		setLoadingSetlist(false);
		setLoadingShows(false);
		setLoading(false);
	};

	const clearYear = () => {
		setLocation(null);
		setYear(null);
		setShows(null);
		setLoadingShows(false);
		setLoading(false);
		setSetlist(null);
		setLoadingSetlist(false);
		setDate('');
	};

	const changeLocation = () => {
		setShowLocationInput(true);
	};

	const insertVersion = async () => {
		const { data, error } = await supabase.from('versions').insert([
			{
				song_id: songObj.id,
				song_name: song,
				user_id: user.id,
				submitter_name: profile.name,
				song_submitter_name: songObj.submitter_name,
				location: location,
				artist: artist,
				date: date,
				funky: funky,
				ambient: ambient,
				fast: fast,
				slow: slow,
				bliss: bliss,
				shred: shred,
				dark: dark,
				silly: silly,
				guest: guest,
				type2: type2,
				groovy: groovy,
				peaks: peaks,
				reggae: reggae,
				heavy: heavy,
				jazzy: jazzy,
				trippy: trippy,
				soaring: soaring,
				crunchy: crunchy,
				happy: happy,
				acoustic: acoustic,
				soulful: soulful,
				official_release: officialRelease,
				sloppy: sloppy,
				tease: tease,
				listen_link: listenLink,
				multi_part: multiPart,
				sludgy: sludgy,
				synthy: synthy,
				chaotic: chaotic,
				dissonant: dissonant,
				bluesy: bluesy,
				stop_start: stopStart,
				segue: segue,
				unusual: unusual,
				long: long,
				that_years_style: thatYearsStyle,
				grimy: grimy,
				historic: historic,
				low_key: lowkey,
				mellow: mellow,
				melodic: melodic,
				rocking: rocking,
				tension_release: tensionRelease,
				trance: trance,
				upbeat: upbeat,
			},
		]);
		if (error) {
			console.error(error);
		} else {
			addOnePoint(songObj.submitter_name);
			addTenPoints(profile.name);
			if (rating) {
				rateVersion(
					data[0].id,
					songObj.id,
					profile.name,
					rating,
					comment,
					profile.name,
					songObj.submitter_name,
					user.id
				);
				addTenPoints(profile.name);
				setSuccessAlertText(
					`Successfully added ${song} from ${date} and your rating. Thank you for contributing! It will be in the table the next time you refresh the page.`
				);
			} else {
				setSuccessAlertText(
					`Successfully added ${song} from ${date}. Thank you for contributing! It will be in the table the next time you refresh the page.`
				);
			}
			//rebuild with deploy hooks
			fetch(
				'https://api.vercel.com/v1/integrations/deploy/prj_KTTGWtEcoRt7VbckE5pwZXH7QL8E/5gZtO7yzjW'
			);
		}
	};

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
		let newTagsText = '';
		for (var i = 0; i < tags.length; i++) {
			newTagsText += tagsList[tags[i]] + ', ';
		}
		let trimmedTagsText = newTagsText.slice(0, newTagsText.length - 2);
		setTagsText(trimmedTagsText);
		tags.indexOf('acoustic') !== -1 ? setAcoustic(true) : setAcoustic(false);
		tags.indexOf('ambient') !== -1 ? setAmbient(true) : setAmbient(false);
		tags.indexOf('bliss') !== -1 ? setBliss(true) : setBliss(false);
		tags.indexOf('bluesy') !== -1 ? setBluesy(true) : setBluesy(false);
		tags.indexOf('chaotic') !== -1 ? setChaotic(true) : setChaotic(false);
		tags.indexOf('crunchy') !== -1 ? setCrunchy(true) : setCrunchy(false);
		tags.indexOf('dark') !== -1 ? setDark(true) : setDark(false);
		tags.indexOf('dissonant') !== -1 ? setDissonant(true) : setDissonant(false);
		tags.indexOf('fast') !== -1 ? setFast(true) : setFast(false);
		tags.indexOf('funky') !== -1 ? setFunky(true) : setFunky(false);
		tags.indexOf('groovy') !== -1 ? setGroovy(true) : setGroovy(false);
		tags.indexOf('guest') !== -1 ? setGuest(true) : setGuest(false);
		tags.indexOf('happy') !== -1 ? setHappy(true) : setHappy(false);
		tags.indexOf('heavy') !== -1 ? setHeavy(true) : setHeavy(false);
		tags.indexOf('jazzy') !== -1 ? setJazzy(true) : setJazzy(false);
		tags.indexOf('long') !== -1 ? setLong(true) : setLong(false);
		tags.indexOf('multi_part') !== -1
			? setMultiPart(true)
			: setMultiPart(false);
		tags.indexOf('official_release') !== -1
			? setOfficialRelease(true)
			: setOfficialRelease(false);
		tags.indexOf('peaks') !== -1 ? setPeaks(true) : setPeaks(false);
		tags.indexOf('reggae') !== -1 ? setReggae(true) : setReggae(false);
		tags.indexOf('segue') !== -1 ? setSegue(true) : setSegue(false);
		tags.indexOf('shred') !== -1 ? setShred(true) : setShred(false);
		tags.indexOf('silly') !== -1 ? setSilly(true) : setSilly(false);
		tags.indexOf('sloppy') !== -1 ? setSloppy(true) : setSloppy(false);
		tags.indexOf('slow') !== -1 ? setSlow(true) : setSlow(false);
		tags.indexOf('sludgy') !== -1 ? setSludgy(true) : setSludgy(false);
		tags.indexOf('soaring') !== -1 ? setSoaring(true) : setSoaring(false);
		tags.indexOf('soulful') !== -1 ? setSoulful(true) : setSoulful(false);
		tags.indexOf('stop_start') !== -1
			? setStopStart(true)
			: setStopStart(false);
		tags.indexOf('synthy') !== -1 ? setSynthy(true) : setSynthy(false);
		tags.indexOf('tease') !== -1 ? setTease(true) : setTease(false);
		tags.indexOf('that_years_style') !== -1
			? setThatYearsStyle(true)
			: setThatYearsStyle(false);
		tags.indexOf('trippy') !== -1 ? setTrippy(true) : setTrippy(false);
		tags.indexOf('type2') !== -1 ? setType2(true) : setType2(false);
		tags.indexOf('unusual') !== -1 ? setUnusual(true) : setUnusual(false);
		tags.indexOf('grimy') !== -1 ? setGrimy(true) : setGrimy(false);
		tags.indexOf('historic') !== -1 ? setHistoric(true) : setHistoric(false);
		tags.indexOf('low_key') !== -1 ? setLowkey(true) : setLowkey(false);
		tags.indexOf('mellow') !== -1 ? setMellow(true) : setMellow(false);
		tags.indexOf('melodic') !== -1 ? setMelodic(true) : setMelodic(false);
		tags.indexOf('rocking') !== -1 ? setRocking(true) : setRocking(false);
		tags.indexOf('tension_release') !== -1
			? setTensionRelease(true)
			: setTensionRelease(false);
		tags.indexOf('trance') !== -1 ? setTrance(true) : setTrance(false);
		tags.indexOf('upbeat') !== -1 ? setUpbeat(true) : setUpbeat(false);
	}, [tags]);

	return (
		<Box
			display='flex'
			justifyContent='center'
		>
			<Button
				variant='contained'
				onClick={handleClickOpen}
				sx={{
					borderRadius: '50px',
					bgcolor: 'third.main',
					mx: 'auto',
					textTransform: 'none',
				}}
			>
				Add a 🔥 Jam
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				sx={{ minHeight: '50vh' }}
			>
				<DialogTitle fontSize={26}>Add a 🔥 Jam</DialogTitle>
				<DialogContent sx={{ minHeight: '300px', minWidth: '300px' }}>
					<Typography sx={{ mb: '1em' }}>
						Thanks for helping this jam reach more ears 🙏 You rock! 🎸
					</Typography>
					{!user && (
						<Alert
							severity='info'
							sx={{ my: '1em' }}
						>
							Please <Link href='/login'>log in</Link> to contribute - thank
							you!
						</Alert>
					)}
					{user && (!artist || artist === 'All Bands') && (
						<ArtistPicker
							artist={artist}
							setArtist={setArtist}
							size={'normal'}
							my={'1em'}
						/>
					)}
					{artist && artist !== 'All Bands' && (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Typography fontSize={18}>
								{artist}
								{artist === 'Phish'
									? ' 🐟 ⭕'
									: artist === 'Grateful Dead' ||
									  artist === 'Dead & Company' ||
									  artist === "Joe Russo's Almost Dead" ||
									  artist === 'Phil Lesh & Friends' ||
									  artist === 'Furthur'
									? ' ⚡'
									: artist === 'Lettuce'
									? ' 🥬'
									: artist === 'Eggy'
									? ' 🥚'
									: artist === 'Lotus'
									? ' 🪷'
									: artist === 'Railroad Earth'
									? ' 🚂🌎'
									: artist === 'String Cheese Incident'
									? ' 🧀'
									: artist === 'Disco Biscuits'
									? ' 🪩'
									: artist === 'Ghost Light'
									? ' 👻'
									: artist === 'Aqueous'
									? ' 💧'
									: artist === 'King Gizzard & the Lizard Wizard'
									? ' 🦎🧙‍♂️'
									: artist === 'Billy Strings'
									? ' 🎻'
									: artist === 'Greensky Bluegrass'
									? ' 🪕'
									: artist === 'My Morning Jacket'
									? ' 🧥'
									: artist === 'Neighbor'
									? ' 🏡'
									: artist === 'Tedeschi Trucks Band'
									? ' 🚚 🚛'
									: artist === 'Squeaky Feet'
									? ' 🦶🏻'
									: artist === 'Medeski Martin & Wood'
									? ' 🪵'
									: artist === 'Goose'
									? ' 🦢'
									: artist === 'Trey Anastasio, TAB'
									? ' ▫️'
									: ' ❤️'}
							</Typography>
							<Button
								sx={{ textTransform: 'none' }}
								onClick={clearArtist}
							>
								Change Artist
							</Button>
						</Box>
					)}
					{artistErrorText && (
						<Alert
							severity='error'
							sx={{ my: '1em' }}
						>
							{artistErrorText}
						</Alert>
					)}
					{loadingSetlist && (
						<Box
							sx={{
								display: 'flex',
							}}
						>
							<Image
								src='/spinner.gif'
								alt='loading'
								height={30}
								width={30}
							/>
							<Typography>Loading Setlist...</Typography>
						</Box>
					)}
					{artist &&
						!song &&
						!year &&
						(artist === 'Goose' ||
							artist === 'Eggy' ||
							artist === 'Neighbor' ||
							artist === "Umphrey's McGee" ||
							artist === 'Phish' ||
							artist === 'Trey Anastasio, TAB') &&
						!location &&
						!date && (
							<Typography>Choose a song or year to view shows</Typography>
						)}
					{artist && !song && !loadingSetlist && (date || location) && (
						<Typography>Choose a song</Typography>
					)}
					{artist &&
						!songExists &&
						(date ||
							artist === 'Goose' ||
							artist === 'Eggy' ||
							artist === 'Neighbor' ||
							artist === "Umphrey's McGee" ||
							artist === 'Phish' ||
							artist === 'Trey Anastasio, TAB') && (
							<SongPicker
								artist={artist}
								songs={songs}
								song={song}
								setSong={setSong}
								setlist={setlist}
								setSetlist={setSetlist}
								wide={true}
								size={'normal'}
								mx={'0em'}
								my={'1em'}
								loadingSetlist={loadingSetlist}
							/>
						)}
					{artist && song && (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Typography fontSize={18}>
								{song}
								{song === 'Ghost'
									? ' 👻'
									: song === 'Deal'
									? ' 🤝'
									: song === 'Fire on the Mountain'
									? ' 🔥⛰️'
									: song === "Wolfman's Brother"
									? ' 🐺'
									: song === 'Tube'
									? ' 🧪'
									: song === 'Simple' || song === 'Cities'
									? ' 🌆'
									: song === 'The Sloth'
									? ' 🦥'
									: song === 'Turtle in the Clouds'
									? ' 🐢☁️'
									: song === 'The Lizards'
									? ' 🦎'
									: song === 'Bathtub Gin'
									? ' 🛁🍸'
									: song === 'Sand'
									? ' ⏳'
									: song === 'Waves' ||
									  song === 'A Wave of Hope' ||
									  song === 'Ruby Waves' ||
									  song === 'This Old Sea' ||
									  song === 'A Song I Heard the Ocean Sing' ||
									  song === 'Drowned'
									? ' 🌊'
									: song === 'Split Open and Melt'
									? ' 🫠'
									: song === 'Arrow'
									? ' 🏹'
									: song === 'Madhuvan'
									? ' 🌳'
									: song === 'Tweezer' || song === 'Tweezer Reprise'
									? ' 🥶'
									: song === 'Animal'
									? ' 🐒'
									: song === 'Back on the Train' ||
									  song === '555' ||
									  song === 'Mystery Train'
									? ' 🚂'
									: song === 'Arcadia' || song === 'Run Like an Antelope'
									? ' 🏃'
									: song === 'Runaway Jim' || song === 'Dogs Stole Things'
									? ' 🐕'
									: song === 'Leaves'
									? ' 🍂'
									: song === 'A Western Sun'
									? ' 🌞'
									: song === 'Flodown'
									? ' 🤡'
									: song === 'Hot Tea'
									? ' ☕'
									: song === 'Tumble' || song === 'Cavern'
									? ' 👟'
									: song === '1999'
									? ' 🕺'
									: song === 'Piper'
									? ' 🪱'
									: song === 'Roses Are Free' ||
									  song === 'Echo of a Rose' ||
									  song === 'Rosewood Heart'
									? ' 🌹'
									: song === 'Fee'
									? ' 🕉️'
									: song === 'Poor Heart'
									? ' 💔'
									: song === 'Eyes of the World'
									? ' 👀'
									: song === 'Down with Disease'
									? ' 🤒'
									: song === 'You Enjoy Myself'
									? ' 👦👨🙏💩'
									: song === 'The Other One' ||
									  song === "That's It for the Other One"
									? ' 🤯'
									: song === 'The Wheel'
									? ' ☸️'
									: song === 'Time to Flee' || song === 'Alligator'
									? ' 🐊'
									: song === "Halley's Comet"
									? ' ☄️'
									: song === 'Llama'
									? ' 🦙'
									: song === 'Divided Sky'
									? ' 🌅'
									: song === 'Not Fade Away'
									? ' ❤️'
									: song === 'Birds of a Feather'
									? ' 🐦'
									: song === 'Blaze On'
									? ' 🔥'
									: song === 'Earthling or Alien'
									? ' 👽'
									: song === 'Gumbo'
									? ' 🥘'
									: song === 'Slave to the Traffic Light'
									? ' 🚦'
									: song === 'The Moma Dance' || song === "The Old Man's Boat"
									? ' ⛵'
									: song === 'Wilson' || song === 'Prince Caspian'
									? ' 🤴'
									: song === 'Reba'
									? ' 🛍️🏷️'
									: song === 'Harry Hood'
									? ' 🥛'
									: song === 'Possum' || song === 'Windy Mountain'
									? ' ⛰️'
									: ''}
							</Typography>
							<Button
								sx={{ textTransform: 'none' }}
								onClick={clearSong}
							>
								Change Song
							</Button>
						</Box>
					)}
					{!songExists && song && (
						<>
							<Alert
								severity='info'
								sx={{ mb: '1em' }}
							>
								{song} hasn&apos;t been added yet. Can you believe it?
							</Alert>
							<AddSong
								song={song}
								user={user}
								songs={songs}
								setSong={setSong}
								profile={profile}
								setSongs={setSongs}
								artist={artist}
								setArtist={setArtist}
							/>
						</>
					)}
					{songErrorText && (
						<Alert
							severity='error'
							sx={{ my: '1em' }}
						>
							{songErrorText}
						</Alert>
					)}
					{artist && !song && artist !== 'Squeaky Feet' && (
						<YearPicker
							artist={artist}
							setShows={setShows}
							year={year}
							setYear={setYear}
							clearYear={clearYear}
							date={date}
							setLoadingShows={setLoadingShows}
						/>
					)}
					{loadingShows && (
						<Box
							sx={{
								display: 'flex',
							}}
						>
							{/* <img
								src='/spinner.gif'
								alt='loading'
								height={'30px'}
								width={'30px'}
							/> */}
							<Image
								src='/spinner.gif'
								alt='loading'
								height={30}
								width={30}
							/>
							<Typography>Loading Shows...</Typography>
						</Box>
					)}
					{artist && shows && shows.length > 0 && !location && !date && (
						<Typography>Choose a show</Typography>
					)}
					{artist && shows && shows.length > 0 && (!location || !date) && (
						<ShowPicker
							show={show}
							shows={shows}
							setShow={setShow}
							setDate={setDate}
							setLocation={setLocation}
							setShowLocationInput={setShowLocationInput}
						/>
					)}
					{artist && !date && (
            <>
            <Typography my='1em'>{artist !== 'Squeaky Feet' ? 'Or' : ''}</Typography>
						<DatePicker
							setDate={setDate}
							my={'1em'}
							date={date}
							artist={artist}
						/>
            </>
					)}
					{date && (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Typography fontSize={18}>
								{new Date(date + 'T12:00:00Z').toLocaleDateString()}
							</Typography>
							<Button
								sx={{ textTransform: 'none' }}
								onClick={() => clearDate()}
							>
								Change Date
							</Button>
						</Box>
					)}
					{dateErrorText && (
						<Alert
							severity='success'
							sx={{ my: '1em' }}
						>
							{dateErrorText}
						</Alert>
					)}
					{versionExists && (
						<Box
							display='flex'
							justifyContent='center'
						>
							<RateVersion
								song={song}
								date={date}
								location={location}
								tags={tags}
								user={user}
								profile={profile}
								jam={jam}
								songs={songs}
							/>
						</Box>
					)}
					{location && (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Typography fontSize={18}>{location}</Typography>
							<Button
								sx={{ textTransform: 'none' }}
								onClick={() => changeLocation()}
							>
								Change Location
							</Button>
						</Box>
					)}
					{!versionExists &&
						((songExists && artist && date) || location || noSetlistFound) &&
						showLocationInput && (
							<Box
								mx='0.25em'
								my='1em'
							>
								<TextField
									autoFocus
									id='name'
									label='Location'
									type='text'
									fullWidth
									variant='standard'
									multiline
									maxRows={2}
									value={location}
									onChange={handleLocationChange}
								/>
							</Box>
						)}
					{locationErrorText && (
						<Alert
							severity='error'
							sx={{ my: '1em' }}
						>
							{locationErrorText}
						</Alert>
					)}
					{!versionExists &&
						song &&
						artist &&
						date &&
						location &&
						location.length > 2 && (
							<>
								<Typography my='1em'>Optional:</Typography>
								<TagPicker
									tagsSelected={tags}
									setTagsSelected={setTags}
									size={'normal'}
									my={'1em'}
									mx={0}
								/>
								{tagsText && <Typography my='1em'>{tagsText}</Typography>}
								<TextField
									sx={{ mb: '1em' }}
									// margin="dense"
									id='listen_link'
									label='Link (Relisten, YouTube)'
									type='text'
									fullWidth
									variant='standard'
									multiline
									maxRows={2}
									onChange={(e) => setListenLink(e.target.value)}
								/>
								<FormControl
									fullWidth
									sx={{ my: '1em' }}
								>
									<Stack>
										<InputLabel id='rating-select-label'>Rating</InputLabel>
										<Select
											size='normal'
											sx={{
												maxWidth: '100px',
											}}
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
										<TextField
											sx={{ mt: '1em', mx: '0.25em' }}
											id='comment'
											label='Comments'
											type='text'
											fullWidth
											variant='standard'
											multiline
											onChange={handleCommentChange}
										/>
									</Stack>
								</FormControl>
							</>
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
					{artist &&
						song &&
						date &&
						location &&
						location.length > 2 &&
						!dateErrorText &&
						!successAlertText && (
							<Button
								variant='contained'
								onClick={handleSubmit}
								disabled={loading || !user || !profile || !songExists}
								sx={{ textTransform: 'none' }}
							>
								Add this Jam
							</Button>
						)}
					<Button
						onClick={handleClose}
						sx={{ textTransform: 'none' }}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
