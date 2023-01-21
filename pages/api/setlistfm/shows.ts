import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const body = JSON.parse(req.body);
	const artist = body.artist;
	const year = body.year;
	const mbid = serverRuntimeConfig.mbids[artist];
	const url = `https://api.setlist.fm/rest/1.0/search/setlists?artistMbid=${mbid}&year=${year}`;
	let apiKey = process.env.SETLISTFM_API_KEY;
  function paginatedFetch(
    url,
    page = 1,
    previousResponse = []
  ) {
    return fetch(`${url}&p=${page}`, {
      headers: {
        'x-api-key': `${apiKey}`,
        Accept: 'application/json',
      },
    }) // Append the page number to the base URL
      .then(response => response.json())
      .then(newResponse => {
        console.log('newResponse', newResponse);
        const setlist = newResponse?.setlist || [];

        const response = [...setlist, ...previousResponse]; // Combine the two arrays
  
        if (setlist?.length !== 0) {
          page++;
  
          return paginatedFetch(url, page, response);
        }

        return response;
      });
  }
	if (mbid && year) {
    const data = await paginatedFetch(url);
    const shows = data.map((show) => {
      const location = `${show?.venue?.name ? show.venue.name + ', ' : ''}${show.venue.city.name}, ${
        show.venue.city.country.code === 'US'
          ? show.venue.city.state
          : show.venue.city.country.name
      }`;
      //convert date to yyyy-mm-dd from dd-mm-yyyy
      const formattedDate = show.eventDate.split('-').reverse().join('-');
      const date = new Date(formattedDate + 'T12:00:00Z');
      return {
        location,
        showdate: formattedDate,
        label: `${date.toLocaleDateString()} - ${location}`,
      };
    });
    console.log(shows);
    res.status(200).send({shows});
		// try {
		// 	await fetch(url, {
		// 		headers: {
		// 			'x-api-key': `${apiKey}`,
		// 			Accept: 'application/json',
		// 		},
		// 	})
		// 		.then((data) => data.json())
		// 		.then((data) => {
		// 			let shows = [];
    //       console.log('data', data)
		// 			shows.concat(data.setlist);
    //       console.log('shows', shows);
		// 			const totalPages = Math.ceil(data.total / data.itemsPerPage);
    //       let currentPage = 2;
    //       while (currentPage <= totalPages) {
    //         const url = `https://api.setlist.fm/rest/1.0/search/setlists?artistMbid=${mbid}&year=${year}&p=${currentPage}`;
    //         try {
    //           await fetch(url, {
    //             headers: {
    //               'x-api-key': `${apiKey}`,
    //               Accept: 'application/json',
    //               },
    //               })
    //               .then((data) => data.json())
    //               .then((data) => {
    //                 shows.concat(data.setlist);
    //               }
    //             )
    //         } catch (error) {
    //           console.error('error in /setlistfm/shows');
    //           res.status(500).send
    //         }
    //       }
		// 			res.status(200).json({ shows });
		// 		});
		// } catch (error) {
		// 	console.error('error in /setlistfm/shows');
		// 	res.status(500).send({ error: true });
		// }
	}
};
