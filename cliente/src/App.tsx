import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Cadastro from './pages/cadastro'
import Dashboard from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      < Routes >
        <Route path="/login" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App