import { useState } from 'react'
import { useGetAllCocktailsQuery } from '../redux/features/api/apiSlice'
import CocktailCard from '../components/CocktailCard'

const Home = ({ openModal, handleDelete }) => {
  const [fetchError, setFetchError] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const { data: cocktails, error } = useGetAllCocktailsQuery(orderBy)

  if (error) {
    setFetchError(error)
  }
  return (
    <div className='page'>
      {fetchError && <p>{fetchError}</p>}
      {cocktails && (
        <div className='cocktails'>
          <div className='order-by'>
            <label htmlFor='order'>Order by:</label>
            <select
              className='select-order'
              name='order-by'
              id='order'
              onChange={(e) => setOrderBy(e.target.value)}
              value={orderBy}
            >
              <option value='created_at'>Most recent</option>
              <option value='name'>Name</option>
              <option value='rating'>Rating</option>
            </select>
          </div>
          <div className='cocktail-grid'>
            {cocktails.map((cocktail) => (
              <CocktailCard
                cocktail={cocktail}
                key={cocktail.id}
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
