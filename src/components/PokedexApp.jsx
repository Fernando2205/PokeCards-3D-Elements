import { usePokemonData } from '../hooks/usePokemonData'
import Scene from './scene3d/Scene'
import ControlsOverlay from './ui/ControlsOverlay'
import Toast from './ui/Toast'
import { Pokedex } from './sidebar'

/**
 * Aplicación principal de la Pokédex con visualización 3D
 * Integra el sidebar de la Pokédex con la escena 3D interactiva
 */
const PokedexApp = () => {
  const {
    pokemonList,
    selectedPokemon,
    onPokemonSelect,
    loading,
    loadingDetails,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    hasNextPage,
    hasPreviousPage
  } = usePokemonData()

  return (
    <div className='relative w-full h-screen flex bg-gray-950 overflow-hidden'>
      {/* Sistema de notificaciones Toast */}
      <Toast />

      {/* Pokédex Sidebar */}
      <Pokedex
        pokemonList={pokemonList}
        selectedPokemon={selectedPokemon}
        onPokemonSelect={onPokemonSelect}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
        onGoToPage={goToPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        loadingDetails={loadingDetails}
        loadingList={loading}
      />

      {/* Escena 3D - Ocupa el espacio restante */}
      <div className='flex-1 relative overflow-hidden'>
        <Scene
          pokemonList={selectedPokemon ? [selectedPokemon] : []}
          selectedPokemon={selectedPokemon}
          onPokemonSelect={onPokemonSelect}
        />

        {/* Controles */}
        <ControlsOverlay />

        {/* Mensaje cuando no hay selección */}
        {!selectedPokemon && (
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div className='bg-black/70 text-white p-8 rounded-lg backdrop-blur-sm text-center max-w-md'>
              <h2 className='text-3xl font-bold mb-2'>Bienvenido a la Pokédex 3D</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PokedexApp
