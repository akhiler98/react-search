import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'


import SearchInput from './SearchInput'


function App() {
  

  return (
    <>
     
       
       <BrowserRouter>
       <Routes>
          
          
          <Route path="/" element={<SearchInput />} />
       </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
