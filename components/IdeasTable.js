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
import { countVotesIdeas } from '../utils/dbFunctions'
import { supabase } from '../utils/supabaseClient'


function IdeaRow({ currentIdea, user, profile, loading, setLoading }) {
  const [votes, setVotes] = useState(null)

  async function handleVote() {
    if (!loading) {
      setLoading(true)
      let valid = await validate()
      if (valid) {
        console.log('valid')
        await addVote()
      } else {
        console.log('not valid')
        setLoading(false)
      }
    }
  }

  async function validate() {
    if (profile && profile.name) {
      const { data, error } = await supabase
        .from('helpful_votes_ideas')
        .select('*')
        .eq('idea_id', currentIdea.id)
        .eq('user_name', profile.name)
      if (error) {
        console.log('Error checking if already voted', error)
      } else {
        if (data.length === 0) {
          return true
        } else {
          return false
        }
      }
    } console.log('no profile')
    return false
  }

  async function addVote() {
    const { error } = await supabase
      .from('helpful_votes_ideas')
      .insert({ idea_id: currentIdea.id, user_name: profile.name })
    if (error) {
      console.log('error voting', error)
    } else {
      let newVoteTotal = currentIdea.votes + 1
      setVotes(newVoteTotal)
      await countVotesIdeas(currentIdea.id)
      setLoading(false)
    }
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
    <TableCell>{idea.artist_idea ? 'Artist to add' :
    idea.tag_idea ? 'Tag to add' : 'Other idea'}</TableCell>
    <TableCell
    onClick={handleVote}>{votes ? votes : idea.votes}&nbsp;&nbsp;&nbsp;{<ThumbUpOutlinedIcon sx={{ verticalAlign: 'bottom', '&:hover': { color: 'primary.main' } }}/>}</TableCell>
    <TableCell>{idea.user_name}</TableCell>
  </TableRow>
  )
}

export default function IdeasTable({ user, profile }) {
  const [ideas, setIdeas] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!ideas && !loading) {
      setLoading(true)
      async function getIdeas() {
        let newIdeas = await fetchIdeas()
        console.log('newIdeas', newIdeas)
        setIdeas(newIdeas)
      } getIdeas()
    } setLoading(false)
  }, [ideas, loading])

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
      <Typography variant="h5" textAlign="center">User Suggestions for this Site</Typography>
      <Typography textAlign="center">Thank you for your ideas about what could make this site better!</Typography>
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
            <IdeaRow key={idea.id} currentIdea={idea} user={user} profile={profile} loading={loading} setLoading={setLoading}/>
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
