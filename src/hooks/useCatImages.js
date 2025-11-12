import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/facts'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage ({ fact, setFact }) { // custom hook
  const [imageUrl, setImageUrl] = useState()

  // Recuperar la imagen cada vez que cambie la cita
  useEffect(() => {
    if (!fact) return
    const threeFirtsWords = fact.split(' ').slice(0, 3).join(' ')
    const encoded = encodeURIComponent(threeFirtsWords)
    fetch(`${CAT_PREFIX_IMAGE_URL}/cat/says/${encoded}?fontSize=50&fontColor=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
      .catch(err => {
        console.error('Failed to fetch cat image', err)
      })
  }, [fact])

  return { imageUrl }
} // Devuelve la url de la imagen {imageUrl: 'https...'}
