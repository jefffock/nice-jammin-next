import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (email, password) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) {
        throw error
      } else {
        //redirect to home
      }
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1>Login</h1>
      <TextField label="Email"
        onChange={e => setEmail(e.target.value)}/><br/><br/>
      <TextField label="Password"
        onChange={e => setPassword(e.target.value)}/><br/><br/>
      <Button disabled={loading}
        onClick={() => { handleLogin() }}
        variant="contained"
        color="success">Log In</Button>
    </>
  )
}