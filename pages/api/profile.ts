import { supabase } from "../../utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const id = body.id;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
    console.log('profiles', data)
    if (error) {
      console.error('error getting ideas', error)
    } else {
      if (data && data.length > 0) {
        res.status(200).json(data)
      } else {
        res.status(200).json([])
      }
    }
  }
  catch (error) {
    res.status(501).send(error);
  } 
}