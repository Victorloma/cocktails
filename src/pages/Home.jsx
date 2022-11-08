import supabase from "../config/supabaseClient"
import { useEffect, useState } from 'react'

import CocktailCard from "../components/CocktailCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [cocktails, setCocktails] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setCocktails(prevCocktails=> {
      return prevCocktails.filter(cocktail=> cocktail.id !== id)
    })
  }

  useEffect(() => {
    const fetchCocktails = async () => {
      const { data, error } = await supabase
        .from('cocktails')
        .select()
        .order(orderBy, {ascending: false})

      if (error) {
        setFetchError('Could not fetch the cocktails =(')
        setCocktails(null)
        console.log(error)
      }
      if (data) {
        setCocktails(data)
        setFetchError(null)
      }
    }

    fetchCocktails()
  }, [orderBy])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {cocktails && (
        <div className="cocktails">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={()=>setOrderBy('created_at')}>Time Created</button>
            <button onClick={()=>setOrderBy('name')}>Name</button>
            <button onClick={()=>setOrderBy('rating')}>Rating</button>
            {orderBy}
          </div>
          <div className="cocktail-grid">
            {cocktails.map(cocktail => (
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

export default Home;