import { supabase } from "../../utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const url = body.url;
  const params = Object.fromEntries(new URLSearchParams(url))
  console.log('url', url, 'params', params)
  //use check db for full url
    //if it exists, return return id of row
  //if it doesn't exist, create new row
  try {
    const { data, error } = await supabase
      .from('lists')
      .select('*')
      .eq('url', url)
      .single()
    if (error) {
      console.error('error getting list', error)
      let newList = await supabase
				.from('lists')
				.insert([{ url: url, query: JSON.stringify(params) }])
				.select();
			console.log('list after insert', newList);
			const urlToShow = '/lists/' + newList.data[0].id;
      res.send(urlToShow)
    } else {
      if (data) {
        console.log('data', data)
        res.status(200).json(data)
      } else {
        console.log('no list found, creating new list')
        res.status(200).json([])
      }
    }
  }
  catch (error) {
    res.status(501).send(error);
  } 
}

export {}