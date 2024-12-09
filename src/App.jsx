import './App.css'
import Nav from './components/Nav'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'

function App() {

  return (
    <>
        <div className='app'>
             <Nav/>
             <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/coin/:coinId' element={<Coin/>}/>
             </Routes>

        </div>
    </>
  )
}

export default App
