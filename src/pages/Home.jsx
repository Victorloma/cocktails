import supabase from "../config/supabaseClient"
import { useEffect, useState } from 'react'

import CocktailCard from "../components/CocktailCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [cocktails, setCocktails] = useState(null)

  useEffect(() => {
    const fetchCocktails = async () => {
      const { data, error } = await supabase
        .from('cocktails')
        .select()

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
  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {cocktails && (
        <div className="cocktails">
          <div className="cocktail-grid">
            {cocktails.map(cocktail => (
              <CocktailCard 
                cocktail={cocktail}
                key={cocktail.id}  
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home;