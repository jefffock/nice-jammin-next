import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Contributions = () => {
  const router = useRouter()
  const { username } = router.query
  const [ratings, setRatings] = useState(null)
  const [songs, setSongs] = useState(null)
  const [versions, setVersions] = useState(null)
  const [ideas, setIdeas] = useState(null)

  useEffect(() => {
    fetch('/api/contributors', {
      method: 'POST',
      
    })
  }, [])
}