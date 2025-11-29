import React from 'react';
import topData from '../data/handcream.json'; // handcream 데이터 사용
import '../styles/pages.scss';

// ----------------------------------------------------------------
// [수정된 부분 1] ESlint 경고 해결: Products_01 -> Products01
const Products01 = () => {
// ----------------------------------------------------------------

  // ----------------------------------------------------------------
  // [수정된 부분 2] 이미지 경로 수정: JSON 파일의 이미지명을 import한 변수에 매핑
  // Handcream 제품 페이지이므로 handcream.webp 이미지를 가져옵니다.
  // 실제 JSON 데이터는 handcream.json을 사용하지만, 이미지 데이터가 없으므로
  // 예시로 handcream.webp 하나를 사용한다고 가정합니다.
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
    <div className='page handcream'>
      <h1>HANDCREAM</h1>
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

// ----------------------------------------------------------------
// [수정된 부분 4] export default 이름도 Products01로 통일
export default Products01;
// ----------------------------------------------------------------