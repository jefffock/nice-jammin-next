import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import RateVersion from './RateVersion';
import AddListenLink from './AddListenLink';
import ListenLink from './ListenLink';
import Comments from './Comments';
import { fetchComments, fetchSongs } from '../utils/fetchData';
import ReportIssue from './ReportIssue';

function JamsTableHead({ order, orderBy, onRequestSort, showRatings }) {
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	const headCellsWithRatings = [
		{
			id: 'song_name',
			numeric: false,
			disablePadding: false,
			label: 'Song',
		},
		{
			id: 'date',
			center: true,
			disablePadding: false,
			label: 'Date',
		},
		{
			id: 'avg_rating',
			center: true,
			disablePadding: false,
			label: 'Rating',
		},
		{
			id: 'artist',
			numeric: false,
			disablePadding: false,
			label: 'Band',
		},
		{
			id: 'arrow',
			numeric: false,
			disablePadding: true,
			label: 'arrow',
		},
	];

	const headCellsWithoutRatings = [
		{
			id: 'song_name',
			numeric: false,
			disablePadding: false,
			label: 'Song',
		},
		{
			id: 'date',
			// center: true,
			numeric: false,
			disablePadding: false,
			label: 'Date',
		},
		{
			id: 'artist',
			numeric: false,
			disablePadding: false,
			label: 'Band',
		},
		{
			id: 'arrow',
			numeric: false,
			disablePadding: true,
			label: 'arrow',
		},
	];

	return (
		<TableHead>
			<TableRow>
				{showRatings &&
					headCellsWithRatings.map((headCell) => (
						<TableCell
							sx={{ bgcolor: 'primary.main' }}
							key={headCell.id}
							align={headCell.center ? 'center' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'normal'}
							sortDirection={orderBy === headCell.id ? order : false}
							aria-hidden={headCell.label === 'arrow'}
							// visuallyHidden={headCell.label === "arrow"}
							focusable={headCell.id !== 'arrow'}
						>
							{headCell.id !== 'arrow' ? (
								<TableSortLabel
									active={orderBy === headCell.id}
									direction={orderBy === headCell.id ? order : 'asc'}
									onClick={createSortHandler(headCell.id)}
								>
									{headCell.label}
									{orderBy === headCell.id ? (
										<Box
											component='span'
											sx={visuallyHidden}
										>
											{order === 'desc'
												? 'sorted descending'
												: 'sorted ascending'}
										</Box>
									) : null}
								</TableSortLabel>
							) : null}
						</TableCell>
					))}
				{!showRatings &&
					headCellsWithoutRatings.map((headCell) => (
						<TableCell
							sx={{ bgcolor: 'primary.main' }}
							key={headCell.id}
							align={headCell.center ? 'center' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'normal'}
							sortDirection={orderBy === headCell.id ? order : false}
							aria-hidden={headCell.label === 'arrow'}
							// visuallyHidden={headCell.label === "arrow"}
							focusable={headCell.id !== 'arrow'}
						>
							{headCell.id !== 'arrow' ? (
								<TableSortLabel
									active={orderBy === headCell.id}
									direction={orderBy === headCell.id ? order : 'asc'}
									onClick={createSortHandler(headCell.id)}
								>
									{headCell.label}
									{orderBy === headCell.id ? (
										<Box
											component='span'
											sx={visuallyHidden}
										>
											{order === 'desc'
												? 'sorted descending'
												: 'sorted ascending'}
										</Box>
									) : null}
								</TableSortLabel>
							) : null}
						</TableCell>
					))}
			</TableRow>
		</TableHead>
	);
}

