import './App.css'
import { useCatImage } from './hooks/useCatImages.js'
import { useCatFact } from './hooks/useCatFact.js'
// const CAT_ENPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firtsWord}?fontSize=50&fontColor=red&json=true`
// "{fact && <p>{fact}</p>}" es un renderizado condicional

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
        {imageUrl && <img src={imageUrl} alt={`${fact}`} />}
      </section>
    </main>
  )
}
