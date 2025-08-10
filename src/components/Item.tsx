import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Item.module.css';

type Pokemon = {
  id: number
  name: string
  types: any[]
  image: string
}

type Type = {
  slot: number
  type: {
    name: string
    url: string
  }
}

function Item({ url }: { url: string }) {

  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setPokemon({
          id: res.data.id,
          name: res.data.name,
          types: res.data.types.map((t: Type) => t.type.name),
          image: res.data.sprites.other.dream_world.front_default
        })
      })
  }, [])

  if (!pokemon) return <p>Loading...</p>

  return (
    <div className={styles.card}>
      <span className={styles.number}>{pokemon.id.toString().padStart(3, '0')}</span>

      <div className={styles.thumb}>
        <img src={pokemon.image} alt={pokemon.name} width={200} />
      </div>

      <h2 className={styles.name}>{pokemon.name}</h2>

      <div className={styles.types}>
        {pokemon.types.map(t => (
          <span key={t} className={`type-chip type-${t}`}>{t}</span>
        ))}
      </div>
    </div>
  )
}
export default Item