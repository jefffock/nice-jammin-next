import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { supabase } from '../utils/supabaseClient'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


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
    <Box mx="auto" my="1em" width='96vw' maxWidth='400px'>
    <Typography variant="h4" textAlign="center" pt="1em" my="0.4em">Top Contributors</Typography>
    <TableContainer component={Paper} sx={{ height: '50vh', overflowY: 'auto', borderRadius: '1em' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ bgcolor: "primary.main"}}>Rank</TableCell>
            <TableCell sx={{ bgcolor: "primary.main"}}>Name</TableCell>
            <TableCell align="right" sx={{ bgcolor: "primary.main"}}>Score</TableCell>
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
          </Box>
  );
}