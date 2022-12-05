import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useGetOneCocktailQuery,
  useUpdateCocktailMutation,
} from '../redux/features/api/apiSlice'

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [updateCocktail] = useUpdateCocktailMutation()
  const { data, isLoading, isSuccess } = useGetOneCocktailQuery(id)

  const [name, setName] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !method || !rating) {
      setFormError('Please fill in all the fields correctly')
      return
    }
    try {
      await updateCocktail({ name, method, rating, id }).unwrap()
      setFormError(null)
      navigate('/')
    } catch (err) {
      setFormError('Please fill in all the fields correctly')
    }
  }

  useEffect(() => {
    const setCocktail = async () => {
      const cocktail = await data
      if (isSuccess) {
        setName(cocktail.name)
        setMethod(cocktail.method)
        setRating(cocktail.rating)
      }
    }
    setCocktail()
  }, [data, isSuccess])

  if (isLoading) return <p>Loading...</p>
  if (!data) {
    return (
      <section>
        <h2>Cocktail not found!</h2>
      </section>
    )
  }
  return (
    <div className='page update'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor='method'>Method:</label>
        <textarea
          id='method'
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor='rating'>Rating:</label>
        <input
          type='number'
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Cocktail Recipe</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default Update
