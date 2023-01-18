import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function DatePicker({ setDate, my, date }) {
	const [value, setValue] = useState('');
	const [dateInput, setDateInput] = useState('');
	const [dateInputError, setDateInputError] = useState(false);
	const [dateErrorText, setDateErrorText] = useState('');

	const handleChange = (newValue) => {
		if (newValue) {
			setValue(newValue);
			let stringedDate = newValue.toJSON().slice(0, 10);
			setDate(stringedDate);
		}
	};

	useEffect(() => {
		if (!date) {
			setValue(null);
		}
	});

	const handleDateInputChange = (e) => {
		setDateInput(e.target.value);
    let dateInput = e.target.value;
		let dateInputError = false;
		let dateErrorText = '';
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
				setValue(date);
				setDate(date.toJSON().slice(0, 10));
			}
		}
	};

	return (
		<Box
			my={my ? my : '0.5em'}
		>
      <Typography>Add a date to see the setlist</Typography>
			<Typography fontSize={12}>MMDDYYYY format</Typography>
			<TextField
				autoFocus
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
			{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
				<MobileDatePicker
					label='Date'
					inputFormat='MM/dd/yyyy'
					value={value}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider> */}
		</Box>
	);
}
