import { useRef, useState } from 'react'
import { useName } from '../context/nameContext'
import { Link, useNavigate } from 'react-router'
import styles from './Home.module.css';

function Home() {
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
    <div className="container">
      {!name && (
        <section className={styles.hero}>
          <div className={styles.card}>
            <h1 className={styles.title}>Bienvenidos</h1>
            <p className={styles.subtitle}>Para comenzar ingresa tu nombre</p>

            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSetName(); }}>
              <input
                className={styles.input}
                type="text"
                ref={inputRef}
                placeholder="Escribe tu nombre"
              />
              <button className={styles.button} type="submit">
                Comenzar
              </button>
            </form>

            {error && <p className="muted" style={{ color: 'var(--danger)', marginTop: 'var(--s-3)' }}>{error}</p>}
          </div>
        </section>
      )}

      {name && (
        <section className={styles.centerWrap}>
          <h2 className={styles.bigTitle}>
            Hola de nuevo {name},{" "}
            <Link to="/pokedex">
              ir a tu <span className={styles.accentRed}>Pokedex</span>
            </Link>
          </h2>
        </section>
      )}
    </div>
  )
}
export default Home