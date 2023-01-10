import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themes';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Terms() {
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
					<h1>Terms of Service</h1>
					<Typography>
						By using nicejammin.com, you agree to the following terms of
						service: <br />
						<br />
						1. Community Resource: This site is a community resource, and we are
						grateful for your contribution by adding ratings, jams, and ideas.
						<br />
						<br />
						2. Accuracy of Information: You agree to provide accurate
						information when adding a jam to the website. This includes the
						title, date, artist, and any other relevant details. <br />
						<br />
						3. Civil Discourse: You agree to be respectful and civil in the
						comments section of the website. This includes refraining from using
						language or making comments that are offensive, inappropriate, or
						inflammatory. If the community deems specific comments to be in
						violation of this rule, they may be hidden by default. <br />
						<br />
						4. Use of Website: You agree to use the website only for lawful
						purposes and in a manner that does not disrupt or interfere with the
						operation of the website. <br />
						<br />
						5. Data Use: You are free to use the data on the website, including
						but not limited to the jams and comments, for any purpose. <br />
						<br />
						6. Changes to Terms of Service: nicejammin.com reserves the right to
						update and change these terms of service at any time without notice.
						<br />
						<br />
						7. Love and Gratitude: We are all here because we love this music.
						Let&apos;s approach our use of the website with love and gratitude.
						<br />
						<br />
						If you have any questions or concerns about these terms of service,
						please contact us at nicejammin@nicejammin.com
					</Typography>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
