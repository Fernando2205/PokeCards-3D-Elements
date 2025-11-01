export const API_CONFIG = {
  BASE_URL: 'https://pokeapi.co/api/v2',
  SPRITES_BASE_URL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon',
  DEFAULT_LIMIT: 50,
  DEFAULT_OFFSET: 0,
  REQUEST_TIMEOUT: 10000
}

// Hay varios estilos y no me decidí cuál usar, así que los dejé todos.
export const SPRITE_SOURCES = {
  HOME: (id) => `${API_CONFIG.SPRITES_BASE_URL}/other/home/${id}.png`,
  HOME_SHINY: (id) => `${API_CONFIG.SPRITES_BASE_URL}/other/home/shiny/${id}.png`,
  OFFICIAL_ARTWORK: (id) => `${API_CONFIG.SPRITES_BASE_URL}/other/official-artwork/${id}.png`,
  DREAM_WORLD: (id) => `${API_CONFIG.SPRITES_BASE_URL}/other/dream-world/${id}.svg`
}

export const SCENE_CONFIG = {
  CAMERA_POSITION: [0, 0, 8],
  CARD_SPACING: 2.5,
  ROTATION_SPEED: 0.01,
  HOVER_SCALE: 1.2
}
