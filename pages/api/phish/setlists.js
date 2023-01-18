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
  const url = `https://api.phish.net/v5/setlists/showdate/${date}.json?apikey=${process.env.PHISHNET_API_KEY}`
  try {
    await fetch(url)
      .then(data => data.json())
      .then(setlist => {
        if (setlist && setlist.data && setlist.data.length > 0) {
          const titles = setlist.data
          .filter(song => song.artistid === artistId)
          .map(({ song }) => {
            if (song === 'Also Sprach Zarathustra') {
              return (
                'Also Sprach Zarathustra (2001)'
              )
            } return song
          })
          let location
          for (var i = 0; i < setlist.data.length; i++) {
            if (setlist.data[i].artistid === artistId) {
              location = `${setlist.data[i].venue}, ${setlist.data[i].city}, ${setlist.data[i].country === 'USA' ? setlist.data[i].state : setlist.data[i].country}`
              break;
            }
          }
          res.status(200).send({ titles, location });
        } else {
          res.status(500).send({message: 'No setlist found', error: true})
        }
      })
  }
  catch (error) {
    res.status(500).send(error);
  } 
}
