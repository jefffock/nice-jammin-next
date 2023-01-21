import { useState, useEffect } from 'react';
import ArtistPicker from './ArtistPicker';
import TagPicker from './TagPicker';
import DateFilter from './DateFilter';
import SongPicker from './SongPicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sorter from './Sorter';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import JamLimitPicker from './JamLimitPicker';
import { on } from 'process';

export default function FilterBar({
	setDates,
	setArtist,
	tagsSelected,
	setTagsSelected,
	artist,
	beforeDate,
	setBeforeDate,
	afterDate,
	setAfterDate,
	song,
	setSong,
	songs,
	order,
	orderBy,
	setOrderBy,
	setOrder,
	showRatings,
	handleShowRatingsChange,
	jams,
	showListenable,
	setShowListenable,
	limit,
	setLimit,
	lowerFilterBar,
	fullUrl,
	showMoreFilters,
	setShowMoreFilters,
}) {
	useEffect(() => {
		if (!(fullUrl === '/' || fullUrl === '/jams')) {
      let showMoreLocal = JSON.parse(window.localStorage.getItem('njShowMoreFilters'))
			if (!showMoreFilters && showMoreLocal) {
				setShowMoreFilters(showMoreLocal)
			}
		}
	}, []);

	function handleListenableChange(e) {
		setShowListenable(e.target.checked);
	}

	function handleShowMoreChange() {
		window.localStorage.setItem(
			'njShowMoreFilters',
			JSON.stringify(!showMoreFilters)
		);
		setShowMoreFilters(!showMoreFilters);
	}
  const noFilters = !artist && !song && !tagsSelected.length && !beforeDate && !afterDate;
	return (
		<Box sx={{ mx: '0.5em', mt:'1em' }}>
			<Box
				sx={{
					bgcolor: 'white',
					width: 'fit-content',
					mx: 'auto',
					borderRadius: '.5em',
					p: '0.3em',
					boxShadow: 1,
				}}
			>
				{lowerFilterBar && (
					<Typography
						textAlign='center'
						fontSize={24}
						sx={{ mt: '1em', mx: '1em' }}
					>
						Want to see another list?
					</Typography>
				)}
				<Typography
					textAlign='center'
					fontSize={20}
					sx={{ mt: '1em', mx: '1em' }}
				>
					1. Choose what you want to hear:
				</Typography>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flexWrap: 'wrap',
						alignItems: 'center',
						mx: 'auto',
						mt: '0.5em',
						justifyContent: 'center',
						bgcolor: 'white',
						borderRadius: '0.25em',
						width: 'fit-content',
						p: '0.3em',
					}}
				>
					<TagPicker
						tagsSelected={tagsSelected}
						setTagsSelected={setTagsSelected}
					/>
				</Box>
				<Typography
					textAlign={'center'}
					fontSize={16}
					color='gray'
					sx={{
						'&:hover': {
							color: 'black',
						},
					}}
					onClick={handleShowMoreChange}
				>
					{showMoreFilters ? '✌️ Less' : '⚙️ More'}
				</Typography>
				{showMoreFilters && (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							flexWrap: 'wrap',
							alignItems: 'center',
							mx: 'auto',
							mt: '0.1em',
							justifyContent: 'center',
							bgcolor: 'white',
							borderRadius: '0.25em',
							width: 'fit-content',
							p: '0.3em',
						}}
					>
						<ArtistPicker
							setArtist={setArtist}
							artist={artist}
						/>
						<SongPicker
							songs={songs}
							setSong={setSong}
							song={song}
							size={'small'}
							artist={artist}
						/>
						<DateFilter
							before={false}
							afterDate={afterDate}
							setAfterDate={setAfterDate}
						/>
						<DateFilter
							before={true}
							beforeDate={beforeDate}
							setBeforeDate={setBeforeDate}
						/>
						<JamLimitPicker
							limit={limit}
							setLimit={setLimit}
						/>
						<Sorter
							orderBy={orderBy}
							setOrderBy={setOrderBy}
							setOrder={setOrder}
							order={order}
						/>
						<FormControl sx={{ display: 'flex', alignItems: 'center' }}>
							<FormControlLabel
								control={
									<Checkbox
										checked={showRatings}
										onChange={handleShowRatingsChange}
									/>
								}
								label='Show ratings in table'
							/>
						</FormControl>
						<FormControl sx={{ display: 'flex', alignItems: 'center' }}>
							<FormControlLabel
								control={
									<Checkbox
										checked={showListenable}
										onChange={handleListenableChange}
									/>
								}
								label='Only show jams with links'
							/>
						</FormControl>
					</Box>
				)}
				{jams && (
					<>
						<Typography
							textAlign='center'
							fontSize='20px'
							m='.5em'
						>
							{lowerFilterBar
								? '2. Scroll up and click a row'
								: '2. Click a row'}
						</Typography>
						<Typography
							textAlign='center'
							fontSize='20px'
							m='.5em'
						>
							3. Listen, comment, and be merry!
							<br />
							❤️
						</Typography>
					</>
				)}
			</Box>
		</Box>
	);
}
