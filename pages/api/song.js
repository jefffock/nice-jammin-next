import { supabase } from "../../utils/supabaseClient";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//alumni-blues
export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  let songName = body.song;
  try {
    const { data, error } = await supabase
      .from("versions")
      .select("date")
      .eq("song_name", songName);
    if (error) {
      console.error(error)
      throw new Error(error)
    }
    const justDates = data.map((version => version.date))
    res.status(200).send(justDates)
  } catch (error) {
    console.error("/song error", error);
    res.status(500).send(error);
  }
}
