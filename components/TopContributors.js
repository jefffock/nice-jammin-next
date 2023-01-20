import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function TopContributors({ leaders }) {

	return (
		<Box
			mx='auto'
			my='1em'
			width='96vw'
			maxWidth='400px'
		>
			<Typography
				fontSize='24px'
				textAlign='center'
				my='0.4em'
			>
				Top Contributors
			</Typography>
			<TableContainer
				component={Paper}
				sx={{ height: '50vh', overflowY: 'auto', borderRadius: '1em' }}
			>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell
								align='right'
								sx={{ bgcolor: 'primary.main' }}
							>
								Rank
							</TableCell>
							<TableCell sx={{ bgcolor: 'primary.main' }}>Name</TableCell>
							<TableCell
								align='right'
								sx={{ bgcolor: 'primary.main' }}
							>
								Score
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{leaders &&
							leaders.map((row, index) => (
								<TableRow
									key={index}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell
										align='right'
										component='th'
										scope='row'
									>
										{index + 1}
									</TableCell>
									<TableCell>
										<Link
											href={{
												pathname: '/fans/[username]',
												query: { username: `${row.name}` },
											}}
										>{`${row.name}`}
										</Link>
									</TableCell>
									<TableCell align='right'>{row.points}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
