import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddIdea from './AddIdea';
import { countVotesIdeas } from '../utils/dbFunctions';
import { supabase } from '../utils/supabaseClient';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import twitter from '../public/loginIcons';

import Link from 'next/link';

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
		if (profile && profile && profile.name) {
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
			{/* <TableCell onClick={handleVote}>
				{votes ? votes : idea.votes}&nbsp;&nbsp;&nbsp;
				{
					<ThumbUpOutlinedIcon
						sx={{
							verticalAlign: 'bottom',
							'&:hover': { color: 'primary.main' },
						}}
					/>
				}
			</TableCell> */}
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
			console.log('ideas', ideas);
			const filteredIdeas = ideas?.filter((idea) => {
				return !idea.done;
			});
			console.log('filtered ideas', filteredIdeas);
			setIdeasToShow(filteredIdeas);
		} else {
			setIdeasToShow(ideas);
		}
	}, [showCompleted]);

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
				Roadmap
			</Typography>
			{ideasToShow && ideasToShow.length > 0 && (
				<Typography textAlign='center'>Thank you!</Typography>
			)}
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
								<TableCell sx={{ bgcolor: 'primary.main' }}>
									What lies ahead
								</TableCell>
								{/* <TableCell sx={{ bgcolor: 'primary.main' }}>Type</TableCell> */}
								{showCompleted && (
									<TableCell sx={{ bgcolor: 'primary.main' }}>Done</TableCell>
								)}
							</TableRow>
						</TableHead>
						{ideasToShow && (
							<TableBody>
								{ideasToShow.map((idea) => (
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
			<Typography textAlign='center'>
				Have an idea?{' '}
				<Link href='https://twitter.com/jeffphox'>
        
					 Let me know{' '}
					<svg
						width={15}
						aria-hidden='true'
						focusable='false'
						data-prefix='fab'
						data-icon='twitter'
						className='svg-inline--fa fa-twitter fa-w-16'
						role='img'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 512 512'
					>
						<path
							fill='currentColor'
							d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'
						></path>
					</svg>
				</Link>
			</Typography>
			<div>{twitter}</div>
			{/* <AddIdea
				user={user}
				profile={profile}
				// setIdeas={setIdeas}
			/> */}
		</Box>
	);
}
