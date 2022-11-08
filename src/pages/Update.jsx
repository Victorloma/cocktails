import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')

  useEffect(() => {
    const fetchCocktail = async () => {
      const { data, error } = await supabase
        .from('cocktails')
        .select()
        .eq('id', id)
        .single()

        if (error) {
          navigate('/', { replace: true })
        }

        if (data) {
          setName(data.name)
          setMethod(data.method)
          setRating(data.rating)
          console.log(data)
        }
    }

    fetchCocktail()
  }, [id, navigate])
  return (
    <div className="page update">
      <form >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Cocktail Recipe</button>

        {/* {formError && <p className="error">{formError}</p>} */}
      </form>
    </div>
  )
}

export default Update