import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

export default function Welcome() {

  return (
    <Box my="3em" mx="auto" px="0.5em" width="96vw" maxWidth="fit-content">
    <Typography textAlign="center" fontSize="28px" my="1em">1. Use the filters below to change the list of jams</Typography>
    <Typography textAlign="center" fontSize="28px" my="1em">2. Click a jam to reveal the Listen and Rate buttons</Typography>
    <Typography textAlign="center" fontSize="28px" my="1em">3. Listen, dance, and enjoy!</Typography>
    </Box>
  )
}