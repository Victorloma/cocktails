import React from 'react'
import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const CocktailCard = ({ cocktail, onDelete }) => {
    
    const handleDelete = async() => {
        const {data, error} = await supabase
            .from('cocktails')
            .delete()
            .eq('id', cocktail.id)
            .select()

        if(error){
            console.log(error)
        }
        if(data){
            console.log(data)
            onDelete(cocktail.id)
        }
    }

    return (
        <div className='cocktail-card'>
            <img classname='cocktail-card-img' src={cocktail.img} alt='One good looking cocktail'/>
            <h3>{cocktail.name}</h3>
            <p>{cocktail.method}</p>
            <div className="rating">{cocktail.rating}</div>
            <div className="buttons">
                <Link to={`/${cocktail.id}`}>
                    <i className='material-icons'>edit</i>
                </Link>
                <i className='material-icons' onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}

export default CocktailCard
