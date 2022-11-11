import { Link } from 'react-router-dom'

const CocktailCard = ({ cocktail, onDelete, openModal }) => {
  return (
    <div className='cocktail-card' onClick={() => openModal(cocktail)}>
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
        <i className='material-icons' onClick={() => onDelete(cocktail.id)}>
          delete
        </i>
      </div>
    </div>
  )
}

export default CocktailCard
