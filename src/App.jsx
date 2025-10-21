import { useEffect, useState } from 'react'
import './App.css'
const CAT_ENPOINT_RAMDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firtsWord}?fontSize=50&fontColor=red&json=true`
// "{fact && <p>{fact}</p>}" es un renderizado condicional

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [factError, setFactError] = useState()

  // No se recomienda utilizar react Query, SWR, axios, apolo
  // para recuperar la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENPOINT_RAMDOM_FACT)
      .then(res => {
        // recomendado hacer primero que funcione la aplicacion y despues manejar errores
        if (!res.ok) {
          throw new Error('Error al recuperar la cita')
        }
        return res.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
        console.log(fact)
      })
      .catch(err => {
        // tanto si hay error con la respuesta
        // como si hay error en el fetch(peticion)
        setFactError(err.message)
      }, [])
  }, [])

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

  return (
    <main>
      <h1> App de Gatos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`using extracted using the firts three words for ${fact}`} />}
      </section>
    </main>
  )
}
