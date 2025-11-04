import axios from 'axios'
import { API_CONFIG } from '../constants/config'

// Cliente de axios configurado para pokeAPI
const pokeApiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.REQUEST_TIMEOUT
})

export const fetchPokemonList = async (
  limit = API_CONFIG.DEFAULT_LIMIT,
  offset = API_CONFIG.DEFAULT_OFFSET
) => {
  try {
    const response = await pokeApiClient.get('/pokemon', {
      params: { limit, offset }
    })
    // Retornar tanto los resultados como el count total
    return {
      results: response.data.results,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous
    }
  } catch (error) {
    throw new Error(`Error al obtener lista de pokemones: ${error.message}`)
  }
}

/**
 * Obtener una página completa usando la URL que provee la API (next/previous)
 * Retorna la misma estructura que fetchPokemonList pero incluyendo next/previous.
 */
export const fetchPokemonPage = async (url) => {
  try {
    if (!url) throw new Error('URL requerida para fetchPokemonPage')

    const response = await axios.get(url)

    return {
      results: response.data.results,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous
    }
  } catch (error) {
    throw new Error(`Error al obtener página de pokemones: ${error.message}`)
  }
}

/**
 * Obtiene los detalles completos de un Pokémon
 * @param {string|number} id - Nombre o ID del Pokémon
 * @returns {Promise<Object>} Detalles completos del Pokémon
 */
export const fetchPokemonDetails = async (id) => {
  try {
    const response = await pokeApiClient.get(`/pokemon/${id}`)
    return response.data
  } catch (error) {
    throw new Error(`Erroral obtener detalles del pokémon: ${error.message}`)
  }
}

export default pokeApiClient
