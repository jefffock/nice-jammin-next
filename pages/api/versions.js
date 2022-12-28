import { supabase } from "../../utils/supabaseClient";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const date = body.date;
  const artist = body.artist;
  const song = body.song;
  if (date) {
    try {
      const { data, error } = await supabase
        .from("versions")
        .select("song_name")
        .match({
          artist: artist,
          date: date
        });
      if (error) {
        console.error(error);
        res.status(500).send(error);
      } else {
        const songsAndArtists = data.map((version) => version.song_name);
        res.status(200).send(songsAndArtists);
      }
    } catch (error) {
      console.error("/date error", error);
      res.status(500).send(error);
    }
  } else if (song) {
    try {
      const { data, error } = await supabase
        .from("versions")
        .select("date")
        .eq("song_name", song);
      if (error) {
        console.error(error);
        res.status(500).send(error);
      }
      const justDates = data.map((version) => version.date);
      res.status(200).send(justDates);
    } catch (error) {
      console.error("/song error", error);
      res.status(500).send(error);
    }
  }
}
