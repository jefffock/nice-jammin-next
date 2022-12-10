// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*
// all Phish shows

https://api.phish.net/v5/shows/artist/phish.json?order_by=showdate&apikey=YOUR_API_KEY
// just Trey shows

https://api.phish.net/v5/shows/artistid/2.json?order_by=state&apikey=YOUR_API_KEY
// all songs

https://api.phish.net/v5/songs.json?apikey=YOUR_API_KEY
// setlist for 11/22/97

https://api.phish.net/v5/setlists/showdate/1997-11-22.json?apikey=YOUR_API_KEY
// all venues in an HTML table

https://api.phish.net/v5/venues.html?apikey=YOUR_API_KEY
// all venues in an HTML table, with no header

https://api.phish.net/v5/venues.html?no_header=1&apikey=YOUR_API_KEY
// artists, in XML format

https://api.phish.net/v5/artists.xml?apikey=YOUR_API_KEY
// just one show, by ID

https://api.phish.net/v5/shows/showid/1252683584.xml?apikey=YOUR_API_KEY
// all shows from one state

https://api.phish.net/v5/venues/state/CT.html?apikey=YOUR_API_KEY
// jamcharts for one song, HTML format

https://api.phish.net/v5/jamcharts/slug/makisupa-policeman.html?apikey=YOUR_API_KEY
Remember that each call will require your API key appended to the query string (or in POST data).

A full request might look like this: https://api.phish.net/v5/shows/showyear/1989.json?apikey=YOUR_API_KEY&order_by=showdate.

Be careful. Requesting endpoints with no arguments, e.g. /setlists/ or /shows/, can create a result set that is both slow and very large. We recommend that you do not use these naked methods for embedding in a webpage or a synchronous application.
*/
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
