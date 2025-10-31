import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts.js'
import { useCatImage } from './hooks/useCatImages.js'
// const CAT_ENPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firtsWord}?fontSize=50&fontColor=red&json=true`
// "{fact && <p>{fact}</p>}" es un renderizado condicional

const useCatFact = () => { // Cuando se crea un custom hook evitar nombarlo de manera que explique su funcionalidad. Esto porque puede que el custom hook cambie su funcionalidad
  const [fact, setFact] = useState()
  const [factError, setFactError] = useState()

  const getRandomFactAndUpdateState = async () => { // extraer la logica de recuperar la cita en una funcion aparte
    if (!setFact) return
    getRandomFact().then(newFact => setFact(newFact)).catch(setFactError)
  }
  // No se recomienda utilizar react Query, SWR, axios, apolo
  // para recuperar la cita al cargar la pagina
  useEffect(getRandomFactAndUpdateState, [setFact])

  return { fact, factError, getRandomFactAndUpdateState }
}

export function App () {
  const { fact, factError, getRandomFactAndUpdateState } = useCatFact()
  const { imageUrl } = useCatImage({ fact, setFact: null }) // pasar null porque no se necesita setFact en este custom hook

  const handleClick = async () => {
    getRandomFactAndUpdateState()
    factError && console.error(factError) // manejar el error si existe
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
