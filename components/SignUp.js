import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TopBar from './AppBar';
import theme from '../styles/themes';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import { supabase } from '../utils/supabaseClient';
import GoogleButton from 'react-google-button';

// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function SignUp({ setSession }) {
	const [checked, setChecked] = useState(false);
	const [loading, setLoading] = useState(false);
	const [usernameErrorText, setUsernameErrorText] = useState('');
	const [passwordErrorText, setPasswordErrorText] = useState('');
	const [emailErrorText, setEmailErrorText] = useState('');
	const [successText, setSuccessText] = useState('');
	const router = useRouter();

	const handleCheck = () => {
		setChecked(!checked);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setUsernameErrorText(null);
		setPasswordErrorText(null);
		setEmailErrorText(null);
		setSuccessText(null);
		const data = new FormData(event.currentTarget);
		const email = data.get('email');
		const password = data.get('password');
		const username = data.get('username');
		const isValid = await validateSignUp(email, password, username);
		if (isValid) {
			await signUpWithEmail(email, password, username);
		}
		setLoading(false);
	};

	async function validateSignUp(email, password, username) {
		if (username.length < 1) {
			setUsernameErrorText(
				'Although a blank username would be super cool, it needs to be at least 1 character. Thank you for understanding.'
			);
			setLoading(false);
			return false;
		}
		if (username.length > 20) {
			setUsernameErrorText('Maximum username length: 20 characters');
			setLoading(false);
			return false;
		}
		if (!password) {
			setPasswordErrorText('Password is required');
			setLoading(false);
			return false;
		}
		if (password.length < 6) {
			setPasswordErrorText('Minimum password length: 6 characters');
			setLoading(false);
			return false;
		}
		if (!email) {
			setEmailErrorText('Email is required');
			setLoading(false);
			return false;
		}
		const { data, error } = await supabase
			.from('profiles')
			.select('name')
			.eq('name', username);
		if (error) {
			console.error(error);
			setLoading(false);
			setUsernameErrorText(
				'Something went wrong, sorry about that! Please refresh the page and try again'
			);
			return false;
		}
		if (data.length > 0) {
			setUsernameErrorText(
				'Someone else already has that username. Please choose another.'
			);
			setLoading(false);
			return false;
		}
		return true;
	}

	async function signUpWithEmail(email, password, username) {
		const { user, session, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});
		if (error) {
			console.error('sign up error', error);
		} else {
			await createProfile(username, user);
		}
	}

	async function createProfile(username, user) {
		const { error } = await supabase
			.from('profiles')
			.insert([{ name: username, id: user.id }]);
		if (error) {
			console.error('create profile error', error);
		} else {
			setLoading(false);
			router.push('/');
		}
	}

	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: 'https://nicejammin.com/welcome',
			},
		});
		if (error) {
			console.error('sign in with google error', error);
		} else {
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					mt: 0,
					pt: 0,
					width: '100vw',
					height: '100vh',
					bgcolor: 'white',
          overflow: 'scroll'
				}}
			>
				<TopBar showButton={false} />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						maxWidth: '400px',
						mx: 'auto',
						p: '1em',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography
						component='h1'
						variant='h5'
					>
						Sign up
					</Typography>
					<Box
						mx={'auto'}
						my={'2em'}
					>
						<GoogleButton onClick={() => signInWithGoogle()} />
					</Box>
					<Typography mt={'1em'}>Or</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								xs={12}
							>
								<TextField
									required
									fullWidth
									id='username'
									label='Username'
									name='username'
									autoComplete='user-name'
								/>
							</Grid>
							{usernameErrorText && (
								<Alert
									severity='error'
									sx={{ mt: '0.5em', mb: '1em', mx: 'auto' }}
								>
									{usernameErrorText}
								</Alert>
							)}
							<Grid
								item
								xs={12}
							>
								<TextField
									required
									fullWidth
									name='password'
									label='Password'
									type={checked ? 'text' : 'password'}
									id='password'
									autoComplete='new-password'
								/>
							</Grid>
							{passwordErrorText && (
								<Alert
									severity='error'
									sx={{ mt: '0.5em', mb: '1em', mx: 'auto' }}
								>
									{passwordErrorText}
								</Alert>
							)}
							<Grid
								item
								xs={12}
							>
								<TextField
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
								/>
							</Grid>
							{emailErrorText && (
								<Alert
									severity='error'
									sx={{ mt: '0.5em', mb: '1em', mx: 'auto' }}
								>
									{emailErrorText}
								</Alert>
							)}
							<Grid
								item
								xs={12}
							>
								<FormControlLabel
									control={
										<Checkbox
											value={checked}
											onChange={handleCheck}
											color='primary'
										/>
									}
									label='Show Password'
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							disabled={loading}
							sx={{ mt: 3, mb: 2, borderRadius: '3em', textTransform: 'none' }}
						>
							Sign Up
						</Button>
						{successText && (
							<Alert
								severity='success'
								sx={{ mt: '0.5em', mb: '1em', mx: 'auto' }}
							>
								{successText}
							</Alert>
						)}
						<Grid
							container
							justifyContent='flex-end'
						>
							<Grid item>
								<Link
									href='/login'
									variant='body2'
								>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
            <Box mt='2em'>
              <Typography>
                By signing up, you agree to our <Link href='/terms'>Terms of Service</Link> and <Link href='/privacy'>Privacy Policy</Link>
              </Typography>
            </Box>
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
