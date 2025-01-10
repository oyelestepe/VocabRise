import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hompage from './pages/Homepage'
import Faq from './pages/Faq';
import Privacy from './pages/Privacy';
import Testimonials from './pages/Testimonials';
import HowItWorks from './pages/HowItWorks';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Hompage/>}/>
    <Route path='/faq' element={<Faq/>}/>
    <Route path='/privacypolicy' element={<Privacy/>}/>
    <Route path='/testimonail' element={<Testimonials/>}/>
    <Route path='/howitworks' element={<HowItWorks/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/signup' element={<SignupPage/>}/>
    </Routes>
        
    </BrowserRouter>
  )
}

export default App