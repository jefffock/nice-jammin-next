import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const router = useRouter()
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} key={router.asPath}/>
      <Analytics />
    </SessionContextProvider>
  )
}

export default MyApp