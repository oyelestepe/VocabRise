import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Button from '@mui/material/Button';
function Navbar() {
  return (
    <>
    <nav className='navbar'>
      <span className='brand'>VOCABRISE</span>
      <div style={{display:'flex'}}>
      <ul className='navbar-ul'>
        <li className='navbar-li'><Link to="/">Home</Link></li>
        <li className='navbar-li'><Link to="/about">About</Link></li>
        <li className='navbar-li'><Link to="/services">Services</Link></li>
      </ul>
      <Button variant="contained" size='small' style={{margin:'5px'}}><Link to="/signup">Sign up</Link></Button>
      <Button variant='contained' size='small' style={{margin:'5px', backgroundColor:'#ececec', color:'black', fontWeight:'bold'}} ><Link to="/login">Log in</Link></Button>
      </div>
    </nav>
    <Outlet />
    </>
  )
}

export default Navbar