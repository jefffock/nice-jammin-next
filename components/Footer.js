import Typography from '@mui/material/Typography';
import ReportIssue from './ReportIssue';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import Box from '@mui/material/Box';

export default function Footer({ profile, user }) {
	return (
		<Stack
			spacing={2}
			sx={{ m: '2em', display: 'flex', alignItems: 'center' }}
		>
			{profile && profile.points && (
				<>
					<Typography textAlign={'center'}>
						Hi {profile.name} 👋<br/>Thank you for contributing 🙏 You have {profile.points} points.
					</Typography>
					<Link href={`/fans/${profile.name}`}>View your contributions</Link>
				</>
			)}
			<ReportIssue
				user={user}
				profile={profile}
				version={null}
			/>
			<Box display={'flex'}>
				<Link href='/terms'>
					<Typography fontSize={12}>Terms of Service</Typography>
				</Link>
				<pre>  </pre>
				<Link href='/privacy'>
					<Typography fontSize={12}>Privacy Policy</Typography>
				</Link>
			</Box>
		</Stack>
	);
}
