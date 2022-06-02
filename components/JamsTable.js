import { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';


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

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'artist',
    numeric: false,
    disablePadding: false,
    label: 'Artist'
  },
  {
    id: 'rating',
    numeric: true,
    disablePadding: false,
    label: 'Rating'
  },
  {
    id: 'link',
    numeric: false,
    disablePadding: false,
    label: 'Listen'
  },
]

function JamsTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
};

return (
  <TableHead>
    <TableRow>
      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          align={headCell.numeric ? 'right' : 'left'}
          padding={headCell.disablePadding ? 'none' : 'normal'}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label}
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

export default function JamsTable(props) {
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('rating')
  const [songsToShow, setSongsToShow] = useState([])


  useEffect(() => {
    if (!songsToShow) {
      setSongsToShow(props.songs)
    }
  }, [songsToShow, props])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property)
  }

  const handleClick = (event, name) => {
    console.log('clicked', name)
  }

  return (
    //  <Box sx={{ width: '100%' }}>
    //   <Paper sx={{ width: '100%', mb: 2 }}>
    <Box>
      <Paper>
        <TableContainer>
          <Table
            sx={{ minWidth: '50%', maxHeight: '80%' }}
            aria-labelledby="tableTitle"
          >
            <JamsTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {props.songs &&
              props.songs.slice().sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell align="left">{row.song_id}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.artist}</TableCell>
                      <TableCell align="right">{row.avg_rating}</TableCell>
                      <TableCell align="left">{row.listen_link ? <a href={row.listen_link}>Listen</a> : 'Add Link'}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}