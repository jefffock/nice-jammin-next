import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Box from '@mui/material/Box';
import { router } from 'next/router';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themes';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export default function Welcome({ initialSession, initialUser }) {
	const [username, setUsername] = useState('');
	const [usernameTaken, setUsernameTaken] = useState(false);
  const router = useRouter();
	//check if profile exists
	useEffect(() => {
		async function checkProfile(user) {
			const { data, error } = await supabase
				.from('profiles')
				.select('id')
				.eq('id', user.id);
			if (error) {
				console.error(error);
			}
			console.log('data in checkProfile', data);
			if (data.length === 0) {
				console.log('setting showAddUsername to true');
				//create profile
				setShowAddUsername(true);
			}
			if (data.length > 0) {
				router.push('/');
			}
			if (initialUser) {
				checkProfile(initialUser);
			}
		}
		if (!initialUser) {
			console.log('getting user');
			const getUser = async () => {
				const {
					data: { user },
				} = await supabase.auth.getUser();
				console.log('user if not initial', user);
				return user;
			};
			getUser().then((user) => {
				if (user) {
					console.log('user before checkProfile', user);
					checkProfile(user);
				} else {
					console.log('no user');
					router.push('/');
				}
			});
		}
	}, []);

	function handelUsernameChange(e) {
		setUsernameTaken(false);
		setUsername(e.target.value);
	}

	async function handleSubmit() {
		//check if username is taken
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			console.log('user', user);
      //check if user has a profile
      supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
			supabase
				.from('profiles')
				.select('name')
				.eq('name', username)
				.then((res) => {
					if (res.data.length > 0) {
						console.log('username taken');
						setUsernameTaken(true);
					} else if (res.data.length === 0) {
						console.log('username not taken');
						console.log('submitting');
						supabase
							.from('profiles')
							.insert([
								{
									id: initialUser.id,
									name: username,
								},
							])
							.then((res) => {
								console.log(res);
								router.push('/');
							});
					}
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			console.log('no user');
			router.push('/join');
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					bgcolor: 'primary.graybg',
					minHeight: '100vh',
					maxWidth: '100vw',
					overflow: 'hidden',
				}}
			>
				<Box
					sx={{
						flexDirection: 'column',
						display: 'flex',
						alignItems: 'center',
					}}
					mx='0.25em'
					my='2em'
				>
					<Typography my='2em'>Welcome</Typography>
					<Typography my='2em'>Choose a username</Typography>
					<img src='/public/icon-circle.png'></img>
					<TextField
						autoFocus
						my='2em'
						id='name'
						label='Username'
						type='text'
						variant='standard'
						value={username}
						onChange={(e) => handelUsernameChange(e)}
					/>
					{usernameTaken && <Typography my='2em'>Username taken</Typography>}
					<Button
						my='2em'
						onClick={() => handleSubmit()}
						disabled={usernameTaken}
					>
						<Typography>Submit</Typography>
					</Button>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export const getServerSideProps = async (ctx) => {
	const supabase = createServerSupabaseClient(ctx);
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return {
		props: {
			initialSession: session ?? null,
			initialUser: session?.user ?? null,
		},
	};
};
