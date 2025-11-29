import React, { useEffect, useState } from 'react';
import '../styles/kkomap.scss';

const ShopLocation = () => {
    const [coords, setCoords] = useState(null);
    const address = "경기 안산시 상록구 용신로 381 신영빌딩";

    useEffect(() => {
        // [수정] REST_API_KEY 변수 선언 제거 (미사용 변수 경고 해결)
        
        // 주소를 좌표로 변환하기 위한 REST API 호출
        fetch(
            `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
            {
                method: 'GET',
                headers: {
                    // API 키는 문자열로 직접 사용
                    Authorization: 'KakaoAK 6f4093feb4acab4e88c30dc815659689', 
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.documents && data.documents.length > 0) {
                    const first = data.documents[0];
                    // 응답에서 x는 경도, y는 위도
                    setCoords({ x: parseFloat(first.x), y: parseFloat(first.y) });
                } else {
                    console.error('좌표 변환 결과가 없습니다. 주소를 확인해주세요.');
                }
            })
            .catch((error) => {
                console.error('주소 좌표 변환 API 호출 에러:', error);
            });
    }, [address]); // address가 변경될 때마다 재실행

    useEffect(() => {
        if (!coords) return;

        // 카카오 지도 SDK 스크립트 로드
        if (!window.kakao) {
            const script = document.createElement('script');
            script.src =
                'https://dapi.kakao.com/v2/maps/sdk.js?appkey=80d68b9c1c97f9edd72ef5e13725bb51&autoload=false'; 
            script.async = true;
            document.head.appendChild(script);
            script.onload = () => {
                window.kakao.maps.load(() => initializeMap());
            };
        } else {
            window.kakao.maps.load(() => initializeMap());
        }

        function initializeMap() {
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(coords.y, coords.x),
                level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);

            // 해당 좌표에 마커 표시
            new window.kakao.maps.Marker({
                map: map,
                position: new window.kakao.maps.LatLng(coords.y, coords.x),
            });
        }
    }, [coords]); // coords가 설정되거나 변경될 때마다 재실행

    return (
        <div>
            <h2>JUNGWON-NAILART SHOP</h2> 
            {/* [정리] 지도의 크기는 #map 스타일에서 정의되므로 내부의 불필요한 div 제거 */}
            <div id='map' style={{ width: '700px', height: '600px' }}>
                {/* 지도가 여기에 로드됩니다. */}
            </div>
        </div>
    );
};

export default ShopLocation;