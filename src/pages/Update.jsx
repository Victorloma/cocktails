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
      <h2>Update - {id} </h2>
    </div>
  )
}

export default Update