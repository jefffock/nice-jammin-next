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


function IdeaRow({currentIdea}) {
  const [votes, setVotes] = useState(null)

  function handleVote() {
    console.log('in handle vote', currentIdea )
  }

  let idea = currentIdea
  return (
    <TableRow
    key={idea.id}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
    <TableCell component="th" scope="row">
      {idea.idea_body}
    </TableCell>
    <TableCell align="right">{idea.artist_idea ? 'Artist' :
    idea.tag_idea ? 'Tag' : 'Other'}</TableCell>
    <TableCell align="right"
    onClick={handleVote}>{idea.votes}&nbsp;&nbsp;&nbsp;{<ThumbUpOutlinedIcon sx={{ verticalAlign: 'bottom', '&:hover': { color: 'primary.main' } }}/>}</TableCell>
    <TableCell align="right">{idea.user_name}</TableCell>
  </TableRow>
  )
}




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

  async function checkAlreadyVotedHelpful() {
    if (props.username && (props.ideaData.user_name !== props.username)) {
      const { data, error } = await supabase
        .from('helpful_votes_ideas')
        .select('*')
        .eq('idea_id', props.ideaData.id)
        .eq('user_name', props.username)
      if (error) {
        console.log('error checking already voted helpful', error)
      } else {
        if (data.length === 0) {
          props.addOnePoint(props.ideaData.user_name)
          voteHelpful()
        }
      }
    }
  }

  async function voteHelpful() {
    const { error } = await supabase
      .from('helpful_votes_ideas')
      .insert({ idea_id: props.ideaData.id, user_name: props.username })
    if (error) {
      console.log('error voting helpful', error)
    } else {
      let current = helpfulToShow
      setHelpfulToShow(current + 1)
      props.countHelpfulVotesIdeas(props.ideaData.id)
    }
  }

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
            <IdeaRow key={idea.id} currentIdea={idea} />
            // <TableRow
            //   key={idea.id}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            // >
            //   <TableCell component="th" scope="row">
            //     {idea.idea_body}
            //   </TableCell>
            //   <TableCell align="right">{idea.artist_idea ? 'Artist' :
            //   idea.tag_idea ? 'Tag' : 'Other'}</TableCell>
            //   <TableCell align="right">{idea.votes}&nbsp;&nbsp;&nbsp;{<ThumbUpOutlinedIcon sx={{ verticalAlign: 'bottom', '&:hover': { color: 'primary.main' } }}/>}</TableCell>
            //   <TableCell align="right">{idea.user_name}</TableCell>
            // </TableRow>
          ))}
        </TableBody>
        }
      </Table>
    </TableContainer>
    <AddIdea user={user} profile={profile} setIdeas={setIdeas}/>
    </Box>
  );
}
