import { useEffect, useState } from 'react'
import { useName } from '../context/nameContext'
import axios from 'axios'
import List from './List'

const defaultType = {
  'ghost': 'Fantasma',
  'dark': 'Siniestro',
  'electric': 'Eléctrico',
  'normal': 'Normal',
  'fire': 'Fuego',
  'psychic': 'Psíquico',
  'flying': 'Volador',
  'steel': 'Acero',
  'poison': 'Veneno',
  'dragon': 'Dragón',
  'water': 'Agua',
  'ice': 'Hielo',
  'rock': 'Roca',
  'fighting': 'Lucha',
  'grass': 'Planta',
  'bug': 'Bicho',
  'ground': 'Tierra',
  'fairy': 'Hada',
}

type Pokemon = {
  name: string
  url: string
}

type TypeFiltered = {
  pokemon: {
    name: string
    url: string
  }
  slot: number
}


const baseUrl = 'https://pokeapi.co/api/v2/'

function Pokedex() {
  const { name } = useName()

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [typeFiltered, setTypeFiltered] = useState<Pokemon[]>([])
  const [value, setValue] = useState<string>('')
  const [type, setType] = useState<string>('')

  useEffect(() => {
    axios.get(`${baseUrl}/pokemon?limit=649`)
      .then(res => {
        setPokemons(res.data.results)
      })
  }, [])

  useEffect(() => {
    if (!type) {
      return
    }

    axios.get(`${baseUrl}/type/${type}`)
      .then(res => {
        const filteredNames = res.data.pokemon.map((e: TypeFiltered) => e.pokemon.name)
        setTypeFiltered(pokemons.filter(p => filteredNames.includes(p.name)))
      })

  }, [type])

  const filtered = (type ? typeFiltered : pokemons).filter(p => (
    p.name.toLowerCase().includes(value.toLowerCase())
  )) // pikachu

  return (
    <div className="container">
      <header className="header">
        <h2 className="title">Hola {name}, bienvenido a tu pokedex</h2>
      </header>

      <form className="controls">
        <input
          className="input"
          type="text"
          placeholder="Buscar pokémon..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <select
          className="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Filtrar por tipo"
        >
          <option value="">Todos</option>
          {Object.keys(defaultType).map((t) => (
            <option key={t} value={t}>
              {defaultType[t as keyof typeof defaultType]}
            </option>
          ))}
        </select>
      </form>

      <List pokemons={filtered} />
    </div>
  )
}

export default Pokedex