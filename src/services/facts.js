const CAT_ENPOINT_RAMDOM_FACT = 'https://catfact.ninja/fact'

export const getRandomFact = async () => {
  try {
    const res = await fetch(CAT_ENPOINT_RAMDOM_FACT)
    // recomendado hacer primero que funcione la aplicacion y despues manejar errores
    if (!res.ok) {
      throw new Error('Error al recuperar la cita')
    }
    const data = await res.json()
    const { fact } = data
    console.log(fact)
    return fact
  } catch (err) {
    // tanto si hay error con la respuesta
    // como si hay error en el fetch(peticion)
    console.error(err)
    throw err
  }
}
