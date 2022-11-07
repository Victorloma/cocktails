import React from 'react'
import { Link } from 'react-router-dom'

const CocktailCard = ({ cocktail }) => {
    return (
        <div className='cocktail-card'>
            <h3>{cocktail.name}</h3>
            <p>{cocktail.method}</p>
            <div className="rating">{cocktail.rating}</div>
            <div className="button">
                <Link to={`/${cocktail.id}`}>
                    <i className='material-icons'>edit</i>
                </Link>
            </div>
        </div>
    )
}

export default CocktailCard
