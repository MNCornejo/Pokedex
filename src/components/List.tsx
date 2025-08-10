import { Link } from 'react-router'
import Item from './Item'
import { useEffect, useState } from 'react'
import styles from './List.module.css';

type Pokemon = {
  name: string
  url: string
}

function List({ pokemons }: { pokemons: Pokemon[] }) {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [pokemons.length])

  const itemsPerPage = 10
  const totalPages = Math.ceil(pokemons.length / itemsPerPage)

  const goToPage = (current: number) => {
    setPage(Math.max(1, Math.min(current, totalPages)))
  }

  const prev = () => goToPage(page - 1)
  const next = () => goToPage(page + 1)

  const paginatedItems = pokemons.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const range = []
  const maxVisibleButtons = 7

  const half = Math.floor(maxVisibleButtons / 2)

  let start = Math.max(1, page - half)
  let end = start + maxVisibleButtons - 1

  if (end > totalPages) {
    end = totalPages
    start = Math.max(1, end - maxVisibleButtons + 1)
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return (
    <>
      <div className={styles.content}>
        <div className={styles.pagination}>
          <span className={styles.badge}>{page} of {totalPages}</span>

          <div className={styles.pages}>
            <button type="button" onClick={prev} disabled={page === 1} className={styles.btn}>
              prev
            </button>
            {range.map(n => (
              <button
                key={n}
                type="button"
                onClick={() => goToPage(n)}
                className={`${styles.btn} ${n === page ? styles.active : ''}`}
              >
                {n}
              </button>
            ))}
            <button type="button" onClick={next} disabled={page === totalPages} className={styles.btn}>
              next
            </button>
          </div>
        </div>

        <div className={styles.cards}>
          {paginatedItems.map(p => (
            <Link key={p.url} to={`/pokedex/${p.name}`}>
              <Item url={p.url} />
            </Link>
          ))}
        </div>
      </div>

      {pokemons.length === 0 && <p>No hay nada que mostrar</p>}
    </>
  )
}
export default List