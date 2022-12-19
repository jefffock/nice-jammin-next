import { supabase } from "../../../utils/supabaseClient";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//alumni-blues
export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  let songName = body.song;
  console.log("songName", songName);
  try {
    const { data, error } = await supabase
      .from("phishnet_songs")
      .select("*")
      .eq("song", songName);
    if (error) {
      console.error("error getting phishnet songs from supabase", error);
      throw new Error(error);
    }
    const songId = data[0]?.songid;
    if (songId) {
      const url = `https://api.phish.net/v5/setlists/songid/${songId}.json?apikey=${process.env.PHISHNET_API_KEY}`;
      fetch(url)
        .then((data) => data.json())
        .then((versions) => {
          const versionsLessData = versions.data
            .filter((version) => version.artistid === "1")
            .map((version) => {
              if (version.artistid === "1") {
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
                };
              } else {
                return null;
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
