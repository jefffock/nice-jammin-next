import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

export default function Welcome() {

  return (
    <Box my="1em" mx="auto" px="0.5em" width="96vw" maxWidth="fit-content">
    <Typography variant="h5">Find your next favorite jam</Typography>
    <Typography>Use the filters below to narrow things down, then tap a row to listen to and rate it</Typography>
    </Box>
  )
}