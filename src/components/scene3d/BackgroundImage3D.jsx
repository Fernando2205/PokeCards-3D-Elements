import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

/**
 * Fondo 3D con imagen envolvente
 * Crea una caja (skybox) que rodea toda la escena con la textura
 */
const BackgroundImage3D = () => {
  // Cargar la textura del fondo
  const texture = useLoader(TextureLoader, '/fondo_pokemon.webp')

  const size = 100 // Tamaño de la caja
  const darkenAmount = 0.5 // 0 = oscuro total, 1 = sin oscurecer

  return (
    <group>
      {/* Pared trasera */}
      <mesh position={[0, 0, -size / 2]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          fog={false}
          depthWrite={false}
          color={new THREE.Color(darkenAmount, darkenAmount, darkenAmount)}
        />
      </mesh>

      {/* Pared frontal */}
      <mesh position={[0, 0, size / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          fog={false}
          depthWrite={false}
          color={new THREE.Color(darkenAmount, darkenAmount, darkenAmount)}
        />
      </mesh>

      {/* Pared izquierda */}
      <mesh position={[-size / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          fog={false}
          depthWrite={false}
          color={new THREE.Color(darkenAmount, darkenAmount, darkenAmount)}
        />
      </mesh>

      {/* Pared derecha */}
      <mesh position={[size / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          fog={false}
          depthWrite={false}
          color={new THREE.Color(darkenAmount, darkenAmount, darkenAmount)}
        />
      </mesh>

      {/* Techo */}
      <mesh position={[0, size / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          fog={false}
          depthWrite={false}
          color={new THREE.Color(darkenAmount, darkenAmount, darkenAmount)}
        />
      </mesh>

    </group>
  )
}

export default BackgroundImage3D
