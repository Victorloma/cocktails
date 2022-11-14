import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { setCocktails } from './redux/features/cocktailsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCocktail } from './services/cocktails.service'

import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update'

import CocktailModal from './components/CocktailModal'
import Logo from './cover.png'

function App() {
  const dispatch = useDispatch()
  const cocktails = useSelector((state) => state.cocktails.value)
  const [showModal, setShowModal] = useState(false)
  const [currentModalCocktail, setCurrentModalCocktail] = useState(null)

  const handleDelete = async (id) => {
    try {
      await deleteCocktail(id)
    } catch (error) {
      alert("Couldn't delete cocktail, try again.")
    }
    dispatch(
      setCocktails((prevCocktails) => {
        return prevCocktails.filter((cocktail) => cocktail.id !== id)
      })
    )
  }

  const openModal = (cocktail) => {
    setCurrentModalCocktail(cocktail)
    setShowModal(true)
  }

  const closeModal = () => {
    setCurrentModalCocktail(null)
    setShowModal(false)
  }
  return (
    <BrowserRouter>
      {showModal && (
        <CocktailModal
          currentModalCocktail={currentModalCocktail}
          closeModal={closeModal}
          onDelete={handleDelete}
        />
      )}
      <nav className='nav'>
        <Link className='nav-link' to='/'>
          <img className='nav-logo' src={Logo} alt='supa logo' />
        </Link>
        <div className='nav-links'>
          <Link className='nav-link' to='/'>
            Home
          </Link>
          <Link className='nav-link' to='/create'>
            Add Cocktail
          </Link>
        </div>
      </nav>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              cocktails={cocktails}
              setCocktails={setCocktails}
              openModal={openModal}
              closeModal={closeModal}
            />
          }
        />
        <Route path='/create' element={<Create />} />
        <Route path='/:id' element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
