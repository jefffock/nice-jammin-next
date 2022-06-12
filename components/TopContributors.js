import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { supabase } from '../utils/supabaseClient'

export default function TopContributors() {
  const [leaders, setLeaders] = useState(null)

    const fetchLeaders = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, points')
        .not('name', 'eq', 'Henrietta')
        .limit(20)
        .order('points', {ascending: false})
      if (error) {
        console.log('error fetching top contributors', error)
      } else {
        console.log('data fetched', data)
        setLeaders(data)
      }
    }

  useEffect(() => {
    if (!leaders) {
      fetchLeaders()
    }
  }, [])

  return (
    <TableContainer component={Paper} sx={{ height: '50vh', overflowY: 'auto'}}>
      <Table sx={{ width: '96vw' }}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaders?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}