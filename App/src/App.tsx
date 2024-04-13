import './App.css'
import Landing from './components/Landing'
import Mainpage from './components/Mainpage'
import Forum from './components/Forum'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/Mainpage' element={<Mainpage/>}/>
          <Route path="/Forum" element={<Forum/>}/>
          </Routes>
    </>
  )
}

export default App
