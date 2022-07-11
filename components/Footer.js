import Typography from '@mui/material/Typography';
import ReportIssue from './ReportIssue'
import Stack from '@mui/material/Stack'


export default function Footer({ profile, user }) {

  return (
    <Stack spacing={2} sx={{ m:'2em', display: 'flex', alignItems: 'center'}}>
    {profile && profile.points &&
      <Typography>{profile.name}&nbsp;-&nbsp;{profile.points} points. Thank you!</Typography>
    }
    <ReportIssue user={user} profile={profile} version={null}/>
    </Stack>
  )
}