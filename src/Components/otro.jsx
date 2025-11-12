import { useCatImage } from '../hooks/useCatImages'

export function Otro () {
  const { imageurl } = useCatImage({ fact: 'cat' })
  console.log(imageurl)

  return (
    <>
      {imageurl && <img src={imageurl} />}
    </>
  )
}
// Este componente utiliza el hook useCatImage para obtener una imagen de gato basada en un hecho proporcionado.
