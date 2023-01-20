import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function DatePicker({ setDate, my, date, artist }) {
	const [value, setValue] = useState('');
	const [dateInput, setDateInput] = useState('');
	const [dateInputError, setDateInputError] = useState(false);
	const [dateErrorText, setDateErrorText] = useState('');

	useEffect(() => {
		if (!date) {
			setDateInput(null);
		}
	}, [date]);

	const handleDateInputChange = (e) => {
		setDateInput(e.target.value);
    let dateInput = e.target.value;
		if (dateInput.length === 8) {
			let month = dateInput.slice(0, 2);
			let day = dateInput.slice(2, 4);
			let year = dateInput.slice(4, 8);
			let date = new Date(year, month - 1, day);
			if (date.toString() === 'Invalid Date') {
				setdateInputError(true);
				setDateErrorText('Just numbers, please');
			} else {
				setDateInputError(false);
				setDateErrorText('');
				setDate(date.toJSON().slice(0, 10));
			}
		}
	};

	return (
		<Box
			my={my ? my : '0.5em'}
		>
      <Typography>Add a date{ artist !== 'Squeaky Feet' ? ' to see the setlist' : ''}</Typography>
			<Typography fontSize={12}>MMDDYYYY format</Typography>
			<TextField
				margin='dense'
				id='date'
				label='Date'
				type='text'
				// fullWidth
				value={dateInput}
				variant='standard'
				onChange={handleDateInputChange}
				error={dateInputError}
				helperText={dateInputError ? dateErrorText : ''}
			/>
		</Box>
	);
}
