import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts.js'

export function useCatFact () { // Cuando se crea un custom hook evitar nombarlo de manera que explique su funcionalidad. Esto porque puede que el custom hook cambie su funcionalidad
  const [fact, setFact] = useState()
  const [factError, setFactError] = useState()

  const getRandomFactAndUpdateState = async () => { // extraer la logica de recuperar la cita en una funcion aparte
    if (!setFact) return
    getRandomFact().then(newFact => setFact(newFact)).catch(setFactError)
    console.log(setFact())
  }
  // No se recomienda utilizar react Query, SWR, axios, apolo
  // para recuperar la cita al cargar la pagina
  useEffect(getRandomFactAndUpdateState, [setFact])

  return { fact, factError, getRandomFactAndUpdateState }
}
// Devuelve la cita, el error y la funcion para recuperar una nueva cita