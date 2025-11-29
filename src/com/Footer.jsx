import React from "react";
import "../styles/footer.scss"; // SCSS 파일 연결

const Footer = () => {
  return (
    <footer>
      <div className="fobox">
        <div className="fotxt">          
          <div className="footer-line"></div>
        </div>
        <div className="foad">
          <div>이 홈페이지는 학습용으로 개설한 것으로 실제 거래할 수는 없습니다.</div>
          <div className="footer-line"></div>
          
          <div>EMAIL: 2010top@naver.com</div>
          <br />
          <div>copyright (c) Lee Kunwoo all rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
