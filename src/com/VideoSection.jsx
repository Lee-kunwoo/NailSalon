import React, { useEffect, useRef, useState } from 'react';
import '../styles/VideoSection.scss';

const VideoSection = () => {
    const bgChangeRef = useRef(null);
    const movieRef = useRef(null);
    const [hide, setHide] = useState(true);
    const [topPrev, setTopPrev] = useState(window.scrollY);
    const movieTopRef = useRef(0);
    const touchStartY = useRef(0);
  
    useEffect(() => {
      if (movieRef.current) {
        const rect = movieRef.current.getBoundingClientRect();
        movieTopRef.current = Math.trunc(rect.top + window.scrollY) - 300;
      }
  
      const handleWheel = (e) => {
        const topNow = window.scrollY;
        const delta = topNow - topPrev;
  
        if (topNow > 100 && delta > 0 && hide && bgChangeRef.current) {
          bgChangeRef.current.classList.remove('hide');
        }
        if (topNow > 300 && delta > 0 && hide && movieRef.current) {
          const videoEl = movieRef.current.querySelector('video');
          if (videoEl) {
            videoEl.classList.add('big');
          }
          setHide(false);
        }
        else if (topNow <= movieTopRef.current && delta < 0 && !hide && bgChangeRef.current && movieRef.current) {
          const videoEl = movieRef.current.querySelector('video');
          if (videoEl) {
            videoEl.classList.remove('big');
          }
          bgChangeRef.current.classList.add('hide');
          setHide(true);
        }
        setTopPrev(topNow);
      };
  
      const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
      };
  
      const handleTouchEnd = (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY;
        const currentScroll = window.scrollY;
  
        if (currentScroll > 100 && deltaY > 30 && hide && bgChangeRef.current) {
          bgChangeRef.current.classList.remove('hide');
        }
        if (currentScroll > 300 && deltaY > 30 && hide && movieRef.current) {
          const videoEl = movieRef.current.querySelector('video');
          if (videoEl) {
            videoEl.classList.add('big');
          }
          setHide(false);
        } else if (currentScroll <= movieTopRef.current && deltaY < -30 && !hide && bgChangeRef.current && movieRef.current) {
          const videoEl = movieRef.current.querySelector('video');
          if (videoEl) {
            videoEl.classList.remove('big');
          }
          bgChangeRef.current.classList.add('hide');
          setHide(true);
        }
        setTopPrev(currentScroll);
      };
  
      window.addEventListener('wheel', handleWheel);
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchend', handleTouchEnd);
  
      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }, [topPrev, hide]);
  
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
              <source src="https://lee-kunwoo.github.io/nailart/video/20250224_1209_Fairy Nail Magic_simple_compose_01jmtywkm7efcvdzaktjn6h844.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
    );
  };
  
  export default VideoSection;