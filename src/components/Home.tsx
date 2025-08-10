import { useRef, useState } from 'react'
import { useName } from '../context/nameContext'
import { Link, useNavigate } from 'react-router'

function Home () {
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { name, getName } = useName()

  const handleSetName = () => {
    const value = inputRef.current?.value.trim()
    setError(null) // Reset error state

    if (!value) {
      setError('El nombre no puede estar vacío')
      return
    }

    getName(inputRef.current?.value as string)
    inputRef.current!.value = '' // Clear the input field

    navigate('/pokedex') // Navigate to the Pokedex page
  }

  return (
    <div>
      {!name && (<>
        <h1>Bienvenidos</h1>
        <p>Para comenzar ingresa tu nombre</p>
        <input type="text" ref={inputRef} placeholder='escribe tu nombre' />
        <button type='button' onClick={handleSetName}>
          Comenzar
        </button>
      </>)}

      {name && (<>
        <h2>Hola de nuevo {name},{' '}
          ir a tu <Link to="/pokedex">Pokedex</Link>
        </h2>
      </>)}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
export default Home