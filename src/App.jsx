import { Routes, Route } from 'react-router-dom'
import Zeta from './pages/Zeta'
import Alpha from './pages/Alpha/index'

export default function App() {
  return (
    <Routes>
        <Route index element={<Zeta />} />
        <Route path="alpha" element={<Alpha />} />
    </Routes>
  )
}