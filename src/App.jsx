import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts.js'
// const CAT_ENPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firtsWord}?fontSize=50&fontColor=red&json=true`
// "{fact && <p>{fact}</p>}" es un renderizado condicional

function useCatImage ({ fact, setFact }) { // custom hook
  const [imageUrl, setImageUrl] = useState()
  const [factError, setFactError] = useState()

  // No se recomienda utilizar react Query, SWR, axios, apolo
  // para recuperar la cita al cargar la pagina
  useEffect(() => {
    if (!setFact) return
    getRandomFact().then(newFact => setFact(newFact)).catch(setFactError)
  }, [setFact])

  // Recuperar la imagen cada vez que cambie la cita
  useEffect(() => {
    if (!fact) return
    const threeFirtsWords = fact.split(' ').slice(0, 3).join(' ')
    const encoded = encodeURIComponent(threeFirtsWords)
    fetch(`https://cataas.com/cat/says/${encoded}?fontSize=50&fontColor=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
        console.log(url)
      })
  }, [fact])

  return { imageUrl }
} // Devuelve la url de la imagen {imageUrl: 'https...'}

export function App () {
  const [fact, setFact] = useState()
  const { imageUrl } = useCatImage({ fact, setFact })

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  return (
    <main>
      <h1> App de Gatos</h1>

      <button onClick={handleClick}>Get new fact</button>

      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`using extracted using the firts three words for ${fact}`} />}
      </section>
    </main>
  )
}
