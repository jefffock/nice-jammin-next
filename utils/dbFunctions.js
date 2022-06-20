import { supabase } from '../utils/supabaseClient'

async function rateVersion(versionId, songId, profileName, rating, comment, versionSubmitterName, songSubmitterName, userId) {
  console.log('in rate version')
  const { data, error } = await supabase
    .from('ratings')
    .insert(
      { user_id: userId,
        version_id: versionId,
        submitter_name: profileName,
        rating: rating,
        comment: comment
      })
  if (error) {
    console.log('error', error)
    return error
  } else {
    console.log('success adding rating: ', data)
    addOnePoint(versionSubmitterName)
    addOnePoint(songSubmitterName)
    addTenPoints(profileName)
    addRatingCountToSong(songId)
    addRatingCountToVersion(versionId)
    calcAverageForVersion(versionId)
    return data
  }
}

async function updateRating(versionId, profileName, rating, comment) {
  const { data, error } = await supabase
    .from('ratings')
    .update({
      comment: comment,
      rating: rating
    })
    .match({submitter_name: username, version_id: version.id})
  if (error) {
    return error
  } else {
    calcAverageForVersion(versionId)
    return data
  }
}

async function addOnePoint(profileName) {
  console.log('in add One Point', profileName)
  const { error } = await supabase.rpc( 'add_one_point', { username: profileName })
  if (error) {
    console.log('error adding one point', error)
  }
}

async function addTenPoints(profileName) {
  console.log('in add Ten Points', profileName)
  const { error } = await supabase.rpc( 'add_ten_points', { username: profileName })
  if (error) {
    console.log('error adding ten points', error)
  }
}

async function addRatingCountToArtist(artistId) {
  const { error } = await supabase.rpc( 'add_rating_count_artist', { artistid: artistId })
  if (error) {
    console.log('error adding rating count to artist', error)
  }
}

async function addRatingCountToSong(songId) {
  console.log('in addRatingCountToSong', songId)
  let song_id = parseInt(songId)
  const { error } = await supabase.rpc( 'increment_song_rating_count', { songid: song_id })
  if (error) {
    console.log('error adding incrementing song rating count', error)
  }
}

async function addRatingCountToVersion(versionId) {
  console.log('in addRatingCountToVersion', versionId)
  let version_id = parseInt(versionId)
  const { error } = await supabase.rpc( 'increment_version_rating_count', { versionid: version_id })
  if (error) {
    console.log('error adding incrementing version rating count', error)
  }
}

async function calcAverageForVersion(versionId) {
  console.log('in calcAverageForVersion', versionId)
  let version = parseInt(versionId)
  const { error } = await supabase.rpc( 'calc_average', { versionid: version })
  if (error) {
    console.log('error calculating average', error)
  }
}

async function countHelpfulVotesRatings(ratingId) {
  const { error } = await supabase.rpc( 'count_helpful_votes_ratings', {ratingid: ratingId})
    if (error) {
      console.log('error counting helpful votes', error)
    }
}

async function countFunnyVotesRatings(ratingId) {
  const { error } = await supabase.rpc( 'count_funny_votes_ratings', {ratingid: ratingId})
    if (error) {
      console.log('error counting funny votes', error)
    }
}

async function countHelpfulVotesIdeas(ideaId) {
  console.log('in count helpful votes ideas')
  const { error } = await supabase.rpc( 'count_helpful_votes_ideas', {ideaid: ideaId})
    if (error) {
      console.log('error counting helpful votes ideas', error)
    }
}

// function addPointsToVersion(id, points) {
//   for (var i = 0; i < versions.length; i++) {
//     if (versions[i].id === id) {
//       versions[i].points = points;
//       break;
//     }
//   }
// }

export { rateVersion, addOnePoint, addTenPoints, addRatingCountToArtist, addRatingCountToSong, addRatingCountToVersion,  countHelpfulVotesRatings, countFunnyVotesRatings, countHelpfulVotesIdeas }