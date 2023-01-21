import SignIn from '../components/Login'
import Box from '@mui/material/Box';


export default function Login() {

  return (
    <Box sx={{ mt:0, pt:0, width: '100vw', height: '100vh', bgcolor: 'white' }}>
      <SignIn showTopBar={true}/>
    </Box>
  )
}