import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themes';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TopBar from '../components/AppBar';

export default function Privacy() {
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
				<TopBar showButton={false} />
				<Box
					sx={{
						flexDirection: 'column',
						display: 'flex',
						alignItems: 'center',
					}}
					mx='0.25em'
					my='2em'
					p='1em'
				>
					<h1>Privacy Policy</h1>
					<Typography>
						At nicejammin.com, we are committed to protecting the privacy of our
						users. <br />
						<br />
						1. We will not sell, rent, or give away your email address or any other
						personal information to any third party. <br />
						<br />
						2. We may occasionally send out emails with major update news or other
						important information related to our website. You have the option to
						unsubscribe from these emails at any time by clicking the
						unsubscribe link at the bottom of the email. <br />
						<br />
						3. We may use cookies and other tracking technologies to improve your
						browsing experience and to understand how users use our website. You
						can choose to disable cookies in your browser settings if you
						prefer. <br />
						<br />
						4. If you signed up with Google, we will store your email address to
						send occasional emails (see #2 above). We will not share your email address with
						any third party. <br />
						<br />
						If you have any questions or concerns about our privacy policy,
						please contact us at nicejammin@nicejammin.com
					</Typography>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
