export default function handler(req, res) {
  try {
    fetch(`https://api.phish.net/v5/songs.json?apikey=${process.env.PHISHNET_API_KEY}`)
      .then(data => {
        res.status(200).json(data);
      })
  }
  catch (error) {
    res.status(500).send(error);
  } 
}
