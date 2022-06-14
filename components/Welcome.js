import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

export default function Welcome() {

  return (
    <Box my="3em" mx="auto" px="0.5em" width="96vw" maxWidth="fit-content">
    <Typography variant="h4" textAlign="center">A new way to find great jams</Typography>
    <Typography variant="h6" textAlign="center">Tap a row to listen and rate</Typography>
    </Box>
  )
}