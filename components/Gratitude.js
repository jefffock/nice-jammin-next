import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

export default function Gratitude() {

  return (
    <Box bgcolor="primary.main" minHeight="100px" my="1em">
      <Box my="auto" mx="auto" px="0.5em" width="96vw" maxWidth="fit-content" py="3em">
        <Typography variant="h4" textAlign="center">Thank you</Typography>
        <Typography variant="h6" textAlign="center">Artists, crew, staff, tapers, fans, and everyone else - thank you for playing your part in creating and sharing this music.</Typography>
      </Box>
    </Box>
  )
}