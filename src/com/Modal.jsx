import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/modal.scss';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* 모바일 메뉴 버튼 */}
      <button className="menu-btn" onClick={openMenu}>
        ☰ 메뉴
      </button>

      {/* 모달 배경 (클릭 시 닫힘) */}
      <div 
        className={`modal-overlay ${isOpen ? 'open' : ''}`} 
        onClick={closeMenu}
      ></div>

      {/* 모달 메뉴 */}
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeMenu}>
          닫기
        </button>
        <ul className="menu">
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/Cuticle" onClick={closeMenu}>Cuticle</Link></li>
          <li><Link to="/Handcream" onClick={closeMenu}>Handcream</Link></li>
          <li><Link to="/Nailhardener" onClick={closeMenu}>Nailhardener</Link></li>
          <li><Link to="/Nailserum" onClick={closeMenu}>Nailserum</Link></li>
          <li><Link to="/SalonLocation" onClick={closeMenu}>SalonLocation</Link></li>
        </ul>
      </div>
    </>
  );
};

export default MobileMenu;
