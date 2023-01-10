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
import Image from 'next/image';
import TopBar from '../components/AppBar';

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
			if (data.length === 0) {
				//create profile
				setShowAddUsername(true);
			}
			if (data.length > 0) {
				router.push('/');
			}
		}
		if (initialUser) {
			checkProfile(initialUser);
		}
		if (!initialUser) {
			const getUser = async () => {
				const {
					data: { user },
				} = await supabase.auth.getUser();
				return user;
			};
			getUser().then((user) => {
				if (user) {
					checkProfile(user);
				} else {
					router.push('/join');
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
			//check if user has a profile
			supabase.from('profiles').select('id').eq('id', user.id);
			supabase
				.from('profiles')
				.select('name')
				.eq('name', username)
				.then((res) => {
					if (res.data.length > 0) {
						setUsernameTaken(true);
					} else if (res.data.length === 0) {
						supabase
							.from('profiles')
							.insert([
								{
									id: initialUser.id,
									name: username,
								},
							])
							.then(() => {
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
					bgcolor: 'white',
					minHeight: '100vh',
					maxWidth: '100vw',
					overflow: 'hidden',
				}}
			>
				<TopBar showButton={false} />
				<Box
					sx={{
						flexDirection: 'column',
						display: 'flex',
						alignItems: 'center',
					}}
					mx='0.25em'
					my='2em'
				>
					<Typography
						fontSize={22}
						my='2em'
					>
						Welcome to Nice Jammin!
					</Typography>
					<Image
						alt='Nice Jammin Logo'
						src='/icon-circle.png'
						quality={100}
						priority
						width={75}
						height={75}
					/>
					<Typography
						fontSize={16}
						my='2em'
					>
						Choose a username to start contributing:
					</Typography>
					<TextField
						autoFocus={true}
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
						sx={{
							my: '2em',
						}}
						onClick={() => handleSubmit()}
						disabled={usernameTaken}
					>
						Submit
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
