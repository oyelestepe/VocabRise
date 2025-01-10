import React from 'react'
import { Outlet, Link } from "react-router-dom";
function Footer() {
  return (
    <>
    <div className='footer'>
        <ul className='footer-ul'>
            <li className='footer-li'><Link to="" className='footer-a'>Schedule appointment</Link></li>
            <li className='footer-li'><Link to=""  className='footer-a'>Complete intake</Link></li>
            <li className='footer-li'><Link to="/faq" className='footer-a'>FAQ</Link></li>
            <li className='footer-li'><Link to="" className='footer-a'>Resources</Link></li>
            <li className='footer-li'><Link to="/privacypolicy" className='footer-a'>Privacy Policy</Link></li>
        </ul>
    </div>
    <Outlet/>
    </>
  )
}

export default Footer