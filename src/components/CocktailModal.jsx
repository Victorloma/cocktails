import { Link } from 'react-router-dom'

const CocktailModal = ({ currentModalCocktail, closeModal, onDelete }) => {
  const handleDelete = () => {
    onDelete(currentModalCocktail.id)
    closeModal()
  }
  return (
    <div className='modal-overlay' onClick={() => closeModal()}>
      <div
        className='modal-container'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <span className='modal-close-btn' onClick={() => closeModal()}>
          &times;
        </span>
        <img src={currentModalCocktail.img} alt='One good looking cocktail' />
        <span className='modal-header'>
          <h3>{currentModalCocktail.name}</h3>
          <div className='modal-rating'>{currentModalCocktail.rating}</div>
        </span>
        <p>{currentModalCocktail.method}</p>

        <div className='modal-buttons'>
          <Link to={`/${currentModalCocktail.id}`}>
            <i className='modal-button material-icons'>edit</i>
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
