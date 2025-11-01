import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { SCENE_CONFIG } from '../../constants/config'
import SceneLights from './SceneLights'
import CameraControls from './CameraControls'
import GroundPlane from './GroundPlane'
import PokemonCardsGroup from './PokemonCardsGroup'

/**
 * Escena 3D principal con las tarjetas de Pokémon

 * @param {Array} pokemonList - Lista de Pokémon a mostrar
 * @param {Object} selectedPokemon - Pokémon actualmente seleccionado
 * @param {Function} onPokemonSelect - Callback al seleccionar un Pokémon
 */
const Scene = ({ pokemonList = [], selectedPokemon, onPokemonSelect }) => {
  return (
    <div className='w-full h-full bg-linear-to-b from-gray-900 via-gray-800 to-black'>
      <Canvas shadows dpr={[1, 2]}>
        {/* Cámara principal */}
        <PerspectiveCamera
          makeDefault
          position={SCENE_CONFIG.CAMERA_POSITION}
          fov={50}
        />

        {/* Controles de cámara */}
        <CameraControls />

        {/* Iluminación de la escena */}
        <SceneLights />

        {/* Fog para profundidad */}
        <fog attach='fog' args={['#1a1a2e', 10, 30]} />

        {/* Tarjetas de Pokémon con suspense y loading */}
        <PokemonCardsGroup
          pokemonList={pokemonList}
          selectedPokemon={selectedPokemon}
          onPokemonSelect={onPokemonSelect}
        />

        {/* Plano de suelo */}
        <GroundPlane />
      </Canvas>
    </div>
  )
}
export default Scene
