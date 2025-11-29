import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Head from './com/Head';
import Nav from './com/Nav';
import Modal from './com/Modal';

// ----------------------------------------------------------------
// [수정된 부분] 
// 1. 이미지 파일을 각각 별도의 변수로 import 합니다.
// 2. shop_02 파일의 확장자를 '.webp'로 수정했습니다.
import shopImage01 from './assets/shop_01.webp';
import shopImage02 from './assets/shop_02.webp'; 
// ----------------------------------------------------------------


import Home from './pages/Home';
import Cuticle from './pages/Cuticle';
import Handcream from './pages/Handcream';
import Nailhardener from './pages/Nailhardener';
import Nailserum from './pages/Nailserum';
import SalonLocation from './pages/SalonLocation';


function App() {
  return (
    <div className="App">
      <Head />
      <Nav />
      <Modal />
      <Routes>
          {/* [수정된 부분] Home 컴포넌트에 import한 이미지를 props로 전달합니다. */}
          <Route 
              index 
              element ={<Home shopImage01={shopImage01} shopImage02={shopImage02} />} 
          /> 
          <Route path ='/Cuticle' element ={<Cuticle />} />
          <Route path ='/Handcream' element ={<Handcream />} />
          <Route path ='/Nailhardener' element ={<Nailhardener />} />
          <Route path ='/Nailserum' element ={<Nailserum />} />
          <Route path ='/SalonLocation' element ={<SalonLocation />} />
      </Routes>
    </div>
  );
}

export default App;