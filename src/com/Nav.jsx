import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/style.scss'

const Nav = () => {
  return (
    <div className='Nav'>
        <ul>
            <li><Link to="/" end>Home</Link></li>
            <li><Link to="/Cuticle">Cuticle</Link></li>
            <li><Link to="/Handcream">Handcream</Link></li>
            <li><Link to="/Nailhardener">Nailhardener</Link></li>
            <li><Link to="/Nailserum">Nailserum</Link></li>
            <li><Link to="/SalonLocation">SalonLocation</Link></li>
        </ul>
    </div>
  )
}

export default Nav