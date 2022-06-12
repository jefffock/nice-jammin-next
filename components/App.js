import { useState, useEffect, createContext, useContext, useMemo } from 'react'
import JamsTable from './JamsTable'
import { supabase } from '../utils/supabaseClient'
import Auth from './Auth'
import Account from './Account'
import DiscoverContributeSwitch from './DiscContSwitch'
import Table from '@mui/material/Table';
import Box from '@mui/material/Box'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import CollapsibleTable from './JamsTableCollapsible'
import { useRouter } from 'next/router'
import TableTitle from './TableTitle'
import Head from 'next/head'
import JamsDataGrid from './JamsDataGrid'
import FilterBar from './FilterBar'
import FilterList from './FilterList'
import AddVersion from './AddVersion'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { amber, deepOrange, grey } from '@mui/material/colors';
// import theme from '../styles/themes'

// export const themeOptions: ThemeOptions = {
//   palette: {
//     type: 'dark',
//     primary: {
//       main: '#3c2fa8',
//     },
//     secondary: {
//       main: '#1b6945',
//     },
//   },
// };

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3c2fa8',
    },
    secondary: {
      main: '#1b6945',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App({ jams, songs }) {
  const [artists, setArtists] = useState(null)
  const [artist, setArtist] = useState(null)
  const [song, setSong] = useState(null)
  const [session, setSession] = useState(null)
  const [filteredSongs, setFilteredSongs] = useState(jams)
  const [sortedSongs, setSortedSongs] = useState(jams)
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('avg_rating');
  const [beforeDate, setBeforeDate] = useState('')
  const [afterDate, setAfterDate] = useState('')
  const [tagsSelected, setTagsSelected] = useState([])
  const router = useRouter()

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    let newFilteredSongs = jams?.filter(filterFunc)
    setFilteredSongs(newFilteredSongs)
  }, [artist, tagsSelected, beforeDate, afterDate, song])

  useEffect(() => {
    sortSongs()
  }, [order, orderBy, filteredSongs])


  function filterFunc(item) {
    if (artist && artist !== 'All Bands' && item.artist !== artist) {
      return false
    } if (song && !item.song_name?.toLowerCase().includes(song.toLowerCase())) {
      return false
    } if (tagsSelected) {
      for (var i = 0; i < tagsSelected.length; i++) {
        if (!item[tagsSelected[i]]) {
          return false
        }
      }
    } let itemDate = parseInt(item.date.slice(0,4))
    if (beforeDate && beforeDate < itemDate) {
      return false
    } if (afterDate && afterDate > itemDate) {
      return false
    }
    return true
  }

  function sortSongs() {
    let newSortedSongs = filteredSongs.slice().sort(getComparator(order, orderBy))
    setSortedSongs(newSortedSongs)
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  return (
    <>
    <Head>
      {!artist && !song &&
      <>
      <title>Discover Great Jams by All Jam Bands</title>
      <meta name="keywords" content="best jam jams phish grateful dead sci goose umphreys tab jrad jgb"></meta>
      <meta name="description" content="Discover and Rate Great Jams By Phish, Grateful Dead, Goose, String Cheese Incident, Umphrey's McGee, Widespread Panic, Billy Strings, JRAD, and many more!"></meta>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      </>
      }
      {artist && !song &&
      <>
      <title>{artist} Best Jams - NiceJammin.com</title>
      <meta name="keywords" content="best jam jams {artist}"></meta>
      </>
      }
      {song && !artist &&
      <>
      <title>{song} Best Jams - NiceJammin.com</title>
      </>
      }
      {artist && song &&
      <>
      <title>{artist} {song} Best Jams - NiceJammin.com</title>
      </>
      }
    </Head>
    {/* <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> */}
      <Box sx={{ bgcolor: 'primary.graybg', minHeight: '100vh' }}>

      <Typography variant="h4" sx={{ mb: '.2em', ml: '.2em', color: 'primary.main'}}>Nice Jammin</Typography>
      {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton> */}
      {/* <DiscoverContributeSwitch /> */}
      {/* <TableTitle artist={artist} song={song} /> */}
      <FilterBar setArtist={setArtist} artist={artist} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} beforeDate={beforeDate} setBeforeDate={setBeforeDate} afterDate={afterDate} setAfterDate={setAfterDate} songs={songs} song={song} setSong={setSong}/>
      <FilterList artist={artist} setArtist={setArtist} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} beforeDate={beforeDate} afterDate={afterDate} setBeforeDate={setBeforeDate} setAfterDate={setAfterDate} song={song} setSong={setSong}/>
      <CollapsibleTable songs={jams} sortedSongs={sortedSongs} sortSongs={sortSongs} order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy}/>
      <br></br>
      <AddVersion songs={songs} jams={jams}/>
      <Box sx={{ bgcolor:'primary.main' }}>
        <Typography variant="h4">Top Contributors</Typography>
      </Box>
      <Box sx={{ bgcolor:'primary.main' }}>
        <Typography variant="h4">Gratitude</Typography>
      </Box>
      <Box sx={{ bgcolor:'primary.graybg' }}>
      <Typography variant="h4">Values/Philosophy/Hope</Typography>
      </Box>
      <Box sx={{ bgcolor:'primary.graybg' }}>
        <Typography variant="h4">Ideas</Typography>
      </Box>
      </Box>
      {/* </ThemeProvider>
    </ColorModeContext.Provider> */}
    </>
  )
}

function AppWithTheme({ jams, songs }) {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  // const getDesignTokens = (mode: PaletteMode) => ({
  //   palette: {
  //     mode,
  //     ...(mode === 'light'
  //       ? {
  //           // palette values for light mode
  //           primary: amber,
  //           divider: amber[200],
  //           text: {
  //             primary: grey[900],
  //             secondary: grey[800],
  //           },
  //         }
  //       : {
  //           // palette values for dark mode
  //           primary: deepOrange,
  //           divider: deepOrange[700],
  //           background: {
  //             default: deepOrange[900],
  //             paper: deepOrange[900],
  //           },
  //           text: {
  //             primary: '#fff',
  //             secondary: grey[500],
  //           },
  //         }),
  //   },
  // });

  // const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    // <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={darkTheme}>
        <App jams={jams} songs={songs}/>
      </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}