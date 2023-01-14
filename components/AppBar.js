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
import Link from 'next/link';
import { setPriority } from 'os';

export default function TopBar({
	showButton,
	session,
	user,
  setUser,
  setProfile,
	router,
	setSession,
}) {

	const handleLogout = async () => {
    console.log('logging out')
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
      setUser(null)
      setProfile(null)
      router.push('/')
    }
	};

  useEffect(() => {
    console.log('user in app bar', user)
  })

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
            <Link href='/'>
						<Image
							alt='Nice Jammin Logo'
							src='/icon-circle.png'
							quality={100}
							priority
							width={45}
							height={45}
						/>
            </Link>
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
