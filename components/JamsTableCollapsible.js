import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StarRateIcon from '@mui/icons-material/StarRate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import RateVersion from './RateVersion'
import AddListenLink from './AddListenLink'
import ListenLink from './ListenLink'
import Comments from './Comments'
import { fetchComments } from '../utils/fetchData'

function JamsTableHead({ order, orderBy, onRequestSort }) {

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
};

const headCells = [
  {
    id: 'song_name',
    numeric: false,
    disablePadding: false,
    label: 'Song'
  },
  {
    id: 'date',
    center: true,
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'avg_rating',
    center: true,
    disablePadding: false,
    label: 'Rating'
  },
  {
    id: 'artist',
    numeric: false,
    disablePadding: false,
    label: 'Band'
  },
  {
    id: 'arrow',
    numeric: false,
    disablePadding: true,
    label: ''
  }
]

return (
  <TableHead>
    <TableRow>
      {headCells.map((headCell) => (
        <TableCell
          sx={{ bgcolor: 'primary.main' }}
          key={headCell.id}
          align={headCell.center ? 'center' : 'left'}
          padding={headCell.disablePadding ? 'none' : 'normal'}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label === 'Rating' ?
           <>
           <StarRateIcon /><p>Rating</p>
           </> :
            headCell.label === 'Date' ?
            <CalendarMonthIcon /> :
            headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
}

function Row({ row, user, profile }) {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState('')
  const [comments, setComments] = useState(null)

  useEffect(() => {
    let allTags = ''
    if (row.acoustic) {
      allTags += 'Acoustic, '
    } if (row.ambient) {
      allTags += 'Ambient/Space, '
    } if (row.bliss) {
      allTags += 'Bliss, '
    } if (row.bluesy) {
      allTags += 'Bluesy, '
    } if (row.chaotic) {
      allTags += 'Chaotic, '
    } if (row.crunchy) {
      allTags += 'Crunchy, '
    } if (row.dark) {
      allTags += 'Dark, '
    } if (row.dissonant) {
      allTags += 'Dissonant, '
    } if (row.fast) {
      allTags += 'Fast, '
    } if (row.funky) {
      allTags += 'Funky, '
    } if (row.groovy) {
      allTags += 'Groovy, '
    } if (row.guest) {
      allTags += 'Guest, '
    } if (row.happy) {
      allTags += 'Happy, '
    } if (row.heavy) {
      allTags += 'Heavy, '
    } if (row.jazzy) {
      allTags += 'Jazzy, '
    } if (row.long) {
      allTags += 'Long, '
    } if (row.multi_part) {
      allTags += 'Multi-part, '
    } if (row.official_release) {
      allTags += 'Official Release, '
    } if (row.peaks) {
      allTags += 'Peaks, '
    } if (row.reggae) {
      allTags += 'Reggae, '
    } if (row.segue) {
      allTags += 'Segue, '
    } if (row.shred) {
      allTags += 'Shred, '
    } if (row.silly) {
      allTags += 'Silly, '
    } if (row.sloppy) {
      allTags += 'Sloppy, '
    } if (row.slow) {
      allTags += 'Slow, '
    } if (row.sludgy) {
      allTags += 'Sludgy, '
    } if (row.soaring) {
      allTags += 'Soaring, '
    } if (row.soulful) {
      allTags += 'Soulful, '
    } if (row.stop_start) {
      allTags += 'Stop-start, '
    } if (row.synthy) {
      allTags += 'Synthy, '
    } if (row.tease) {
      allTags += 'Teases, '
    } if (row.trippy) {
      allTags += 'Trippy, '
    } if (row.type2) {
      allTags += 'Type II, '
    } if (row.unusual) {
      allTags += 'Unusual, '
    } let trimmed = allTags.length > 2 ? allTags.slice(0, allTags.length - 2) : ''
    setTags(trimmed)
  }, [row])

  useEffect(() => {
    if (open && !comments) {
      console.log('about to fetch comments')
      async function getComments(versionId) {
        let newComments = await fetchComments(versionId)
        if (newComments && newComments !== null) {
          console.log('newComments', newComments)
          setComments(newComments)
        }
      } getComments(row.id)
    }
  }, [open, comments, row])

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}
      onClick={() => setOpen(!open)}>
        <TableCell sx={{ maxWidth: '10px'}}>{row.song_name}</TableCell>
        <TableCell sx={{ maxWidth: '10px'}}>{row.date}</TableCell>
        <TableCell sx={{ maxWidth: '10px', textAlign:'center'}}>{row.avg_rating}</TableCell>
        <TableCell sx={{ maxWidth: '10px'}}>{row.artist}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: '0.2em', maxWidth: '90vw' }}>
              {row.listen_link &&
              // <Typography sx={{ 'text-decoration': 'underline', color: '#000000' }}>{<a href={row.listen_link}>Listen</a>}</Typography>
              <ListenLink link={row.listen_link} jam={row}></ListenLink>
              }
              {!row.listen_link &&
              <AddListenLink song={row.song_name} date={row.date} user={user} profile={profile}/>
              }
              {tags &&
              <Typography>{tags}</Typography>
            }
              <Typography>{row.location}</Typography>
              <Typography>{row.num_ratings} ratings</Typography>
              <Typography>Added by {row.submitter_name}. Thank you!</Typography>
              <RateVersion song={row.song_name} date={row.date} location={row.location} tags={tags} user={user} profile={profile} jam={row}/>
              {comments &&
              <Comments version={row.version_id} song={row.song_name} date={row.date} location={row.location} comments={comments}  user={user} profile={profile}/>
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ jams, sortedJams, sortJams, order, orderBy, setOrder, setOrderBy, user, profile }) {
  const [orderedSongs, setOrderedSongs] = useState(null)

  const handleRequestSort = (event, property) => {
    if (property === 'avg_rating' && orderBy !== 'avg_rating') {
      setOrder('desc')
    } else {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
    }
    setOrderBy(property);
  };

  // useEffect(() => {
  //   if (!sortedJams) {
  //     sortJams(order, orderBy)
  //   }
  // })

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  return (
    <>
    {/* <Typography variant="h5" textAlign="center" mt="0.5em">Favorite Jams</Typography>
    <Typography textAlign="center">Tap a row to listen and rate</Typography> */}
    <TableContainer component={Paper} sx={{ height: '55vh', overflowY: 'auto', width: '96vw', maxWidth: '900px', mx: 'auto', borderRadius: '1em' }}>
      <Table
      aria-label="jams table"
      stickyHeader
      >
        <JamsTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          />
        <TableBody>
          {sortedJams &&
          sortedJams
          .map((jam) => (
            <Row
            key={jam.id}
            row={jam}
            user={user}
            profile={profile}
            />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}