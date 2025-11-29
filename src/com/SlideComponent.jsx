import React, { useRef, useEffect, useState, useCallback } from 'react';
import '../styles/SlideComponent.scss';

// [이미지 경로] (생략)
import nail1 from '../assets/nail_01.png'; import nail2 from '../assets/nail_02.png'; import nail3 from '../assets/nail_03.png'; import nail4 from '../assets/nail_04.png'; import nail5 from '../assets/nail_05.png'; import nail6 from '../assets/nail_06.png'; import nail7 from '../assets/nail_07.png'; import nail8 from '../assets/nail_08.png'; import nail9 from '../assets/nail_09.png'; import nail10 from '../assets/nail_10.png'; import nail11 from '../assets/nail_11.png'; import nail12 from '../assets/nail_12.png'; 

import arrowLeft from '../assets/arrow_left.png';
import arrowRight from '../assets/arrow_right.png';

const slideImages = [
    { id: 1, src: nail1, alt: "네일 아트 1" },
    { id: 2, src: nail2, alt: "네일 아트 2" },
    { id: 3, src: nail3, alt: "네일 아트 3" },
    { id: 4, src: nail4, alt: "네일 아트 4" },
    { id: 5, src: nail5, alt: "네일 아트 5" },
    { id: 6, src: nail6, alt: "네일 아트 6" },
    { id: 7, src: nail7, alt: "네일 아트 7" },
    { id: 8, src: nail8, alt: "네일 아트 8" },
    { id: 9, src: nail9, alt: "네일 아트 9" },
    { id: 10, src: nail10, alt: "네일 아트 10" },
    { id: 11, src: nail11, alt: "네일 아트 11" },
    { id: 12, src: nail12, alt: "네일 아트 12" },
];

const TOTAL_IMAGES = slideImages.length; // 12

const SlideComponent = () => {
    const slideBoxRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    const isSlidingRef = useRef(false);
    
    const touchStartXRef = useRef(0);
    const touchEndXRef = useRef(0);

    const slidesData = slideImages; 
    
    useEffect(() => {
        const slideBox = slideBoxRef.current;
        if (!slideBox || slideBox.children.length === 0) return; 

        slideBox.style.transition = 'none';
        slideBox.style.transform = `translateX(0px)`;
    }, []); 

    const moveSlide = useCallback((direction) => {
        if (isSlidingRef.current) return;
        
        const slideBox = slideBoxRef.current;
        if (!slideBox) return;

        isSlidingRef.current = true;

        // [핵심 로직] 이동 단위 결정: PC(>1024px)는 3장, 모바일/태블릿은 1장
        const IS_PC_MODE = window.innerWidth > 1024;
        const MOVE_UNIT = IS_PC_MODE ? 3 : 1; 
        
        const slideItemWidth = slideBox.children[0].offsetWidth; 
        let newIndex = currentImageIndex;

        if (direction === 'left') {
            newIndex = (currentImageIndex - MOVE_UNIT + TOTAL_IMAGES) % TOTAL_IMAGES;
        } else if (direction === 'right') {
            newIndex = (currentImageIndex + MOVE_UNIT) % TOTAL_IMAGES;
        }

        const moveDistance = newIndex * slideItemWidth;
        
        slideBox.style.transition = 'transform 0.3s ease'; 
        slideBox.style.transform = `translateX(-${moveDistance}px)`;

        setTimeout(() => {
            isSlidingRef.current = false;
            setCurrentImageIndex(newIndex);
        }, 300);
    }, [currentImageIndex]);


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault(); 
                moveSlide('left');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault(); 
                moveSlide('right');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [moveSlide]); 

    const handleTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const touchStart = touchStartXRef.current;
        const touchEnd = touchEndXRef.current;
        
        const minSwipeDistance = 50;
        
        if (touchStart - touchEnd > minSwipeDistance) {
            moveSlide('right');
        }
        
        if (touchEnd - touchStart > minSwipeDistance) {
            moveSlide('left');
        }
    };
    
    // ----------------------------------------------------------------
    // [페이지네이션 계산 로직]
    const IS_PC_MODE = typeof window !== 'undefined' && window.innerWidth > 1024;
    const PC_MOVE_UNIT = 3;
    
    let displayTotal;
    let displayCurrent;

    if (IS_PC_MODE) {
        // PC 모드: 3장씩 이동하므로 총 페이지는 4개 (12 / 3)
        displayTotal = TOTAL_IMAGES / PC_MOVE_UNIT; 
        // 현재 페이지: 현재 이미지 인덱스 / 3 (0, 3, 6, 9) + 1
        displayCurrent = Math.floor(currentImageIndex / PC_MOVE_UNIT) + 1;
    } else {
        // 반응형 모드: 1장씩 이동하므로 총 페이지는 12개
        displayTotal = TOTAL_IMAGES;
        displayCurrent = currentImageIndex + 1;
    }
    // ----------------------------------------------------------------


    return (
        <section className="sp1-sec1">
            <div>네일아트</div>
            <div className="sp1-sec1-img-Box-bg">
                <ul 
                    className="sp1-sec1-img-Box" 
                    ref={slideBoxRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {
                        slidesData.map((item) => (
                            <li key={item.id}>
                                <img src={item.src} alt={item.alt} />
                            </li>
                        ))
                    }
                </ul>
                <button 
                    className="sp-slide-left" 
                    onClick={() => moveSlide('left')}
                >
                    <img src={arrowLeft} alt="이전" />
                </button>
                <button 
                    className="sp-slide-right" 
                    onClick={() => moveSlide('right')}
                >
                    <img src={arrowRight} alt="다음" />
                </button>
                
                {/* [수정] 페이지 인디케이터: 조건부 계산된 값을 사용 */}
                <div className="sp-page-indicator">
                    {displayCurrent} / {displayTotal}
                </div>
            </div>
        </section>
    );
};

export default SlideComponent;