import { supabase } from "../../utils/supabaseClient";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const date = body.date;
  const artist = body.artist;
  const song = body.song;
  const beforeDate = body.beforeDate
  const afterDate = body.afterDate
  const tags = body.tags
  const orderBy = body.orderBy
  const asc = body.order === 'asc' ? true : false
  const fetchFullJams = body.fetchFullJams
  if (fetchFullJams) {
    let query = supabase
      .from("versions")
      .select("*")
    if (artist) {
      query = query.eq("artist", artist)
    } if (song) {
      query = query.eq("song_name", song)
    } if (afterDate) {
      let after = afterDate + "-01-01"
      query = query.gte("date", after)
    } if (beforeDate) {
      let before = beforeDate + "-12-31"
      query = query.lte("date", before)
    } if (tags) {
      tags.forEach(tag => {
        query = query.eq(tag, true)
      })
    } if (orderBy) {
      query = query.order(orderBy, {ascending: asc})
      if (orderBy === 'avg_rating') {
        query = query.order('num_ratings', {ascending: false})
      } if (orderBy === 'num_ratings') {
        query = query.order('avg_rating', {ascending: false})
      }
    } query = query.limit(100)
    try {
      const { data, error } = await query
      if (error) {
        res.status(500).send(error)
      } else {
        res.status(200).send(data)
      }
    } catch (error) {
      res.status(500).send(error)
    }
   } else if (date) {
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
