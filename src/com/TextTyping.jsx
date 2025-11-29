import React, { useEffect, useState, useRef } from "react";
import "../styles/TextTyping.scss";

const TextTyping = () => {
    const [scrollY, setScrollY] = useState(window.pageYOffset);
    const textBoxRef = useRef(null);
    
    // [복원] 요소 위치 계산을 위한 state 복원
    const [elementTop, setElementTop] = useState(0);
    const [elementHeight, setElementHeight] = useState(0); 
    
    // [함수 정의] 요소의 위치와 높이를 계산하는 함수
    const calculateElementPosition = () => {
        if (textBoxRef.current) {
            const rect = textBoxRef.current.getBoundingClientRect();
            // 뷰포트 기준 위치 + 스크롤 위치 = 문서 상단 기준 위치
            const topPosition = rect.top + window.pageYOffset;
            setElementTop(topPosition);
            setElementHeight(rect.height);
        }
    };


    useEffect(() => {
        // [복원] 컴포넌트 마운트 시 위치 계산
        calculateElementPosition();

        const handleScroll = () => {
            setScrollY(window.pageYOffset);
        };

        window.addEventListener("scroll", handleScroll);
        
        // [복원] 윈도우 리사이즈 시 위치 재계산 (반응형에서 필수)
        window.addEventListener("resize", calculateElementPosition);
        
        // 초기 로딩 후 위치를 한 번 더 계산 (이미지 로딩 후 위치가 바뀔 수 있음)
        setTimeout(calculateElementPosition, 500);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", calculateElementPosition);
        };
    }, []); // 빈 배열: 마운트 시 한 번만 실행

    // 진행률 계산 함수
    const calWidth = (scroll, start, end) => {
        if (scroll < start) return 0;
        if (scroll > end) return 100;
        return ((scroll - start) / (end - start)) * 100;
    };

    // ----------------------------------------------------------------
    // [복원] 애니메이션 시작/끝 지점을 요소의 위치를 기반으로 계산
    const windowHeight = window.innerHeight;
    
    // 타이핑 시작: 요소가 화면 하단에서 보이기 시작할 때 (windowHeight)
    const startTyping = elementTop - windowHeight + 100; // 화면 하단에서 100px 위에 보일 때 시작
    
    // 타이핑 완료: 요소가 화면 상단으로 사라지기 직전
    const endTyping = elementTop + elementHeight - 400; // 요소 높이 400px 남았을 때 완료
    
    // ----------------------------------------------------------------
    
    const totalRange = endTyping - startTyping;
    
    // 각 텍스트별 구간 (3등분)
    const segment = totalRange / 3;

    const thresholds = {
        first: { 
            start: startTyping, 
            end: startTyping + segment 
        },
        second: { 
            start: startTyping + segment, 
            end: startTyping + segment * 2 
        },
        third: { 
            start: startTyping + segment * 2, 
            end: endTyping 
        }
    };

    return (
        <div id="TextoutBox" ref={textBoxRef}>
            <div className="text">
                <span>신뢰와</span>
                <p style={{ width: `${calWidth(scrollY, thresholds.first.start, thresholds.first.end)}%` }}>
                    신뢰와
                </p>
            </div>
            <div className="text">
                <span>열정! 네일아트</span>
                <p style={{ width: `${calWidth(scrollY, thresholds.second.start, thresholds.second.end)}%` }}>
                    열정! 네일아트
                </p>
            </div>
            <div className="text">
                <span>미래를 선도합니다</span>
                <p style={{ width: `${calWidth(scrollY, thresholds.third.start, thresholds.third.end)}%` }}>
                    미래를 선도합니다
                </p>
            </div>
        </div>
    );
};

export default TextTyping;