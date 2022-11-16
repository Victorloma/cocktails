import { useDispatch } from 'react-redux'
import { setShowModal } from '../redux/features/modalSlice'
import { useDeleteOneCocktailMutation } from '../redux/features/api/apiSlice'
import { Link } from 'react-router-dom'

const CocktailCard = ({ cocktail, onDelete, openModal }) => {
  const dispatch = useDispatch()

  const [deleteCocktail] = useDeleteOneCocktailMutation()

  return (
    <div
      className='cocktail-card'
      onClick={() => dispatch(setShowModal(cocktail))}
    >
      <img
        className='cocktail-card-img'
        src={cocktail.img}
        alt='One good looking cocktail'
      />
      <h3>{cocktail.name}</h3>
      <p>{cocktail.method}</p>
      <div className='rating'>{cocktail.rating}</div>
      <div
        className='buttons'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Link to={`/${cocktail.id}`}>
          <i className='material-icons'>edit</i>
        </Link>
        <i
          className='material-icons'
          onClick={() => deleteCocktail(cocktail.id)}
        >
          delete
        </i>
      </div>
    </div>
  )
}

export default CocktailCard
