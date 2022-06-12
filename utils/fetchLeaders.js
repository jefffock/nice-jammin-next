import { supabase } from '../utils/supabaseClient'

export default async function fetchLeaders() {
  const { data, error } = await supabase
    .from('profiles')
    .select('name, points')
    .not('name', 'eq', 'Henrietta')
    .limit(20)
    .order('points', {ascending: false})
  if (error) {
    console.log('error fetching top contributors', error)
  } else {
    return data
  }
}