import { useCatImage } from "../hooks/useCatImages";

export function OtroComponent () {
  const { imageurl } = useCatImage({fact: 'cat' })
  console.log(imageurl)

  return (
  <>
  </>
  )
}