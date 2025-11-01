export const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
}

/**
 * Configuración de propiedades materiales por tipo
 */
export const TYPE_MATERIAL_PROPS = {
  fire: {
    emissive: true,
    emissiveIntensity: 0.3,
    metalness: 0,
    roughness: 0.5
  },
  water: {
    metalness: 0.3,
    roughness: 0.2
  },
  ice: {
    transmission: 0.5,
    opacity: 0.8,
    transparent: true,
    roughness: 0.1,
    metalness: 0.1
  },
  electric: {
    emissive: true,
    emissiveIntensity: 0.5,
    metalness: 0.2,
    roughness: 0.3
  },
  psychic: {
    emissive: true,
    emissiveIntensity: 0.2,
    metalness: 0.3,
    roughness: 0.4
  },
  ghost: {
    transparent: true,
    opacity: 0.6,
    transmission: 0.3,
    roughness: 0.2
  },
  steel: {
    metalness: 0.9,
    roughness: 0.1
  },
  dragon: {
    metalness: 0.5,
    roughness: 0.3
  },
  rock: {
    roughness: 0.9,
    metalness: 0.1
  },
  ground: {
    roughness: 0.8,
    metalness: 0
  },
  fairy: {
    metalness: 0.2,
    roughness: 0.3
  }
}
/**
 * Obtiene el color principal de un Pokémon basado en su tipo primario
 * @param {Array} types - Array de tipos del Pokémon
 * @returns {string} Color hexadecimal
 */
export const getPokemonMainColor = (types) => {
  if (!types || types.length === 0) return TYPE_COLORS.normal
  return TYPE_COLORS[types[0].type.name] || TYPE_COLORS.normal
}

/**
 * Obtiene todos los colores de un Pokémon (si tiene más de un tipo)
 * @param {Array} types - Array de tipos del Pokémon
 * @returns {Array<string>} Array de colores hexadecimales
 */
export const getPokemonColors = (types) => {
  if (!types || types.length === 0) return [TYPE_COLORS.normal]
  return types.map(t => TYPE_COLORS[t.type.name] || TYPE_COLORS.normal)
}

/**
 * Obtiene las propiedades del material para un tipo específico
 * @param {string} type - Tipo de Pokémon
 * @returns {Object} Propiedades del material
 */
export const getTypeMaterialProps = (type) => {
  return TYPE_MATERIAL_PROPS[type] || {}
}
