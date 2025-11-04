import { useState } from 'react'
import { formatPokedexNumber, capitalize } from '../../utils/helpers'

/**
 * Panel izquierdo de la Pokédex - Lista de Pokémon con estilo retro
 * @param {Array} pokemonList - Lista de Pokémon disponibles
 * @param {Object} selectedPokemon - Pokémon seleccionado
 * @param {Function} onPokemonSelect - Callback de selección
 * @param {number} currentPage - Página actual
 * @param {number} totalPages - Total de páginas
 * @param {Function} onNextPage - Ir a siguiente página
 * @param {Function} onPreviousPage - Ir a página anterior
 * @param {Function} onGoToPage - Ir a página específica
 * @param {boolean} hasNextPage - Si hay página siguiente
 * @param {boolean} hasPreviousPage - Si hay página anterior
 * @param {boolean} loadingList - Si está cargando la lista
 */
const PokemonListPanel = ({
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
  loadingList
}) => {
  const [pageInput, setPageInput] = useState('')

  const handleGoToPage = (e) => {
    e.preventDefault()
    const page = parseInt(pageInput)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onGoToPage(page)
      setPageInput('')
    }
  }
  return (
    <div className='w-80 h-full bg-linear-to-b from-red-600 to-red-700 shadow-2xl flex flex-col'>
      {/* Header de la Pokédex */}
      <div className='bg-red-800 p-4 border-b-4 border-black relative'>
        <div className='flex items-center gap-4'>
          {/* Luz característica de la Pokédex */}
          <div className='relative'>
            <div className='w-16 h-16 bg-blue-400 rounded-full shadow-lg border-4 border-white'>
              <div className='absolute inset-2 bg-blue-300 rounded-full'>
                <div className='absolute inset-1 bg-linear-to-br from-blue-200 to-blue-400 rounded-full' />
              </div>
            </div>
          </div>

          {/* Título */}
          <div>
            <h1 className='text-3xl font-bold text-white tracking-wider'>
              POKÉDEX
            </h1>
            <p className='text-red-200 text-sm'>
              {pokemonList.length} Pokémon disponibles
            </p>
          </div>
        </div>

        {/* Luces decorativas */}
        <div className='flex gap-2 mt-4'>
          <div className='w-3 h-3 bg-red-500 rounded-full border border-red-400' />
          <div className='w-3 h-3 bg-yellow-500 rounded-full border border-yellow-400' />
          <div className='w-3 h-3 bg-green-500 rounded-full border border-green-400' />
        </div>
      </div>

      {/* Pantalla de lista */}
      <div className='flex-1 bg-gray-900 m-4 rounded-lg border-4 border-gray-800 shadow-inner overflow-hidden'>
        {/* Screen effect */}
        <div className='h-full bg-linear-to-b from-gray-800 to-gray-900 p-2 overflow-y-auto custom-scrollbar'>
          {loadingList
            ? (
              <div className='flex items-center justify-center h-full'>
                <div className='text-center'>
                  <div className='w-16 h-16 mx-auto mb-4 border-4 border-green-400 border-t-transparent rounded-full animate-spin' />
                  <p className='text-green-400 font-mono text-lg animate-pulse'>
                    Cargando lista...
                  </p>
                </div>
              </div>
              )
            : pokemonList.length === 0
              ? (
                <div className='flex items-center justify-center h-full'>
                  <p className='text-green-400 font-mono text-lg animate-pulse'>
                    No hay pokémon disponibles
                  </p>
                </div>
                )
              : (
                <div className='space-y-1'>
                  {pokemonList.map((pokemon) => {
                    const isSelected = selectedPokemon?.id === pokemon.id

                    return (
                      <button
                        key={pokemon.id}
                        onClick={() => onPokemonSelect(pokemon)}
                        className={`
                        w-full p-3 rounded-lg text-left transition-all duration-200
                        border-2 group
                        ${
                          isSelected
                            ? 'bg-green-600 border-green-400 shadow-lg shadow-green-500/50'
                            : 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-green-500'
                        }
                      `}
                      >
                        <div className='flex items-center gap-3'>
                          {/* Número */}
                          <span
                            className={`
                            font-mono text-sm font-bold min-w-12
                            ${isSelected ? 'text-green-200' : 'text-gray-500 group-hover:text-green-400'}
                          `}
                          >
                            {formatPokedexNumber(pokemon.id)}
                          </span>

                          {/* Nombre */}
                          <div className='flex-1'>
                            <p
                              className={`
                              font-bold text-base
                              ${isSelected ? 'text-white' : 'text-green-400'}
                            `}
                            >
                              {capitalize(pokemon.name)}
                            </p>
                          </div>

                          {/* Indicador de selección */}
                          {isSelected && (
                            <div className='w-2 h-2 bg-green-300 rounded-full animate-pulse' />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
                )}
        </div>
      </div>      {/* Footer con controles de paginación */}
      <div className='bg-red-800 p-4 border-t-4 border-red-900 space-y-3'>
        {/* Fila superior: navegación */}
        <div className='flex items-center justify-between gap-2'>
          {/* Botón anterior */}
          <button
            onClick={onPreviousPage}
            disabled={!hasPreviousPage}
            className={`
              px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200
              ${
                hasPreviousPage
                  ? 'bg-gray-800 text-green-400 hover:bg-gray-700 hover:scale-105 border-2 border-gray-700 hover:border-green-500'
                  : 'bg-gray-900 text-gray-600 cursor-not-allowed border-2 border-gray-800'
              }
            `}
          >
            ← ANT
          </button>

          {/* Indicador de página */}
          <div className='flex-1 text-center'>
            <div className='bg-gray-900 px-4 py-2 rounded-lg border-2 border-gray-800'>
              <span className='text-green-400 font-mono font-bold text-sm'>
                {currentPage} / {totalPages}
              </span>
            </div>
          </div>

          {/* Botón siguiente */}
          <button
            onClick={onNextPage}
            disabled={!hasNextPage}
            className={`
              px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200
              ${
                hasNextPage
                  ? 'bg-gray-800 text-green-400 hover:bg-gray-700 hover:scale-105 border-2 border-gray-700 hover:border-green-500'
                  : 'bg-gray-900 text-gray-600 cursor-not-allowed border-2 border-gray-800'
              }
            `}
          >
            SIG →
          </button>
        </div>

        {/* Fila inferior: ir a página específica */}
        <form onSubmit={handleGoToPage} className='flex items-center gap-2'>
          <label htmlFor='pageInput' className='text-red-200 text-xs font-semibold'>
            IR A:
          </label>
          <input
            id='pageInput'
            type='number'
            min='1'
            max={totalPages}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            placeholder='#'
            className='flex-1 bg-gray-900 text-green-400 font-mono font-bold text-center px-3 py-2 rounded-lg border-2 border-gray-800 focus:border-green-500 focus:outline-none placeholder-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          />
          <button
            type='submit'
            className='bg-gray-800 text-green-400 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 hover:bg-gray-700 hover:scale-105 border-2 border-gray-700 hover:border-green-500'
          >
            IR
          </button>
        </form>
      </div>
    </div>
  )
}

export default PokemonListPanel
