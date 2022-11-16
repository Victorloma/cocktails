import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update'

import CocktailModal from './components/CocktailModal'
import Logo from './cover.png'

function App() {
  const { showModal } = useSelector((state) => state.modal)

  return (
    <BrowserRouter>
      {showModal && <CocktailModal />}
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
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/:id' element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
