import { useEffect, useState } from 'react'
import { deleteCocktail, getAllCocktails } from '../services/cocktails.service'

import CocktailCard from '../components/CocktailCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [cocktails, setCocktails] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = async (id) => {
    try {
      await deleteCocktail(id)
    } catch (error) {
      alert("Couldn't delete cocktail, try again.")
    }
    setCocktails((prevCocktails) => {
      return prevCocktails.filter((cocktail) => cocktail.id !== id)
    })
  }

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const data = await getAllCocktails(orderBy)
        setCocktails(data)
        setFetchError(null)
      } catch (err) {
        setFetchError('Could not find any cocktails =(')
        setCocktails(null)
      }
    }
    fetchCocktails()
  }, [orderBy])

  return (
    <div className='page home'>
      {fetchError && <p>{fetchError}</p>}
      {cocktails && (
        <div className='cocktails'>
          <div className='order-by'>
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>
              Time Created
            </button>
            <button onClick={() => setOrderBy('name')}>Name</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
            {orderBy}
          </div>
          <div className='cocktail-grid'>
            {cocktails.map((cocktail) => (
              <CocktailCard
                cocktail={cocktail}
                key={cocktail.id}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
