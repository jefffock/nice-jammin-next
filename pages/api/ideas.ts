import { supabase } from "../../utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
    if (error) {
      console.error('error getting ideas', error)
    } else {
      if (data && data.length > 0) {
        res.status(200).json(data)
      }
    }
  }
  catch (error) {
    res.status(501).send(error);
  } 
}