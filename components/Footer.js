import Typography from '@mui/material/Typography';
import ReportIssue from './ReportIssue';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Footer({ profile, user }) {
	return (
		<Stack
			spacing={2}
			sx={{ m: '2em', display: 'flex', alignItems: 'center' }}
		>
			{profile && profile.points && (
				<>
					<Typography>
						{profile.name}&nbsp;-&nbsp;{profile.points} points. Thank you!
					</Typography>
					<Link href={`/fans/${profile.name}`}>
						<Button sx={{textTransform: 'none'}}>View your contributions</Button>
					</Link>
				</>
			)}
			<ReportIssue
				user={user}
				profile={profile}
				version={null}
			/>
		</Stack>
	);
}
