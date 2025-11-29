import React from "react";
import Slider from '../com/Slider.jsx';
import TextTyping from '../com/TextTyping.jsx';
import VideoSection from "../com/VideoSection.jsx";
import OurBrand from "../com/OurBrand.jsx";
import SlideComponent from "../com/SlideComponent.jsx";
import Footer from '../com/Footer.jsx';

import "../styles/slider.scss"; // 슬라이더 스타일 적용
import "../styles/TextTyping.scss"; // SCSS 파일 연결
import "../styles/VideoSection.scss";
import "../styles/OurBrand.scss";
import "../styles/SlideComponent.scss";

// ----------------------------------------------------------------
// [수정된 부분 1] Home 함수가 props를 구조 분해 할당으로 받도록 변경
function Home({ shopImage01, shopImage02 }) {
// ----------------------------------------------------------------
  return (
    <div>
      {/* [수정된 부분 2] 받은 이미지 props를 Slider 컴포넌트로 다시 전달
      (Slider 컴포넌트가 메인 이미지를 보여주는 역할을 한다고 가정)
      */}
      <Slider 
          shopImage01={shopImage01} 
          shopImage02={shopImage02} 
      /> 
      <TextTyping />
      <VideoSection />
      <OurBrand />
      <SlideComponent /> 
      <Footer />
    </div>
  );
}

export default Home;