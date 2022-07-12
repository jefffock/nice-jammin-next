import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

export default function Gratitude() {

  return (
    <Box bgcolor="primary.main" minHeight="100px" my="1em">
      <Box my="auto" mx="auto" px="0.5em" width="96vw" maxWidth="fit-content" py="3em">
        <Typography sx={{ fontSize:'30px'}} textAlign="center" mb="1em">Thank you!</Typography>
        <Typography sx={{ fontSize:'18px', maxWidth: '1000px'}} textAlign="center">Artists, crew, staff, tapers, fans, and everyone else - thank you for playing your part in creating and sharing this music.</Typography>
        <Typography sx={{ fontSize:'18px', mt: '1em', maxWidth: '1000px'}} textAlign="center">Contributors - thank you for sharing your love for this music, helping it reach new ears and hearts.</Typography>
      </Box>
    </Box>
  )
}