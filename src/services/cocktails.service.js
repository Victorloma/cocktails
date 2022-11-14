import supabase from '../config/supabaseClient'

export const getAllCocktails = async (orderBy) => {
  const response = await supabase
    .from('cocktails')
    .select()
    .order(orderBy, { ascending: false })

  return response.data
}

export const getOneCocktail = async (id) => {
  const response = await supabase
    .from('cocktails')
    .select()
    .eq('id', id)
    .single()

  return response.data
}

export const createCocktail = async (name, method, rating) => {
  const response = await supabase
    .from('cocktails')
    .insert([{ name, method, rating }])
    .select()

  return response.data
}

export const updateCocktail = async (name, method, rating, id) => {
  const response = await supabase
    .from('cocktails')
    .update({ name, method, rating })
    .eq('id', id)
    .select()

  return response.data
}

export const deleteCocktail = async (cocktailId) => {
  const response = await supabase
    .from('cocktails')
    .delete()
    .eq('id', cocktailId)
    .select()

  return response.data
}
