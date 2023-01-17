import { supabase } from "../../utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const artist = body.artist;
  try {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('artist', artist)
      .single()
    if (error) {
      console.error('error getting ideas', error)
    } else {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(500).json(null)
      }
    }
  }
  catch (error) {
    res.status(501).send(error);
  } 
}