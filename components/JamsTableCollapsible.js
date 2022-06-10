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

function JamsTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
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
    numeric: false,
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'avg_rating',
    numeric: false,
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
          key={headCell.id}
          align={headCell.numeric ? 'center' : 'left'}
          padding={headCell.disablePadding ? 'none' : 'normal'}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label === 'Rating' ?
            <StarRateIcon /> :
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState('')

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

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}
      onClick={() => setOpen(!open)}>
        <TableCell>{row.song_name}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.avg_rating}</TableCell>
        <TableCell>{row.artist}</TableCell>
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
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              {row.listen_link &&
              <Typography sx={{ 'text-decoration': 'underline' }}>{<a href={row.listen_link}>Listen</a>}</Typography>
              }
              {tags &&
              <Typography>{tags}</Typography>
              }
              <Typography>{row.location}</Typography>
              <Typography>{row.num_ratings} ratings</Typography>
              <Typography>Added by {row.submitter_name}</Typography>
              {/* <Typography sx={{ 'text-decoration': 'underline' }}>Rate this Version</Typography> */}
              <RateVersion song={row.song_name} date={row.date} tags={tags}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ songs, sortedSongs, sortSongs, order, orderBy, setOrder, setOrderBy }) {
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

  useEffect(() => {
    if (!sortedSongs) {
      sortSongs(order, orderBy)
    }
  })

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
    <TableContainer component={Paper} sx={{ maxHeight: '55vh', overflowY: 'auto', maxWidth: '900px'}}>
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
          {sortedSongs &&
          sortedSongs
            .map((jam) => (
              <Row
              key={jam.id}
              row={jam}
              />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}