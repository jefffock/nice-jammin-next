import { supabase } from "../../../utils/supabaseClient";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const songName = body.song;
  const artist = body.artist;
  const artistId = artist === "Phish" ? "1" : "2";
  const tableName = artist === "Phish" ? "phishnet_songs" : "tab_songs";
  try {
    let songId;
    switch (songName) {
      case "Also Sprach Zarathustra (2001)":
        songId = 21;
        break;
      default:
        const { data, error } = await supabase
          .from(tableName)
          .select("songid")
          .eq("song", songName);
        if (error || data.length === 0) {
          console.error("error getting phishnet songs from supabase", error);
          res.status(500).send({ message: "Error getting song id" });
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
              const date = new Date(version.showdate + "T18:00:00Z");
              return {
                showdate: version.showdate,
                isjamchart: version.isjamchart,
                location: `${version.venue}, ${version.city}, ${
                  version.country === "USA" ? version.state : version.country
                }`,
                artistid: version.artistid,
                label: `${date.toLocaleDateString()} - ${version.venue}, ${
                  version.city
                }, ${
                  version.country === "USA" ? version.state : version.country
                }`
              };
            });
          res.status(200).send(versionsLessData.reverse());
        });
    } else {
      res.status(400).send([]);
    }
  } catch (error) {
    console.error("/phish/versions error", error);
    res.status(500).send(error);
  }
}
