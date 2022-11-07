import React from 'react'

const CocktailCard = ({ cocktail }) => {
    return (
        <div className='cocktail-card'>
            <h3>{cocktail.name}</h3>
            <p>{cocktail.method}</p>
            <div className="rating">{cocktail.rating}</div>
        </div>
    )
}

export default CocktailCard
