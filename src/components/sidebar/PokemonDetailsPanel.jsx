import { TYPE_COLORS } from '../../constants/typeColors'
import { MAX_STATS, STAT_INDICES } from '../../constants/pokemonStats'
import { formatPokedexNumber, capitalize, formatHeight, formatWeight } from '../../utils/helpers'
import { SPRITE_PLACEHOLDER } from '../../constants/config'

/**
 * Panel derecho de la Pokédex - Detalles del Pokémon seleccionado
 * @param {Object} selectedPokemon - Pokémon seleccionado para mostrar detalles
 * @param {boolean} loadingDetails - Si está cargando detalles
 */
const PokemonDetailsPanel = ({ selectedPokemon, loadingDetails }) => {
  // Loading state
  if (loadingDetails) {
    return (
      <div className='w-96 h-full bg-linear-to-b from-gray-800 to-gray-900 shadow-2xl flex items-center justify-center'>
        <div className='text-center p-8'>
          <div className='w-24 h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center animate-pulse'>
            <svg
              className='w-12 h-12 text-green-400 animate-spin'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
          </div>
          <p className='text-green-400 font-mono text-lg animate-pulse'>
            Cargando detalles...
          </p>
        </div>
      </div>
    )
  }

  if (!selectedPokemon) {
    return (
      <div className='w-96 h-full bg-linear-to-b from-gray-800 to-gray-900 shadow-2xl flex items-center justify-center'>
        <div className='text-center p-8'>
          <div className='w-24 h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center'>
            <svg
              className='w-12 h-12 text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
          <p className='text-gray-400 font-mono'>
            Selecciona un Pokémon
            <br />
            para ver sus detalles
          </p>
        </div>
      </div>
    )
  }

  const {
    name,
    id,
    types,
    stats,
    height,
    weight,
    sprites,
    abilities,
    base_experience: baseExperience
  } = selectedPokemon

  return (
    <div className='w-96 h-full bg-linear-to-b from-gray-800 to-gray-900 shadow-2xl flex flex-col'>
      {/* Header con sprite */}
      <div className='bg-gray-900 p-4 border-b-4 border-black'>
        {/* Pantalla superior */}
        <div className='bg-linear-to-b from-green-400 to-green-500 rounded-lg p-3 border-4 border-green-600 shadow-inner'>
          <div className='bg-green-300 rounded p-2 h-32 flex items-center justify-center relative overflow-hidden'>
            {/* Efecto de pantalla CRT */}
            <div className='absolute inset-0 bg-linear-to-b from-transparent via-green-200/20 to-transparent pointer-events-none' />

            <img
              src={sprites?.other?.home?.front_default || sprites?.front_default || SPRITE_PLACEHOLDER}
              alt={name}
              className='w-28 h-28 object-contain drop-shadow-2xl pixelated relative z-10'
              onError={(e) => {
                e.target.onerror = null
                e.target.src = SPRITE_PLACEHOLDER
              }}
            />
          </div>
        </div>

        {/* Nombre y número */}
        <div className='mt-3 text-center'>
          <h2 className='text-2xl font-bold text-white tracking-wide'>
            {capitalize(name)}
          </h2>
          <p className='text-green-400 font-mono'>
            {formatPokedexNumber(id)}
          </p>
        </div>

        {/* Tipos */}
        <div className='flex gap-2 justify-center mt-2'>
          {types.map((type) => (
            <span
              key={type.type.name}
              className='px-3 py-1 rounded-full text-xs font-bold uppercase text-white shadow-lg'
              style={{
                backgroundColor: TYPE_COLORS[type.type.name] || '#888'
              }}
            >
              {capitalize(type.type.name)}
            </span>
          ))}
        </div>
      </div>

      {/* Contenido scrolleable  */}
      <div className='flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4'>
        {/* Información física */}
        <div className='bg-gray-800 rounded-lg p-4 border-2 border-gray-700'>
          <h3 className='text-green-400 font-bold mb-3 flex items-center gap-2'>
            <span className='w-2 h-2 bg-green-400 rounded-full' />
            INFORMACIÓN FÍSICA
          </h3>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-gray-400 text-sm'>Altura</p>
              <p className='text-white font-bold text-lg'>
                {formatHeight(height)}
              </p>
            </div>
            <div>
              <p className='text-gray-400 text-sm'>Peso</p>
              <p className='text-white font-bold text-lg'>
                {formatWeight(weight)}
              </p>
            </div>
          </div>
        </div>

        {/* Habilidades */}
        <div className='bg-gray-800 rounded-lg p-4 border-2 border-gray-700'>
          <h3 className='text-green-400 font-bold mb-3 flex items-center gap-2'>
            <span className='w-2 h-2 bg-green-400 rounded-full' />
            HABILIDADES
          </h3>
          <div className='space-y-2'>
            {abilities.map((ability, index) => (
              <div
                key={index}
                className='bg-gray-900 rounded px-3 py-2 flex items-center justify-between'
              >
                <span className='text-white font-semibold'>
                  {capitalize(ability.ability.name.replace('-', ' '))}
                </span>
                {ability.is_hidden && (
                  <span className='text-xs bg-purple-600 text-white px-2 py-1 rounded font-bold'>
                    OCULTA
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Experiencia Base */}
        <div className='bg-gray-800 rounded-lg p-4 border-2 border-gray-700'>
          <h3 className='text-green-400 font-bold mb-3 flex items-center gap-2'>
            <span className='w-2 h-2 bg-green-400 rounded-full' />
            EXPERIENCIA
          </h3>
          <div className='flex items-center justify-between'>
            <span className='text-gray-300'>Experiencia Base</span>
            <span className='text-white font-mono text-xl font-bold'>
              {baseExperience} EXP
            </span>
          </div>
        </div>

        {/* Estadísticas */}
        <div className='bg-gray-800 rounded-lg p-4 border-2 border-gray-700'>
          <h3 className='text-green-400 font-bold mb-4 flex items-center gap-2'>
            <span className='w-2 h-2 bg-green-400 rounded-full' />
            ESTADÍSTICAS BASE
          </h3>
          <div className='space-y-4'>
            {/* Vida */}
            <div>
              <div className='flex justify-between text-sm mb-2'>
                <span className='text-gray-300 font-semibold'>VIDA</span>
                <span className='text-white font-mono font-bold'>
                  {stats[STAT_INDICES.hp].base_stat}
                </span>
              </div>
              <div className='h-3 bg-gray-900 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-linear-to-r from-red-500 to-red-400 transition-all duration-500'
                  style={{
                    width: `${(stats[STAT_INDICES.hp].base_stat / MAX_STATS.hp) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Ataque  */}
            <div>
              <div className='flex justify-between text-sm mb-2'>
                <span className='text-gray-300 font-semibold'>ATAQUE</span>
                <span className='text-white font-mono font-bold'>
                  {stats[STAT_INDICES.attack].base_stat}
                </span>
              </div>
              <div className='h-3 bg-gray-900 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-linear-to-r from-orange-500 to-orange-400 transition-all duration-500'
                  style={{
                    width: `${(stats[STAT_INDICES.attack].base_stat / MAX_STATS.attack) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Defensa */}
            <div>
              <div className='flex justify-between text-sm mb-2'>
                <span className='text-gray-300 font-semibold'>DEFENSA</span>
                <span className='text-white font-mono font-bold'>
                  {stats[STAT_INDICES.defense].base_stat}
                </span>
              </div>
              <div className='h-3 bg-gray-900 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-linear-to-r from-yellow-500 to-yellow-400 transition-all duration-500'
                  style={{
                    width: `${(stats[STAT_INDICES.defense].base_stat / MAX_STATS.defense) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Velocidad */}
            <div>
              <div className='flex justify-between text-sm mb-2'>
                <span className='text-gray-300 font-semibold'>VELOCIDAD</span>
                <span className='text-white font-mono font-bold'>
                  {stats[STAT_INDICES.speed].base_stat}
                </span>
              </div>
              <div className='h-3 bg-gray-900 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-linear-to-r from-pink-500 to-pink-400 transition-all duration-500'
                  style={{
                    width: `${(stats[STAT_INDICES.speed].base_stat / MAX_STATS.speed) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Ataque especial */}
            <div>
              <div className='flex justify-between text-sm mb-2'>
                <span className='text-gray-300 font-semibold'>ATAQUE ESPECIAL</span>
                <span className='text-white font-mono font-bold'>
                  {stats[STAT_INDICES.specialAttack].base_stat}
                </span>
              </div>
              <div className='h-3 bg-gray-900 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-linear-to-r from-blue-500 to-blue-400 transition-all duration-500'
                  style={{
                    width: `${(stats[STAT_INDICES.specialAttack].base_stat / MAX_STATS.specialAttack) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Ataque especial */}
            <div>
              <div className='flex justify-between text-sm mb-2'>
                <span className='text-gray-300 font-semibold'>DEFENSA ESPECIAL</span>
                <span className='text-white font-mono font-bold'>
                  {stats[STAT_INDICES.specialDefense].base_stat}
                </span>
              </div>
              <div className='h-3 bg-gray-900 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-linear-to-r from-green-500 to-green-400 transition-all duration-500'
                  style={{
                    width: `${(stats[STAT_INDICES.specialDefense].base_stat / MAX_STATS.specialDefense) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Stats */}
        <div className='bg-linear-to-r from-green-600 to-green-700 rounded-lg p-4 border-2 border-green-500'>
          <div className='flex justify-between items-center'>
            <span className='text-white font-bold'>TOTAL ESTADISTICAS BASE</span>
            <span className='text-white font-mono text-xl'>
              {stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer decorativo */}
      <div className='bg-gray-900 p-3 border-t-4 border-black'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2'>
            <div className='w-6 h-6 bg-red-600 rounded border-2 border-red-500' />
            <div className='w-6 h-6 bg-blue-600 rounded border-2 border-blue-500' />
          </div>
          <div className='text-gray-500 font-mono text-xs'>
            GEN {id <= 151 ? 'I' : id <= 251 ? 'II' : id <= 386 ? 'III' : 'IV+'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetailsPanel
