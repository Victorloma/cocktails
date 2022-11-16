import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setShowModal } from '../redux/features/modalSlice'
import { useDeleteOneCocktailMutation } from '../redux/features/api/apiSlice'

const CocktailModal = ({ onDelete }) => {
  const dispatch = useDispatch()
  const showModal = useSelector((state) => state.modal.showModal)

  const [deleteCocktail] = useDeleteOneCocktailMutation()

  const handleDelete = () => {
    deleteCocktail(showModal.id)
    dispatch(setShowModal(false))
  }
  return (
    <div
      className='modal-overlay'
      onClick={() => dispatch(setShowModal(false))}
    >
      <div
        className='modal-container'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <span
          className='modal-close-btn'
          onClick={() => dispatch(setShowModal(false))}
        >
          &times;
        </span>
        <img src={showModal.img} alt='One good looking cocktail' />
        <span className='modal-header'>
          <h3>{showModal.name}</h3>
          <div className='modal-rating'>{showModal.rating}</div>
        </span>
        <p>{showModal.method}</p>

        <div className='modal-buttons'>
          <Link to={`/${showModal.id}`}>
            <i
              className='modal-button material-icons'
              onClick={() => dispatch(setShowModal(false))}
            >
              edit
            </i>
          </Link>
          <i
            className='modal-button material-icons'
            onClick={() => handleDelete()}
          >
            delete
          </i>
        </div>
      </div>
    </div>
  )
}

export default CocktailModal
