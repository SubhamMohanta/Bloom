import './App.css'
import Landing from './components/Landing'
import Mainpage from './components/Mainpage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/Mainpage' element={<Mainpage/>}/>
          </Routes>
    </>
  )
}

export default App
