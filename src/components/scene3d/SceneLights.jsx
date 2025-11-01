import { Environment } from '@react-three/drei'

/**
 * Configuración de iluminación para la escena 3D
 * Incluye luz ambiente, direccional y puntual para crear profundidad
 */
const SceneLights = () => {
  return (
    <>
      {/* Luz ambiente para iluminación base */}
      <ambientLight intensity={0.4} />

      {/* Luz direccional principal con sombras */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Luz puntual azul para acentos */}
      <pointLight position={[-10, -10, -5]} intensity={0.5} color='#4169E1' />

      {/* Entorno HDR para reflejos realistas */}
      <Environment preset='city' />
    </>
  )
}

export default SceneLights
