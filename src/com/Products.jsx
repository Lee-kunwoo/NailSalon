import React from 'react';
import topData from '../data/cuticle.json'; // cuticle.json 데이터 사용
import '../styles/pages.scss';

const Products = () => {

  // ----------------------------------------------------------------
  // [수정된 부분] JSON 파일에 정의된 모든 이미지 파일을 require를 통해 로드하여 매핑
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
    <div className='page cuticle'>
      <h1>CUTICLE</h1>
      <div className='outBox'>
        {
          topData.map(item=>(
            <div key={item.id} className='inBox'>
              {/* 이미지 파일명이 images 객체에 없으면 src가 undefined가 되어 깨짐 방지 */}
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

// ----------------------------------------------------------------
// [추가 수정] ESlint 경고를 해결하기 위해 컴포넌트 이름은 PascalCase로 통일 (Products01)
// 단, 현재 export는 Products로 되어 있어, Products로 유지하되 ESlint 경고는 인지해야 함
export default Products;
// ----------------------------------------------------------------