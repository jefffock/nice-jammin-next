import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themes';
import Box from '@mui/material/Box';

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
				<Box
					sx={{
						flexDirection: 'column',
						display: 'flex',
						alignItems: 'center',
					}}
					mx='0.25em'
					my='2em'
				>
					<h1>Privacy Policy</h1>
					<p>
						At nicejammin.com, we are committed to protecting the privacy of our
						users. <br />
						<br />
						We will not sell, rent, or give away your email address or any other
						personal information to any third party. <br />
						<br />
						We may occasionally send out emails with major update news or other
						important information related to our website. You have the option to
						unsubscribe from these emails at any time by clicking the
						unsubscribe link at the bottom of the email. <br />
						<br />
						We may use cookies and other tracking technologies to improve your
						browsing experience and to understand how users use our website. You
						can choose to disable cookies in your browser settings if you
						prefer. <br />
						<br />
						If you have any questions or concerns about our privacy policy,
						please contact us at nicejammin@nicejammin.com
					</p>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
