import { supabase } from "../../utils/supabaseClient";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//alumni-blues
export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  let date = body.date;
  let artist = body.artist
  try {
    const { data, error } = await supabase
      .from("versions")
      .select("song_name")
      .match({
        "artist": artist,
        "date": date
      })
    if (error) {
      console.error(error)
      throw new Error(error)
    }
    const songsAndArtists = data.map((version => version.song_name))
    res.status(200).send(songsAndArtists)
  } catch (error) {
    console.error("/date error", error);
    res.status(500).send(error);
  }
}
