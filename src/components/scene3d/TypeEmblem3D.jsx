import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { TYPE_COLORS } from '../../constants/typeColors'
import * as emblems from './emblems'

/**
 * Componente que renderiza emblemas 3D representativos según el tipo de Pokémon
 * @param {string} type - Tipo de Pokémon (fire, water, grass, etc.)
 * @param {Array} position - Posición [x, y, z]
 * @param {number} floatSpeed - Velocidad de flotación
 * @param {number} floatAmount - Amplitud del movimiento de flotación
 * @param {number} scale - Escala del emblema
 */
const TypeEmblem3D = ({
  type,
  position = [0, 0, 0],
  scale = 1,
  floatSpeed = 1.5,
  floatAmount = 0.1
}) => {
  const groupRef = useRef()

  // Rotación continua (opcional)
  // useFrame((state, delta) => {
  //   if (groupRef.current && rotationSpeed > 0) {
  //     groupRef.current.rotation.y += delta * rotationSpeed
  //   }
  // })

  // Efecto de flotación suave en el eje Y
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmount
    }
  })

  // Obtener el color del tipo
  const color = TYPE_COLORS[type] || TYPE_COLORS.normal

  // Mapeo de tipos a funciones de emblemas
  const emblemMap = {
    fire: () => emblems.fireEmblem(color),
    water: () => emblems.waterEmblem(color),
    grass: () => emblems.grassEmblem(color),
    electric: () => emblems.electricEmblem(color),
    ice: () => emblems.iceEmblem(color),
    poison: () => emblems.poisonEmblem(color),
    ground: () => emblems.groundEmblem(color),
    rock: () => emblems.rockEmblem(color),
    bug: () => emblems.bugEmblem(color),
    flying: () => emblems.flyingEmblem(color),
    psychic: () => emblems.psychicEmblem(color),
    fighting: () => emblems.fightingEmblem(color),
    ghost: () => emblems.ghostEmblem(color),
    dragon: () => emblems.dragonEmblem(color),
    dark: () => emblems.darkEmblem(color),
    steel: () => emblems.steelEmblem(color),
    fairy: () => emblems.fairyEmblem(color),
    normal: () => emblems.normalEmblem(color)
  }

  const renderEmblem = emblemMap[type] || emblemMap.normal

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {renderEmblem()}
    </group>
  )
}

export default TypeEmblem3D
