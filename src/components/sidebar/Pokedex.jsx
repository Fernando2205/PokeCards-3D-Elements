import PokemonListPanel from './PokemonListPanel'
import PokemonDetailsPanel from './PokemonDetailsPanel'

/**
 * Componente principal de la Pokédex con diseño retro
 * Dividido en dos paneles: lista de Pokémon y detalles
 * @param {Array} pokemonList - Lista completa de Pokémon disponibles
 * @param {Object} selectedPokemon - Pokémon actualmente seleccionado
 * @param {Function} onPokemonSelect - Callback al seleccionar un Pokémon
 * @param {number} currentPage - Página actual
 * @param {number} totalPages - Total de páginas
 * @param {Function} onNextPage - Callback para ir a la siguiente página
 * @param {Function} onPreviousPage - Callback para ir a la página anterior
 * @param {Function} onGoToPage - Callback para ir a una página específica
 * @param {boolean} hasNextPage - Si hay una página siguiente
 * @param {boolean} hasPreviousPage - Si hay una página anterior
 * @param {boolean} loadingDetails - Si está cargando detalles
 * @param {boolean} loadingList - Si está cargando la lista
 */
const Pokedex = ({
  pokemonList,
  selectedPokemon,
  onPokemonSelect,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  onGoToPage,
  hasNextPage,
  hasPreviousPage,
  loadingDetails,
  loadingList
}) => {
  return (
    <div className='flex h-full'>
      {/* Panel izquierdo: Lista de Pokémon */}
      <PokemonListPanel
        pokemonList={pokemonList}
        selectedPokemon={selectedPokemon}
        onPokemonSelect={onPokemonSelect}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onGoToPage={onGoToPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        loadingList={loadingList}
      />

      {/* Panel derecho: Detalles del Pokémon */}
      <PokemonDetailsPanel selectedPokemon={selectedPokemon} loadingDetails={loadingDetails} />
    </div>
  )
}

export default Pokedex
