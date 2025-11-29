import React from 'react';
import '../styles/style.scss';

// ----------------------------------------------------------------
// [수정된 부분 1] 로컬 assets 폴더에서 이미지 파일을 import
import LogoImage from '../assets/Logo_resized.webp';
// ----------------------------------------------------------------

const Head = () => {
  return (
    <div className='headoutbox'>
      {/* ---------------------------------------------------------------- */}
      {/* [수정된 부분 2] import한 이미지 변수를 style 속성에 적용 */}
      <div 
        className="logo" 
        style={{ backgroundImage: `url(${LogoImage})` }}
      ></div>
      {/* ---------------------------------------------------------------- */}
      <div className="topLogo">JungwonNailArt</div>
      <div className='message'>정원네일아트는 고객과의 만남을 소중히 합니다.</div>
    </div>
  );
};

export default Head;