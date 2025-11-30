import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  // ----------------------------------------------------------------
  // [수정] 로컬 테스트를 위해 basename 속성을 제거합니다.
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // ----------------------------------------------------------------
);