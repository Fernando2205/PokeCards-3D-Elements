import axios from 'axios'
import { API_CONFIG } from '../constants/config'

// Cliente de axios configurado para pokeAPI

const pokeApiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para manejo de errores global

pokeApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('PokeAPI Error:', error.message)
    return Promise.reject(error)
  }
)

export const fetchPokemonList = async (
  limit = API_CONFIG.DEFAULT_LIMIT,
  offset = API_CONFIG.DEFAULT_OFFSET
) => {
  try {
    const response = await pokeApiClient.get('/pokemon', {
      params: { limit, offset }
    })
    return response.data.results
  } catch (error) {
    throw new Error(`Error al obtener lista de pokemones: ${error.message}`)
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

/**
 * Obtiene detalles de múltiples Pokémon en paralelo
 * @param {Array} pokemonList - Lista de Pokémon básicos
 * @returns {Promise<Array>} Array con detalles de todos los Pokémon
 */
export const fetchBatchPokemonDetails = async (pokemonList) => {
  try {
    const promises = pokemonList.map(pokemon => fetchPokemonDetails(pokemon.name))
    return await Promise.all(promises)
  } catch (error) {
    throw new Error`Error al obtener detalles en lote: ${error.message}`()
  }
}

/**
 * Obtiene la especie de un Pokémon (para descripciones, etc.)
 * @param {string|number} id - Nombre o ID de la especie
 * @returns {Promise<Object>} Datos de la especie
 */
export const fetchPokemonSpecies = async (id) => {
  try {
    const response = await pokeApiClient.get(`/pokemon-species/${id}`)
    return response.data
  } catch (error) {
    throw new Error(`Error al obtener especie: ${error.message}`)
  }
}

export default pokeApiClient
