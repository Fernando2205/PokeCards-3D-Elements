import { OrbitControls as DreiOrbitControls } from '@react-three/drei'

/**
 * Controles de cámara configurados para la escena de Pokémon
 * Permite rotar, hacer zoom y ajustar la vista de la escena
 */
const CameraControls = () => {
  return (
    <DreiOrbitControls
      enablePan
      enableZoom
      enableRotate
      minDistance={5}
      maxDistance={15}
      maxPolarAngle={Math.PI / 2}
    />
  )
}

export default CameraControls
