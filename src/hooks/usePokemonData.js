import { useState, useEffect, useCallback } from 'react'
import { fetchPokemonList, fetchBatchPokemonDetails } from '../api/pokeApi'
import { API_CONFIG } from '../constants/config'

export const usePokemonData = (limit = API_CONFIG.DEFAULT_LIMIT) => {
  const [pokemonList, setPokemonList] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadPokemon = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const basicList = await fetchPokemonList(limit)
      const detailedList = await fetchBatchPokemonDetails(basicList)

      setPokemonList(detailedList)

      if (detailedList.length > 0) {
        setSelectedPokemon(detailedList[0])
      }
    } catch (error) {
      setError(error.message)
      console.error('Error loading pokemon:', error)
    } finally {
      setLoading(false)
    }
  }, [limit])

  //   Seleccionar un pokemon por id
  const selectPokemonById = useCallback((id) => {
    const pokemon = pokemonList.find(p => p.id === id)
    if (pokemon) {
      setSelectedPokemon(pokemon)
    }
  }, [pokemonList])

  const selectPokemonByName = useCallback((name) => {
    const pokemon = pokemonList.find(p => p.name === name)
    if (pokemon) {
      setSelectedPokemon(pokemon)
    }
  }, [pokemonList])

  useEffect(() => {
    loadPokemon()
  }, [loadPokemon])

  return {
    pokemonList,
    selectedPokemon,
    setSelectedPokemon,
    selectPokemonById,
    selectPokemonByName,
    loading,
    error,
    reload: loadPokemon
  }
}
