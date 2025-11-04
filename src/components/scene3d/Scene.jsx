import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { SCENE_CONFIG } from '../../constants/config'
import SceneLights from './SceneLights'
import CameraControls from './CameraControls'
import GroundPlane from './GroundPlane'
import PokemonCard3D from './PokemonCard3D'
import BackgroundImage3D from './BackgroundImage3D'
import LoadingFallback from '../ui/LoadingFallback'

/**
 * Escena 3D principal con la tarjeta del Pokémon seleccionado
 * @param {Object} selectedPokemon - Pokémon actualmente seleccionado
 */
const Scene = ({ selectedPokemon }) => {
  const [isCardLoading, setIsCardLoading] = useState(false)

  // Detectar cuando cambia el pokemon para mostrar loading
  useEffect(() => {
    if (selectedPokemon) {
      setIsCardLoading(true)
    }
  }, [selectedPokemon])

  const handleCardLoaded = () => {
    setIsCardLoading(false)
  }

  return (
    <div className='w-full h-full bg-linear-to-b from-gray-900 via-gray-800 to-black'>
      <Canvas
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        {/* Cámara principal */}
        <PerspectiveCamera
          makeDefault
          position={SCENE_CONFIG.CAMERA_POSITION}
          fov={50}
        />

        {/* Controles de cámara */}
        <CameraControls />

        {/* Fondo con imagen */}
        <BackgroundImage3D />

        {/* Iluminación de la escena */}
        <SceneLights />

        {/* Tarjeta del Pokémon seleccionado con loading */}
        {selectedPokemon && (
          <>
            {isCardLoading && <LoadingFallback />}
            <PokemonCard3D
              pokemon={selectedPokemon}
              position={[0, 0, 0]}
              isSelected
              onLoadComplete={handleCardLoaded}
            />
          </>
        )}

        {/* Plano de suelo */}
        <GroundPlane />
      </Canvas>
    </div>
  )
}
export default Scene
