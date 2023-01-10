import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function TopBar({
	showButton,
	session,
	user,
	router,
	setUser,
	setSession,
}) {

	const handleLogout = async () => {
		console.log('clicked logout');
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar
					disableGutters
					sx={{
						maxWidth: '900px',
						mx: 'auto',
						justifyContent: 'space-between',
					}}
				>
					<Stack
						direction='row'
						sx={{ flexGrow: 1 }}
					>
						<Image
							alt='Nice Jammin Logo'
							src='/icon-circle.png'
							quality={100}
							priority
							width={45}
							height={45}
							component='a'
							href='/'
						/>
						<Typography
							variant='h6'
							noWrap
							component='a'
							fontFamily='Helvetica Neue'
							href='/'
							sx={{
								mx: 2,
								display: { xs: 'flex' },
								flexGrow: 1,
								fontWeight: 400,
								letterSpacing: '.1rem',
								color: 'inherit',
								textDecoration: 'none',
								my: 'auto',
							}}
						>
							Nice Jammin&apos;
						</Typography>
					</Stack>
					{showButton && (
						<Box>
							{!user && (
								<>
									{/* <Button
                    href="/signup"
                    sx={{
                      bgcolor: "third.main",
                      textTransform: "none",
                      color: "#000000",
                      borderRadius: "2em",
                      "&:hover": { bgcolor: "primary.bg" }
                    }}
                  >
                    Sign Up
                  </Button> */}
									<Button
										href='/login'
										sx={{
											bgcolor: 'primary.main',
											textTransform: 'none',
											color: '#000000',
											borderRadius: '2em',
											'&:hover': { bgcolor: 'primary.bg' },
										}}
									>
										Sign In
									</Button>
								</>
							)}
							{user && (
								<Button
									onClick={handleLogout}
									sx={{
										bgcolor: 'primary.main',
										textTransform: 'none',
										color: '#000000',
										borderRadius: '2em',
										'&:hover': { bgcolor: 'primary.bg' },
									}}
								>
									Log out
								</Button>
							)}
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
