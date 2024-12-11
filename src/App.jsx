import './App.css'
import Nav from './components/Nav/Nav.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
        <div className='app'>
             <Nav/>
             <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/coin/:id' element={<Coin/>}/>
             </Routes>

        </div>
    </>
  )
}

export default App
