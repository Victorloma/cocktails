import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCocktail } from '../services/cocktails.service'

const Create = () => {
  const navigate = useNavigate()
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
      await createCocktail(name, method, rating)
      setFormError(null)
      navigate('/')
    } catch (err) {
      setFormError('Please fill in all the fields correctly')
    }
  }

  return (
    <div className='page create'>
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

        <button>Create Cocktail Recipe</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default Create
