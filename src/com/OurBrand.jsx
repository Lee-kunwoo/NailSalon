import React, { useEffect, useRef } from 'react';
import '../styles/OurBrand.scss';

// ----------------------------------------------------------------
// [수정된 부분 1] 로컬 assets 폴더에서 필요한 이미지 파일들을 import
import CuticleImage from '../assets/cuticle.webp';
import HandcreamImage from '../assets/handcream.webp';
import NailhardenerImage from '../assets/nailhardener.webp';
import NailserumImage from '../assets/nailserum.webp';
// ----------------------------------------------------------------

const OurBrand = () => {
  const ourBrandRef = useRef(null);

  useEffect(() => {
    // ... 기존 useEffect 로직 유지 (스크롤 애니메이션) ...
    const ourBrandEl = ourBrandRef.current;
    if (!ourBrandEl) return;

    const innerDiv = ourBrandEl.querySelector('div'); // 카드들을 감싸는 div

    const handleScroll = () => {
      const ourBrandTop = ourBrandEl.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      if (ourBrandTop <= viewportHeight && ourBrandTop >= 0) {
        innerDiv.classList.add('active');
      } else {
        innerDiv.classList.remove('active');
      }
    };

    let yPrev = window.pageYOffset || document.documentElement.scrollTop;

    const handleTouchStart = () => {
      yPrev = window.pageYOffset || document.documentElement.scrollTop;
    };

    const handleTouchEnd = () => {
      const yCurrent = window.pageYOffset || document.documentElement.scrollTop;
      const deltaY = yCurrent - yPrev;
      if (deltaY > 20 && yCurrent > 200) {
        innerDiv.classList.add('active');
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);


  return (
    <div id="our_brand" ref={ourBrandRef}>
      <section>
        <h2>OUR BRAND VALUE</h2>
        <div>
          <section>
            <h3>CUTICLE</h3>
            {/* [수정된 부분 2] import한 변수로 src 교체 */}
            <img src={CuticleImage} alt="Cuticle Product" />
          </section>
          <section>
            <h3>HANDCREAM</h3>
            {/* [수정된 부분 2] import한 변수로 src 교체 */}
            <img src={HandcreamImage} alt="Handcream Product" />
          </section>
          <section>
            <h3>NAILHARDENER</h3>
            {/* [수정된 부분 2] import한 변수로 src 교체 */}
            <img src={NailhardenerImage} alt="Nailhardener Product" />
          </section>
          <section>
            <h3>NAILSERUM</h3>
            {/* [수정된 부분 2] import한 변수로 src 교체 */}
            <img src={NailserumImage} alt="Nailserum Product" />
          </section>
        </div>
      </section>
    </div>
  );
};

export default OurBrand;