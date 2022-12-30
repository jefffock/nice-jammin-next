import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { supabase } from "../utils/supabaseClient";
import Image from "next/image";

export default function TopBar({ showButton, user, session, router }) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      router.push("/");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            maxWidth: "900px",
            mx: "auto",
            justifyContent: "space-between"
          }}
        >
          <Stack direction="row" sx={{ flexGrow: 1 }}>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            {/* <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              >
              Nice Jammin
            </Typography> */}
            <Image
              alt="Nice Jammin Logo"
              src="/icon-circle.png"
              quality={100}
              priority
              width={45}
              height={45}
              component="a"
              href="/"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              fontFamily="Helvetica Neue"
              href="/"
              sx={{
                mx: 2,
                display: { xs: "flex" },
                flexGrow: 1,
                fontWeight: 400,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                my: "auto"
              }}
            >
              Nice Jammin&apos;
            </Typography>
          </Stack>
          {showButton && (
            <Box>
              {!user && (
                <>
                  <Button
                    href="/signup"
                    sx={{
                      bgcolor: "third.main",
                      textTransform: "none",
                      color: "#000000",
                      borderRadius: "2em",
                      "&:hover": { bgcolor: "primary.bg" }
                    }}
                    aria-label="sign up"
                  >
                    Sign Up
                  </Button>
                  <Button
                    href="/login"
                    sx={{
                      bgcolor: "primary.main",
                      textTransform: "none",
                      color: "#000000",
                      borderRadius: "2em",
                      "&:hover": { bgcolor: "primary.bg" }
                    }}
                    aria-label="sign in"
                  >
                    Sign In
                  </Button>
                </>
              )}
              {user && (
                <Button
                  onClick={handleLogout}
                  sx={{
                    bgcolor: "primary.main",
                    textTransform: "none",
                    color: "#000000",
                    borderRadius: "2em",
                    "&:hover": { bgcolor: "primary.bg" }
                  }}
                  aria-label="log out"
                >
                  Log out
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
