import { useState } from 'react'

/**
 * Overlay con información de controles de la escena 3D
 * Puede ser minimizado/expandido para no obstruir la vista
 */
const ControlsOverlay = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='absolute top-4 right-4'>
      {isExpanded
        ? (
          <div className='bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm animate-fade-in-scale'>
            <div className='flex items-center justify-between mb-2'>
              <h2 className='text-xl font-bold'>Controles</h2>
              <button
                onClick={() => setIsExpanded(false)}
                className='ml-4 text-gray-400 hover:text-white transition-colors'
                title='Ocultar controles'
              >
                ✕
              </button>
            </div>
            <ul className='text-sm space-y-1'>
              <li>Click izquierdo + arrastrar: Rotar cámara</li>
              <li>Rueda del ratón: Zoom</li>
              <li>Click derecho + arrastrar: Desplazar cámara</li>
              <li>Hover en tarjeta: Resaltar</li>
            </ul>
          </div>
          )
        : (
          <button
            onClick={() => setIsExpanded(true)}
            className='bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-black/90 transition-all duration-300 hover:scale-110 text-sm animate-fade-in'
            title='Mostrar controles'
          >
            ?
          </button>
          )}
    </div>
  )
}

export default ControlsOverlay
