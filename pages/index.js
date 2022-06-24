import { supabase } from '../utils/supabaseClient'
import { ThemeProvider } from '@mui/material/styles';
import App from '../components/App.js'
import theme from '../styles/themes'

export default function Home({ jams, songs }) {
  return (
    <ThemeProvider theme={theme}>
      <App jams={jams} songs={songs} />
    </ThemeProvider>
  )
}

export async function getServerSideProps() {
  async function getJams() {
    const { data, error } = await supabase
      .from('versions')
      .select('*')
      // .gt('avg_rating', 0)
      .limit(10)
      .order('avg_rating', { ascending: false })
      .order('num_ratings', { ascending: false })
    if (error) {
      console.error(error)
    } else if (data) {
      return data
    }
  }

  // async function getSongs() {
  //   const { data, error } = await supabase
  //     .from('songs')
  //     .select('song', 'id')
  //     // .gt('avg_rating', 0)
  //     // .limit(100)
  //     .order('song', { ascending: true })
  //   if (error) {
  //     console.error(error)
  //   } else if (data) {
  //     return data
  //   }
  // }

  const [jams] = await Promise.all([
    getJams()
    // getSongs()
  ])
  return {
    props: { jams }
  }
}