import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SignIn from '../components/Login'
import theme from '../styles/themes'
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';


export default function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Box sx={{ mt:0, pt:0, width: '100vw', height: '100vh', bgcolor: 'white' }}>
      <SignIn />
    </Box>
  )
}