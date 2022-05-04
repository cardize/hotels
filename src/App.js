import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AddHotel from './AddHotel'
import Hotels from './Hotels'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hotels />} />
        <Route path="/addhotel" element={<AddHotel />} />
      </Routes>
    </Router>
  )
}

export default App
