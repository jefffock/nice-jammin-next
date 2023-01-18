import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';

export default function ShowPicker({
	show,
	shows,
	setShow,
	setDate,
	setLocation,
	size,
	my,
  setShowLocationInput,
}) {
	const handleChange = (event) => {
		setShow(event.target.value);
		setDate(event.target.value.showdate);
		setLocation(event.target.value.location);
    setShowLocationInput(false)
	};

	return (
		<Box my='.4em'>
			<FormControl sx={{ minWidth: 120 }}>
				<InputLabel id='show-select'>Show</InputLabel>
				<Select
					labelId='show-select'
					value={show}
					label='Show'
					onChange={handleChange}
					MenuProps={{ PaperProps: { sx: { maxHeight: '80vh' } } }}
				>
					{shows.map((show, index) => {
						const label =
							(show.isjamchart === '1' ? '☆ ' : '') +
							(show.alreadyAdded ? '(Added) ' : '') +
							show.label;
						return (
							<MenuItem
								key={index}
								value={show}
								sx={{ whiteSpace: 'normal' }}
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
