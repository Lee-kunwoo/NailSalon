import React, { useEffect, useRef, useState } from 'react';
import '../styles/VideoSection.scss';

// ----------------------------------------------------------------
// [수정] 비디오 파일을 import하여 Webpack이 경로를 처리하도록 함
import VideoSource from '../assets/nailsora.mp4';
// ----------------------------------------------------------------

const VideoSection = () => {
    const bgChangeRef = useRef(null);
    const movieRef = useRef(null);
    const [hide, setHide] = useState(true);
    
    const topPrevRef = useRef(window.scrollY); 
    const movieTopRef = useRef(0);
    const touchStartY = useRef(0);

    useEffect(() => {
        // ----------------------------------------------------------------
        // [수정] 초기 위치 계산 로직에 Null 체크 추가
        if (movieRef.current) {
            const rect = movieRef.current.getBoundingClientRect();
            // 비디오 시작 위치 계산
            movieTopRef.current = Math.trunc(rect.top + window.scrollY) - 300; 
        }
        // ----------------------------------------------------------------

        const handleWheel = (e) => {
            const topNow = window.scrollY;
            const delta = topNow - topPrevRef.current; // useRef 사용
            
            setHide(prevHide => {
                let currentHide = prevHide;

                // 스크롤 다운 (delta > 0) 로직
                if (delta > 0) { 
                    if (topNow > 100 && currentHide && bgChangeRef.current) {
                        bgChangeRef.current.classList.remove('hide');
                    }
                    // [수정] movieRef.current 체크를 if 문 바로 뒤에 추가
                    if (topNow > 300 && currentHide && movieRef.current) { 
                        const videoEl = movieRef.current.querySelector('video');
                        if (videoEl) {
                            videoEl.classList.add('big');
                        }
                        currentHide = false;
                    }
                } 
                // 스크롤 업 (delta < 0) 로직
                else if (delta < 0 && !currentHide) { 
                    // [수정] movieRef.current 체크를 if 문 바로 뒤에 추가
                    if (topNow <= movieTopRef.current && bgChangeRef.current && movieRef.current) { 
                        const videoEl = movieRef.current.querySelector('video');
                        if (videoEl) {
                            videoEl.classList.remove('big');
                        }
                        bgChangeRef.current.classList.add('hide');
                        currentHide = true;
                    }
                }

                topPrevRef.current = topNow;
                return currentHide;
            });
        };

        const handleTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY.current - touchEndY;
            const currentScroll = window.scrollY;
            
            setHide(prevHide => {
                let currentHide = prevHide;
                
                if (deltaY > 30) { // 스크롤 다운 (스와이프 업)
                    if (currentScroll > 100 && currentHide && bgChangeRef.current) {
                        bgChangeRef.current.classList.remove('hide');
                    }
                    // [수정] movieRef.current 체크 추가
                    if (currentScroll > 300 && currentHide && movieRef.current) { 
                        const videoEl = movieRef.current.querySelector('video');
                        if (videoEl) {
                            videoEl.classList.add('big');
                        }
                        currentHide = false;
                    }
                } else if (deltaY < -30 && !currentHide) { // 스크롤 업 (스와이프 다운)
                    // [수정] movieRef.current 체크 추가
                    if (currentScroll <= movieTopRef.current && bgChangeRef.current && movieRef.current) { 
                        const videoEl = movieRef.current.querySelector('video');
                        if (videoEl) {
                            videoEl.classList.remove('big');
                        }
                        bgChangeRef.current.classList.add('hide');
                        currentHide = true;
                    }
                }
                
                topPrevRef.current = currentScroll;
                return currentHide;
            });
        };

        window.addEventListener('wheel', handleWheel);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []); 

    return (
        <section id="bgChange" className="hide" ref={bgChangeRef}>
            <div>
                <div className={`sec4Text ${!hide ? 'centered' : ''}`}>
                    <p>
                        NAIL ART
                        <br />
                        CREATION COMPANY
                    </p>
                    <p>고객의 마음을 이해하는 정원네일아트</p>
                </div>
                <div id="movie" ref={movieRef}>
                    <video autoPlay loop muted controls>
                        <source src={VideoSource} type="video/mp4" /> 
                    </video>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;