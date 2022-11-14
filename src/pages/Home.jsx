import { useEffect, useState } from 'react'
import { getAllCocktails } from '../services/cocktails.service'

import CocktailCard from '../components/CocktailCard'

const Home = ({ openModal, handleDelete, cocktails, setCocktails }) => {
  const [fetchError, setFetchError] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

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
  }, [orderBy, setCocktails])

  return (
    <div className='page'>
      {fetchError && <p>{fetchError}</p>}
      {cocktails && (
        <div className='cocktails'>
          <div className='order-by'>
            <label for='order-by'>Order by:</label>
            <select
              className='select-order'
              name='order-by'
              id='order-by'
              onChange={(e) => setOrderBy(e.target.value)}
              value={orderBy}
            >
              <option value='created_at'>Most recent</option>
              <option value='name'>Name</option>
              <option value='rating'>Rating</option>
            </select>
            {/* <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>
              Time Created
            </button>
            <button onClick={() => setOrderBy('name')}>Name</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
            {orderBy} */}
          </div>
          <div className='cocktail-grid'>
            {cocktails.map((cocktail) => (
              <CocktailCard
                cocktail={cocktail}
                key={cocktail.id}
                onDelete={handleDelete}
                openModal={openModal}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
