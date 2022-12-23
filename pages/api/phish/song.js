import { supabase } from "../../../utils/supabaseClient";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  let songName = body.song;
  let artist = body.artist
  let artistId = (artist === 'Phish' ? '1' : '2')
  try {
    let songId
    switch (songName) {
      case 'Also Sprach Zarathustra (2001)':
        songId = 21
        break;
      default:
        const { data, error } = await supabase
          .from("phishnet_songs")
          .select("*")
          .eq("song", songName);
        if (error) {
          console.error("error getting phishnet songs from supabase", error);
          res.status(500).send({message: 'Error getting song id'})
        }
        songId = data[0]?.songid;
    }
    if (songId) {
      const url = `https://api.phish.net/v5/setlists/songid/${songId}.json?apikey=${process.env.PHISHNET_API_KEY}`;
      fetch(url)
        .then((data) => data.json())
        .then((versions) => {
          const versionsLessData = versions.data
            .filter((version) => version.artistid === artistId)
            .map((version) => {
                const date = new Date(version.showdate + 'T18:00:00Z');
                return {
                  showdate: version.showdate,
                  isjamchart: version.isjamchart,
                  location: `${version.venue}, ${
                    version.city
                  }, ${version.state ?? ""}${
                    version.country === "USA" ? "" : ' ' + version.country
                  }`,
                  artistid: version.artistid,
                  label: `${date.toLocaleDateString()} - ${version.venue}, ${
                    version.city
                  }, ${version.state ?? ""}${
                    version.country === "USA" ? "" : version.country
                  }`,
              }
            });
          res.status(200).send(versionsLessData.reverse());
        });
    }
    //use song title to get phishnet songid from supabase, or just add phishnet songid to the song
    //use phishnet song id to get performances
  } catch (error) {
    console.error("/song error", error);
    res.status(500).send(error);
  }
}
