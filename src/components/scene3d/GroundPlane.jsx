/**
 * Plano de suelo con color sólido para la escena 3D
 */
const GroundPlane = () => {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -40, 0]}
      receiveShadow
    >
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial
        color='#5C7E50'
        fog={false}
      />
    </mesh>
  )
}

export default GroundPlane
