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
    .match({submitter_name: profileName, version_id: versionId})
  if (error) {
    return error
  } else {
    calcAverageForVersion(versionId)
    return data
  }
}

async function postUpdatedTags(versionId, profileName, tagsText, tagsLength) {
  console.log('in postUpdatedTags')
  const { error } = await supabase
    .from('update_tags')
    .insert({
      version_id: versionId,
      username: profileName,
      tags_added: tagsText,
      length: tagsLength
  })
}

async function updateTags(tagsToUpdate, versionId, profileName, tagsText, tagsLength) {
  console.log('in updateTags')
  const { data, error } = await supabase
    .from('versions')
    .update(tagsToUpdate)
    .match({ id: versionId })
  if (error) {
    return error
  } else {
    postUpdatedTags(versionId, profileName, tagsText, tagsLength)
    return data
  }
}

async function checkIfUpvotedComment( name, ratingId ) {
  const { data, error } = await supabase
    .from('helpful_votes_ratings')
    .select('*')
    .eq('rating_id', ratingId)
    .eq('user_name', name)
  if (error) {
    console.log('error checking already voted helpful', error)
  } else {
    if (data.length === 0) {
      return false
      // props.addOnePoint(props.data.submitter_name)
      // voteHelpful()
    } return true
  }
}

async function upvoteComment(name, ratingId) {
  const { error } = await supabase
    .from('helpful_votes_ratings')
    .insert({ rating_id: ratingId, user_name: name })
  if (error) {
    console.log('error voting helpful', error)
  } else {
    // let current = helpfulToShow
    // setHelpfulToShow(current + 1)
    // props.countHelpfulVotesRatings(props.data.id)
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

async function countVotesIdeas(ideaId) {
  const { error } = await supabase.rpc( 'count_helpful_votes_ideas', {ideaid: ideaId})
    if (error) {
      console.log('error counting helpful votes ideas', error)
    }
}

export { rateVersion, updateRating, updateTags, addOnePoint, addTenPoints, addRatingCountToArtist, addRatingCountToSong, addRatingCountToVersion,  countHelpfulVotesRatings, countFunnyVotesRatings, countVotesIdeas, upvoteComment, checkIfUpvotedComment }