function Row({ row, user, profile, songs, showRatings }) {
	const [open, setOpen] = useState(false);
	const [tags, setTags] = useState('');
	const [comments, setComments] = useState(null);
	const [hasComments, setHasComments] = useState(false);

	useEffect(() => {
		let allTags = '';
		if (row.acoustic) {
			allTags += 'Acoustic, ';
		}
		if (row.ambient) {
			allTags += 'Ambient/Space, ';
		}
		if (row.bliss) {
			allTags += 'Bliss, ';
		}
		if (row.bluesy) {
			allTags += 'Bluesy, ';
		}
		if (row.chaotic) {
			allTags += 'Chaotic, ';
		}
		if (row.crunchy) {
			allTags += 'Crunchy, ';
		}
		if (row.dark) {
			allTags += 'Dark, ';
		}
		if (row.dissonant) {
			allTags += 'Dissonant, ';
		}
		if (row.fast) {
			allTags += 'Fast, ';
		}
		if (row.funky) {
			allTags += 'Funky, ';
		}
		if (row.grimy) {
			allTags += 'Grimy, ';
		}
		if (row.groovy) {
			allTags += 'Groovy, ';
		}
		if (row.guest) {
			allTags += 'Guest, ';
		}
		if (row.happy) {
			allTags += 'Happy, ';
		}
		if (row.heavy) {
			allTags += 'Heavy, ';
		}
		if (row.historic) {
			allTags += 'Historic, ';
		}
		if (row.jazzy) {
			allTags += 'Jazzy, ';
		}
		if (row.long) {
			allTags += 'Long, ';
		}
		if (row.low_key) {
			allTags += 'Low-key, ';
		}
		if (row.mellow) {
			allTags += 'Mellow, ';
		}
		if (row.melodic) {
			allTags += 'Melodic, ';
		}
		if (row.multi_part) {
			allTags += 'Multi-part, ';
		}
		if (row.official_release) {
			allTags += 'Official Release, ';
		}
		if (row.peaks) {
			allTags += 'Peaks, ';
		}
		if (row.reggae) {
			allTags += 'Reggae, ';
		}
		if (row.rocking) {
			allTags += 'Rocking, ';
		}
		if (row.segue) {
			allTags += 'Segue, ';
		}
		if (row.shred) {
			allTags += 'Shred, ';
		}
		if (row.silly) {
			allTags += 'Silly, ';
		}
		if (row.sloppy) {
			allTags += 'Sloppy, ';
		}
		if (row.slow) {
			allTags += 'Slow, ';
		}
		if (row.sludgy) {
			allTags += 'Sludgy, ';
		}
		if (row.soaring) {
			allTags += 'Soaring, ';
		}
		if (row.soulful) {
			allTags += 'Soulful, ';
		}
		if (row.stop_start) {
			allTags += 'Stop-start, ';
		}
		if (row.synthy) {
			allTags += 'Synthy, ';
		}
		if (row.tease) {
			allTags += 'Teases, ';
		}
		if (row.tension_release) {
			allTags += 'Tension and Release, ';
		}
		if (row.trance) {
			allTags += 'Trance, ';
		}
		if (row.trippy) {
			allTags += 'Trippy, ';
		}
		if (row.type2) {
			allTags += 'Type II, ';
		}
		if (row.unusual) {
			allTags += 'Unusual, ';
		}
		if (row.upbeat) {
			allTags += 'Upbeat, ';
		}
		let trimmed =
			allTags.length > 2 ? allTags.slice(0, allTags.length - 2) : '';
		setTags(trimmed);
	}, [row]);

	useEffect(() => {
		if (open && !comments) {
			async function getComments(versionId) {
				let newComments = await fetchComments(versionId);
				if (newComments && newComments !== null && newComments.length > 0) {
					for (var i = 0; i < newComments.length; i++) {
						if (newComments[i]?.comment?.length > 0) {
							setHasComments(true);
							break;
						}
					}
					setComments(newComments);
				}
			}
			getComments(row.id);
		}
	}, [open, comments, row]);

	const artist = row.artist;
	const song = row.song_name;

	return (
		<React.Fragment>
			<TableRow
				sx={{ '& > *': { borderBottom: 'unset' } }}
				onClick={() => setOpen(!open)}
			>
				<TableCell sx={{ maxWidth: '10px' }}>
					{song}
					{song === 'Ghost'
						? ' 👻'
						: song === 'Deal'
						? ' 🤝'
						: song === 'Fire on the Mountain'
						? ' 🔥⛰️'
						: song === "Wolfman's Brother" || song === 'Silver Rising'
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
						  song === 'Drowned' ||
						  song === 'The Squirming Coil' ||
              song === 'Ya Mar'
						? ' 🌊'
						: song === 'Split Open and Melt' || song === 'Maze'
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
						? ' 🥳'
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
						: song === 'The Other One' || song === "That's It for the Other One"
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
						: song === 'The Moma Dance' ||
						  song === "The Old Man's Boat" ||
						  song === 'Ship of Fools'
						? ' ⛵'
						: song === 'Wilson' || song === 'Prince Caspian'
						? ' 🤴'
						: song === 'Reba'
						? ' 🛍️🏷️'
						: song === 'Harry Hood'
						? ' 🥛'
						: song === 'Possum' || song === 'Windy Mountain'
						? ' ⛰️'
						: song === 'Dark Star'
						? ' 🌌'
						: song === 'Jack Straw'
						? ' 👩🍷'
						: song === 'The Music Never Stopped'
						? ' 🎶'
						: song === 'Playing in the Band' || song === 'Roggae'
						? ' 🌅'
						: song === "Truckin'"
						? ' 🚚'
						: song === 'After Midnight'
						? ' 🍑🍦'
						: song === 'Slipknot!'
						? ' 🪢'
						: song === 'Scarlet Begonias'
						? ' 🌺'
						: song === 'Midnite Moonlite'
						? ' 🌕'
						: song === 'Greatest Story Ever Told'
						? ' 🔧'
						: song === 'Carini'
						? ' 😵'
						: song === 'Space' ||
						  song === 'Also Sprach Zarathustra (2001)' ||
						  song === 'Beneath a Sea of Stars Part 1'
						? ' 🌌'
						: song === 'Drums'
						? ' 🥁'
						: song === 'AC/DC Bag'
						? ' 👜'
						: song === 'Brother'
						? ' 🛁'
						: song === 'Buried Alive'
						? ' 🪦'
						: song === 'Butter Rum'
						? ' 🧈🥃'
						: song === 'Candyman'
						? ' 🍭'
						: song === 'All I Need'
						? ' 🗝️'
						: song === 'Crosseyed and Painless'
						? ' 👁️👁️'
						: song === 'Dancing in the Streets' || song === "Mike's Song" || song === 'Weekapaug Groove' || song === "Mike's Groove"
						? ' 🕺💃'
						: song === 'Free'
						? ' 🛳️'
						: song.includes('Ice')
						? ' 🧊'
						: song === 'I Know You Rider'
						? ' 🏇'
						: song === 'Suzy Greenberg'
						? ' 👩‍🎨'
						: song === 'Stash'
						? ' 🧄'
						: song === 'Pancakes'
						? ' 🥞'
						: song === 'Hungersite'
						? ' 🕊️'
						: song === "No Men In No Man's Land"
						? ' 😃'
						: song === 'Backwards Down the Number Line'
						? ' 🎂'
            : song === 'The River'
            ? ' 🏞️'
            : song === "Ain't No Bread in the Breadbox"
            ? ' 🍞'
            : song === 'All Along the Watchtower'
            ? ' 🏰🏇🏇'
            : song === 'Yeti'
            ? ' ☃️'
            : song === 'Wysteria Lane'
            ? ' 🌿' //get hyacinth when supported
            : song === 'Twist'
            ? ' 🗣️'
            : song === 'Theme From the Bottom'
            ? ' 🐟'
            : song === 'The Horse'
            ? ' 🐴'
            : song === 'Makisupa Policeman'
            ? ' 👮'
            : song === 'David Bowie'
            ? ' ⚡'
            : song === 'Watercolor Days'
            ? ' 🖼️'
            : song === 'Ocelot'
            ? ' 🐈'
            : song === 'Scents and Subtle Sounds'
            ? ' 🌈'
            : song === 'Me and My Uncle' || song === 'El Paso' 
            ? ' 🤠'
						: ''}
				</TableCell>
				<TableCell sx={{ maxWidth: '10px' }}>{row.date}</TableCell>
				{showRatings && (
					<TableCell sx={{ maxWidth: '10px', textAlign: 'center' }}>
						{row.avg_rating}
					</TableCell>
				)}
				<TableCell sx={{ maxWidth: '10px' }}>
					{artist}
					{artist === 'Phish'
						? ' 🐟'
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
				</TableCell>
				<TableCell padding='none'>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse
						in={open}
						timeout='auto'
						unmountOnExit
					>
						<Box sx={{ m: '0.2em', maxWidth: '90vw' }}>
							{row.listen_link && (
								<ListenLink
									link={row.listen_link}
									jam={row}
								></ListenLink>
							)}
							{!row.listen_link && (
								<AddListenLink
									song={row.song_name}
									date={row.date}
									user={user}
									profile={profile}
									jam={row}
								/>
							)}
							{tags && <Typography>{tags}</Typography>}
							<Typography>{row.location}</Typography>
							<Typography>
								{row.num_ratings} rating{row.num_ratings === 1 ? '' : 's'}
							</Typography>
              {row?.submitter_name &&
							<Typography>Added by {row.submitter_name}. Thank you!</Typography>
              }
							<RateVersion
								song={row.song_name}
								date={row.date}
								location={row.location}
								tags={tags}
								user={user}
								profile={profile}
								jam={row}
								songs={songs}
							/>
							{hasComments && (
								<Comments
									song={row.song_name}
									date={row.date}
									location={row.location}
									comments={comments}
									user={user}
									profile={profile}
								/>
							)}
							<ReportIssue
								user={user}
								profile={profile}
								version={row.id}
							/>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default function CollapsibleTable({
	jams,
	sortedJams,
	sortJams,
	order,
	orderBy,
	setOrder,
	setOrderBy,
	user,
	profile,
	setUpdatedJams,
	setSongs,
	songs,
	showRatings,
}) {
	// const [orderedSongs, setOrderedSongs] = useState(null);
	// const [jamsFetched, setJamsFetched] = useState(false);
	// const [songsFetched, setSongsFetched] = useState(false);
	// const [fetchingJams, setFetchingJams] = useState(false);
	// const [fetchingSongs, setFetchingSongs] = useState(false);

	const handleRequestSort = (event, property) => {
		if (property === 'avg_rating' && orderBy !== 'avg_rating') {
			setOrder('desc');
		} else {
			const isAsc = orderBy === property && order === 'asc';
			setOrder(isAsc ? 'desc' : 'asc');
		}
		setOrderBy(property);
	};

	// function descendingComparator(a, b, orderBy) {
	//   if (b[orderBy] < a[orderBy]) {
	//     return -1;
	//   }
	//   if (b[orderBy] > a[orderBy]) {
	//     return 1;
	//   }
	//   return 0;
	// }

	// function getComparator(order, orderBy) {
	//   return order === 'desc'
	//     ? (a, b) => descendingComparator(a, b, orderBy)
	//     : (a, b) => -descendingComparator(a, b, orderBy);
	// }

	if (jams && jams.length > 0) {
		return (
			<>
				<TableContainer
					component={Paper}
					sx={{
						maxHeight: '55vh',
						overflowY: 'auto',
						width: '96vw',
						maxWidth: '900px',
						mx: 'auto',
						borderRadius: '1em',
					}}
				>
					<Table
						aria-label='jams table'
						stickyHeader
					>
						<JamsTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							showRatings={showRatings}
						/>
						<TableBody>
							{jams &&
								jams.map((jam) => (
									<Row
										key={jam.id}
										row={jam}
										user={user}
										profile={profile}
										songs={songs}
										showRatings={showRatings}
									/>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</>
		);
	} else {
		return (
			<Typography
				textAlign='center'
				fontSize='18px'
				m='1em'
			>
				No one has added a jam that matches those filters, yet!
			</Typography>
		);
	}
}
