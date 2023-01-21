import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import TopBar from './AppBar';
import theme from '../styles/themes';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import { supabase } from '../utils/supabaseClient';
import GoogleButton from 'react-google-button';
import Stack from '@mui/material/Stack';

export default function SignUp({ setSession }) {
	const [checked, setChecked] = useState(false);
	const [loading, setLoading] = useState(false);
	const [usernameErrorText, setUsernameErrorText] = useState('');
	const [passwordErrorText, setPasswordErrorText] = useState('');
	const [emailErrorText, setEmailErrorText] = useState('');
	const [successText, setSuccessText] = useState('');
	const [magicLinkSuccessText, setMagicLinkSuccessText] = useState('');
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
		let isValid;
		if (email && !password) {
			isValid = validateSignUp(email, '123456');
			if (isValid) {
				await signInWithEmail(email, password);
			}
		} else if (email && password) {
			isValid = validateSignUp(email, password);
			if (isValid) {
				await signUpWithEmail(email);
			}
		}
		setLoading(false);
	};

	async function validateSignUp(email, password) {
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
		return true;
	}

	async function signUpWithEmail(email, password, username) {
		const { user, session, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});
		if (error) {
			console.error('Sign up error :( contact hi@jam.fans for help', error);
		} else {
			setSuccessText(
				`Success! Check ${email} for a confirmation link sent from hi@jam.fans. Welcome to Jam Fans, we're looking forward to your contributions!`
			);
		}
	}

	async function signInWithEmail(email) {
		const { data, error } = await supabase.auth.signInWithOtp({
			email: email,
		});
		if (error) {
			console.error(
				'Sign in error :( contact hi@jam.fans or @jeffphox on Twitter for support',
				error
			);
		} else {
			setMagicLinkSuccessText(
				`Success! Check ${email} for a confirmation link sent from hi@jam.fans. Welcome to Jam Fans, we're looking forward to your contributions!`
			);
		}
	}

	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: 'https://www.jam.fans/welcome',
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
					overflow: 'scroll',
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
					<Typography>Want to use your email?</Typography>
					<Stack
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{
							mt: 3,
							display: 'flex',
							direction: 'column',
							alignItems: 'center',
						}}
					>
						<TextField
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
						/>
						{emailErrorText && (
							<Alert
								severity='error'
								sx={{ mt: '0.5em', mb: '1em', mx: 'auto' }}
							>
								{emailErrorText}
							</Alert>
						)}
						<Button
							type='submit'
							// fullWidth
							variant='contained'
							disabled={loading}
							sx={{
								mt: 3,
								mb: 2,
								borderRadius: '3em',
								textTransform: 'none',
							}}
						>
							Sign Up with a Magic Link - no password!
						</Button>
						{magicLinkSuccessText && (
							<Alert
								severity='success'
								sx={{ mt: '0.5em', mb: '1em', mx: 'auto' }}
							>
								{magicLinkSuccessText}
							</Alert>
						)}
						<Typography
							sx={{
								textAlign: 'center',
								mt: '2em',
								mb: '1em',
							}}
						>
							Want to use a password instead of a magic link?
						</Typography>
						<TextField
							required
							fullWidth
							name='password'
							label='Password'
							type={checked ? 'text' : 'password'}
							id='password'
							autoComplete='new-password'
						/>
						{passwordErrorText && (
							<Alert
								severity='error'
								sx={{ mt: '0.5em', mb: '1em', mx: 'auto' }}
							>
								{passwordErrorText}
							</Alert>
						)}
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
						<Button
							type='submit'
							// fullWidth
							variant='contained'
							disabled={loading}
							sx={{ mt: 3, mb: 2, borderRadius: '3em', textTransform: 'none' }}
						>
							Sign Up with Email and Password
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
								By signing up, you agree to our{' '}
								<Link href='/terms'>Terms of Service</Link> and{' '}
								<Link href='/privacy'>Privacy Policy</Link>
							</Typography>
						</Box>
					</Stack>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
