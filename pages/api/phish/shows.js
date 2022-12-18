export default function handler(req, res) {
  let data = JSON.parse(req.body)
  let url = `https://api.phish.net/v5/setlists/showdate/${data.date}.json?apikey=${process.env.PHISHNET_API_KEY}`
  try {
    fetch(url)
      .then(data => data.json())
      .then(setlist => {
        res.status(200).send(JSON.stringify(setlist.data));
      })
  }
  catch (error) {
    res.status(500).send(error);
  } 
}