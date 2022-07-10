import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import AdbIcon from '@mui/icons-material/Adb';
import { supabase } from '../utils/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'



export default function TopBar({ showButton, user, session, router }) {

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    } else {
      router.push('/')
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ maxWidth: '900px', mx:'auto', justifyContent: 'space-between' }}>
          <Stack direction="row" sx={{ flexGrow: 1 }}>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            {/* <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              >
              Nice Jammin
            </Typography> */}
            <Link href="/" passHref={true}>
            <Image
              alt="Nice Jammin Logo"
              src="/icon-circle.png"
              quality={100}
              priority
              width={45}
              height={45}
              component="a"
              href="/"
              />
            </Link>
            <Typography
            variant="h6"
            noWrap
            component="a"
            fontFamily="Helvetica Neue"
            href="/"
            sx={{
              mx: 2,
              display: { xs: 'flex' },
              flexGrow: 1,
              fontWeight: 400,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              my: 'auto'
            }}
            >
            Nice Jammin&apos;
          </Typography>

          </Stack>
          {showButton &&
          <Box>
            {!user &&
            <>
             <Button href="/signup" sx={{ bgcolor: 'third.main', textTransform: 'none', color: '#000000', borderRadius: '2em', '&:hover': { bgcolor: 'primary.bg' } }}>Sign Up</Button>
             <Button href="/login" sx={{ bgcolor: 'primary.main', textTransform: 'none', color: '#000000', borderRadius: '2em', '&:hover': { bgcolor: 'primary.bg' } }}>Sign In</Button>
            </>
            }
            {user &&
            <Button onClick={handleLogout} sx={{ bgcolor: 'primary.main', textTransform: 'none', color: '#000000', borderRadius: '2em', '&:hover': { bgcolor: 'primary.bg' } }}>Log out</Button>
          }
            </Box>
      }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
