import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchIdeas } from '../utils/fetchData'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddIdea from './AddIdea'

export default function IdeasTable({ user, profile }) {
  const [ideas, setIdeas] = useState(null)

  useEffect(() => {
    if (!ideas) {
      async function getIdeas() {
        let newIdeas = await fetchIdeas()
        console.log('newIdeas', newIdeas)
        setIdeas(newIdeas)
      } getIdeas()
    }
  })

  return (
    <Box mx='auto' maxWidth='95vw'>
      <Typography variant="h5" textAlign="center">Suggestions</Typography>
    <TableContainer component={Paper} sx={{ maxHeight: '45vh', overflowY: 'auto', maxWidth: '700px', mx: 'auto', borderRadius: '1em', my: '1em' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ bgcolor: 'primary.main' }}>Idea</TableCell>
            <TableCell sx={{ bgcolor: 'primary.main' }}>Type</TableCell>
            <TableCell sx={{ bgcolor: 'primary.main' }} align="right">Supporters</TableCell>
            <TableCell sx={{ bgcolor: 'primary.main' }}>User</TableCell>
          </TableRow>
        </TableHead>
        {ideas &&
        <TableBody>
          {ideas.map((idea) => (
            <TableRow
              key={idea.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {idea.idea_body}
              </TableCell>
              <TableCell align="right">{idea.artist_idea ? 'Artist' :
              idea.tag_idea ? 'Tag' : 'Other'}</TableCell>
              <TableCell align="right">{idea.votes}&nbsp;&nbsp;&nbsp;{<ThumbUpOutlinedIcon sx={{ verticalAlign: 'bottom', '&:hover': { color: 'primary.main' } }}/>}</TableCell>
              <TableCell align="right">{idea.user_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        }
      </Table>
    </TableContainer>
    <AddIdea user={user} profile={profile} setIdeas={setIdeas}/>
    </Box>
  );
}
