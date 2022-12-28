import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Welcome() {
  return (
    <Box my="3em" mx="auto" px="0.5em" width="96vw" maxWidth="fit-content">
      <Typography textAlign="center" fontSize="22px" my="1em">
        So many jams, so little time:
        <br />
        Let's make 🔥 easier to find!
      </Typography>
      <Typography textAlign="center" fontSize="18px" my="1em">
        Click a row
        <br />
        Surrender to the flow
        <br />
        ❤️
      </Typography>
    </Box>
  );
}
