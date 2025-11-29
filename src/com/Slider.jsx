import React, { useState, useEffect } from "react";
import "../styles/slider.scss"; // 슬라이더 스타일 적용

// ----------------------------------------------------------------
// [수정된 부분] 
// Slider 컴포넌트가 props를 받도록 구조 변경
const Slider = ({ shopImage01, shopImage02 }) => { 
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// [수정된 부분] 
// slidesData 내부의 bgImage 값을 전달받은 props 변수로 대체
// (이제 Webpack이 처리한 최적화된 경로가 사용됩니다)
  const slidesData = [
    {
      id: 1,
      title: "고객의 마음을 이해하는 정원아트네일",
      content: "JUNGWON NAIL ART",
      bgImage: shopImage01, 
    },
    {
      id: 2,
      title: "No1. Nail Art Creation Company",
      content: "JUNGWON NAIL ART",
      bgImage: shopImage02,
    },
  ];
// ----------------------------------------------------------------

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slidesData.length;

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // 3초마다 변경

    return () => clearInterval(slideInterval); // 컴포넌트 언마운트 시 정리
  }, [totalSlides]);

  return (
    <section className="slider">
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        >
          <div className="overlay">
            <h2 className="title">{slide.title}</h2>
            <p className="content">{slide.content}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Slider;