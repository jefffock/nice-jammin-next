export default async function handler(req, res) {
  const body = JSON.parse(req.body)
  const date = body.date
  const artist = body.artist
  let artistId
  switch(artist) {
    case 'Phish':
      artistId = '1'
      break;
    case 'Trey Anastasio, TAB':
      artistId = '2'
      break;
    default:
      artistId = '1'
  }
  let url = `https://api.phish.net/v5/setlists/showdate/${date}.json?apikey=${process.env.PHISHNET_API_KEY}`
  try {
    await fetch(url)
      .then(data => data.json())
      .then(setlist => {
        if (setlist && setlist.data && setlist.data.length > 0) {
          const titlesInSetlist = setlist.data
          .filter(song => song.artistid === artistId)
          .map(({ song }) => {
            if (song === 'Also Sprach Zarathustra') {
              return (
                'Also Sprach Zarathustra (2001)'
              )
            } return song
          })
          const location = `${setlist.data[0].venue}, ${setlist.data[0].city}, ${setlist.data[0].country === 'USA' ? setlist.data[0].state : setlist.data[0].country}`
          res.status(200).send({ titlesInSetlist, location});
        } else {
          res.status(500).send({message: 'No setlist found'})
        }
      })
  }
  catch (error) {
    res.status(500).send(error);
  } 
}
