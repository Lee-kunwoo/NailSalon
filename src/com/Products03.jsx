import React from 'react';
import topData from '../data/nailserum.json';
import '../styles/pages.scss';


const Products03 = () => {

  const images = {
    
    // 상품 1: HENNA
    "cuticle.png": require('../assets/cuticle.png'), 
    
    // 상품 2: 선샤인큐티클오일
    "cuticle_sunshine.jpg": require('../assets/cuticle_sunshine.jpg'), 
    
    // 상품 3: 셀리 큐티클 오일
    "cuticleoil.webp": require('../assets/cuticleoil.webp'), // assets 폴더의 파일명과 일치시켜 수정 (cutitleoil.webp)
    
    // 상품 4: 카렌큐티클오일
    "cuticle_karen.webp": require('../assets/cuticle_karen.webp'), 
  };
  // ---------------------------------------------------------------- 

  return (
    <div className='page nailserum'>
      <h1>NAILSERUM</h1>
      <div className='outBox'>
        {
          topData.map(item=>(
            <div key={item.id} className='inBox'>
              {/* [수정된 부분 3] item.img 대신 매핑된 이미지 변수를 사용 */}
              <img src={images[item.img]} alt={item.name} /> 
              <h3>{item.name}</h3>
              <h2>{item.price}원</h2>
            </div>
          ))
        }
      </div>
    </div>
  );
}


export default Products03;
