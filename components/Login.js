import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themes';
import TopBar from './AppBar';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Alert from '@mui/material/Alert';
import GoogleButton from 'react-google-button';
import Stack from '@mui/material/Stack';

export default function SignIn({ showTopBar }) {
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [magicLinkSuccessText, setMagicLinkSuccessText] = useState('');
  const [passwordResetSuccessText, setPasswordResetSuccessText] = useState('');
	const [email, setEmail] = useState('');
	const router = useRouter();

	const handleSubmit = async (event) => {
		setErrorMessage(null);
		event.preventDefault();
		setLoading(true);
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email');
		const password = formData.get('password');
		if (email && !password) {
			await signInWithEmail(email);
		} else if (email && password) {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			});
			if (error) {
				setLoading(false);
				console.error('error:', error);
				setErrorMessage(error.message);
			} else {
				setLoading(false);
				router.push('/');
			}
		}
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

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
			setMagicLinkSuccessText(`Success! Check ${email} for your magic link!`);
		}
	}

	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
		});
		if (error) {
			console.error('sign in with google error', error);
		} else {
		}
	}

	async function handlePasswordReset() {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      console.error('error', error);
    } else {
      setPasswordResetSuccessText(`Success! Check ${email} for your password reset link!`);
    }
	}

	return (
		<ThemeProvider theme={theme}>
			{showTopBar && <TopBar showButton={false} />}
			<Container
				component='main'
				maxWidth='xs'
				bgcolor='white'
				width='100vw'
				height='100vh'
			>
				<CssBaseline />
				<Box
					sx={{
						mt: `${showTopBar ? 8 : 0}`,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						bgcolor: 'white',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography
						component='h1'
						variant='h5'
					>
						Sign in
					</Typography>
					<Box
						mx={'auto'}
						my={'2em'}
					>
						<GoogleButton onClick={() => signInWithGoogle()} />
					</Box>
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
						<Typography>Signed up with a magic link?</Typography>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							onChange={(e) => handleEmailChange(e)}
						/>
						<Button
							type='submit'
							// fullWidth
							variant='contained'
							disabled={loading}
							sx={{
								mt: '1em',
								mb: '3em',
								borderRadius: '3em',
								textTransform: 'none',
							}}
						>
							Sign In with Magic Link
						</Button>
						{magicLinkSuccessText && (
							<Alert severity='success'>{magicLinkSuccessText}</Alert>
						)}
						<Typography
							sx={{
								textAlign: 'center',
								mt: '1em',
								mb: '1em',
							}}
						>
							Signed up with email and password? Add your email above, then your
							password below.
						</Typography>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						{/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
						{errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
						<Button
							type='submit'
							// fullWidth
							variant='contained'
							disabled={loading}
							sx={{ mt: 3, mb: 2, borderRadius: '3em', textTransform: 'none' }}
						>
							Sign In with Email and Password
						</Button>
						<Link
							href='/join'
							variant='body2'
						>
							{"Don't have an account? Sign Up"}
						</Link>
						<Button
							onClick={handlePasswordReset}
							sx={{
								textTransform: 'none',
							}}
						>
							{'Forgot password? Enter email above, then click here.'}
						</Button>
            {passwordResetSuccessText && (
              <Alert severity='success'>{passwordResetSuccessText}</Alert>
            )}
					</Stack>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
