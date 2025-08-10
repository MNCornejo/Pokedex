import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import axios from 'axios'
import styles from './Details.module.css';

type Types = {
  slot: number
  type: {
    name: string
    url: string
  }
}

type Abilities = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

type Moves = {
  move: {
    name: string
    url: string
  }
  version_group_details: VersionGroupDetail[]
}

export interface VersionGroupDetail {
  level_learned_at: number
  move_learn_method: {
    name: string
    url: string
  }
  order: any
  version_group: {
    name: string
    url: string
  }
}

type Type = string

type Pokemon = {
  id: number
  name: string
  types: Type[]
  image: string
  stats: Stats
  abilities: string[]
  moves: string[]
}

type Stats = {
  hp: number
  attack: number
  defense: number
  speed: number
}

const baseUrl = 'https://pokeapi.co/api/v2/'

function Details() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    axios.get(`${baseUrl}/pokemon/${name}`)
      .then(res => {
        setPokemon({
          id: res.data.id,
          name: res.data.name,
          types: res.data.types.map((t: Types) => t.type.name),
          abilities: res.data.abilities.map((a: Abilities) => a.ability.name),
          moves: res.data.moves.map((m: Moves) => m.move.name).slice(0, 20),
          image: res.data.sprites.other.dream_world.front_default,
          stats: {
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
            speed: res.data.stats[5].base_stat
          }
        })
      })
  }, [])

  if (!pokemon) return <p>Loading pokemon page...</p>

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <Link to="/pokedex" className={styles.back}>← Volver</Link>
      </header>

      <div className={styles.title}>
        <span>#{pokemon.id.toString().padStart(3, '0')}</span>
        <h1>{name}</h1>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroImg}>
          <img src={pokemon.image} alt={pokemon.name} width={400} />
        </div>

        <div className={styles.section}>
          <h2>Types</h2>
          <ul className={styles.list}>
            {pokemon.types.map((t) => (
              <li key={t}><span className={`type-chip type-${t}`}>{t}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Abilities</h2>
        <div className={styles.list}>
          {pokemon.abilities.map((a) => (
            <span key={a} className={styles.move}>{a}</span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Moves</h2>
        <div className={styles.list}>
          {pokemon.moves.map((m) => (
            <span key={m} className={styles.move}>{m}</span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Stats</h2>
        <ul className={styles.stats}>
          <li>HP: {pokemon.stats.hp}</li>
          <li>Attack: {pokemon.stats.attack}</li>
          <li>Defense: {pokemon.stats.defense}</li>
          <li>Speed: {pokemon.stats.speed}</li>
        </ul>
      </div>
    </div>
  )
}
export default Details