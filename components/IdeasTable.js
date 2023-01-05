import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchIdeas } from '../utils/fetchData';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddIdea from './AddIdea';
import { countVotesIdeas } from '../utils/dbFunctions';
import { supabase } from '../utils/supabaseClient';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

function IdeaRow({
	currentIdea,
	user,
	profile,
	loading,
	setLoading,
	showCompleted,
}) {
	const [votes, setVotes] = useState(null);

	async function handleVote() {
		if (!loading) {
			setLoading(true);
			let valid = await validate();
			if (valid) {
				await addVote();
			} else {
				console.error('not valid');
				setLoading(false);
			}
		}
	}

	async function validate() {
		if (profile && profile.name) {
			const { data, error } = await supabase
				.from('helpful_votes_ideas')
				.select('*')
				.eq('idea_id', currentIdea.id)
				.eq('user_name', profile.name);
			if (error) {
				console.error('Error checking if already voted', error);
			} else {
				if (data.length === 0) {
					return true;
				} else {
					return false;
				}
			}
		}
		console.error('no profile');
		return false;
	}

	async function addVote() {
		const { error } = await supabase
			.from('helpful_votes_ideas')
			.insert({ idea_id: currentIdea.id, user_name: profile.name });
		if (error) {
			console.error('error voting', error);
		} else {
			let newVoteTotal = currentIdea.votes + 1;
			setVotes(newVoteTotal);
			await countVotesIdeas(currentIdea.id);
			setLoading(false);
		}
	}

	let idea = currentIdea;
	return (
		<TableRow
			key={idea.id}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell
				component='th'
				scope='row'
			>
				{idea.idea_body}
			</TableCell>
			{/* <TableCell>
				{idea.artist_idea ? 'Artist' : idea.tag_idea ? 'Tag' : 'Other'}
			</TableCell> */}
			<TableCell onClick={handleVote}>
				{votes ? votes : idea.votes}&nbsp;&nbsp;&nbsp;
				{
					<ThumbUpOutlinedIcon
						sx={{
							verticalAlign: 'bottom',
							'&:hover': { color: 'primary.main' },
						}}
					/>
				}
			</TableCell>
			{showCompleted && <TableCell>{idea.done ? '✔️' : 'To-do'}</TableCell>}
			{/* <TableCell>{idea.user_name}</TableCell> */}
		</TableRow>
	);
}

export default function IdeasTable({ user, profile, ideas }) {
	const [loading, setLoading] = useState(false);
	// const [ ideas, setIdeas] = useState(null)
	const [showCompleted, setShowCompleted] = useState(false);
	const [ideasToShow, setIdeasToShow] = useState(ideas);

	useEffect(() => {
		if (!showCompleted && ideas) {
			const filteredIdeas = ideas?.filter((idea) => !idea.done);
			setIdeasToShow(filteredIdeas);
		} else {
			setIdeasToShow(ideas);
		}
	}, [showCompleted, ideas, ideasToShow]);

	async function checkAlreadyVotedHelpful() {
		if (props.username && props.ideaData.user_name !== props.username) {
			const { data, error } = await supabase
				.from('helpful_votes_ideas')
				.select('*')
				.eq('idea_id', props.ideaData.id)
				.eq('user_name', props.username);
			if (error) {
				console.error('error checking already voted helpful', error);
			} else {
				if (data.length === 0) {
					props.addOnePoint(props.ideaData.user_name);
					voteHelpful();
				}
			}
		}
	}

	async function voteHelpful() {
		const { error } = await supabase
			.from('helpful_votes_ideas')
			.insert({ idea_id: props.ideaData.id, user_name: props.username });
		if (error) {
			console.error('error voting helpful', error);
		} else {
			let current = helpfulToShow;
			setHelpfulToShow(current + 1);
			props.countHelpfulVotesIdeas(props.ideaData.id);
		}
	}

	return (
		<Box
			mx='auto'
			maxWidth='95vw'
			my='3em'
		>
			<Typography
				fontSize='24px'
				textAlign='center'
			>
				Suggestions
			</Typography>
      {ideasToShow && ideasToShow.length > 0 &&
			<Typography textAlign='center'>Thank you!</Typography>
      }
			{ideasToShow && ideasToShow.length > 0 && (
				<TableContainer
					component={Paper}
					sx={{
						maxHeight: '45vh',
						overflowY: 'auto',
						maxWidth: '700px',
						mx: 'auto',
						borderRadius: '1em',
						my: '1em',
					}}
				>
					<Table aria-label='ideas table'>
						<TableHead>
							<TableRow sx={{ bgcolor: 'primary.main' }}>
								<TableCell sx={{ bgcolor: 'primary.main' }}>Suggestion</TableCell>
								{/* <TableCell sx={{ bgcolor: 'primary.main' }}>Type</TableCell> */}
								<TableCell
									sx={{ bgcolor: 'primary.main' }}
									align='right'
								>
									Supporters
								</TableCell>
								{showCompleted && (
									<TableCell sx={{ bgcolor: 'primary.main' }}>Done</TableCell>
								)}
							</TableRow>
						</TableHead>
						{ideas && (
							<TableBody>
								{ideas.map((idea) => (
									<IdeaRow
										key={idea.id}
										currentIdea={idea}
										user={user}
										profile={profile}
										loading={loading}
										setLoading={setLoading}
										showCompleted={showCompleted}
									/>
								))}
							</TableBody>
						)}
					</Table>
				</TableContainer>
			)}
			<FormControl sx={{ display: 'flex', alignItems: 'center' }}>
				<FormControlLabel
					control={
						<Checkbox
							checked={showCompleted}
							onChange={() => setShowCompleted(!showCompleted)}
						/>
					}
					label={'Show previous suggestions'}
				/>
			</FormControl>
			<AddIdea
				user={user}
				profile={profile}
				// setIdeas={setIdeas}
			/>
		</Box>
	);
}
