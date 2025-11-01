/**
 * Plano de suelo con sombras para la escena 3D
 * Proporciona una superficie que recibe sombras de los objetos
 */
const GroundPlane = () => {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, 0]}
      receiveShadow
    >
      <planeGeometry args={[50, 50]} />
      <shadowMaterial opacity={0.3} />
    </mesh>
  )
}

export default GroundPlane
