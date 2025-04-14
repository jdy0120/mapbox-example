"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const FlyToRandomExample = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // 랜덤 경도, 위도 생성 함수
  const getRandomCoordinates = () => {
    const randomLongitude = Math.random() * 360 - 180; // -180 ~ 180 범위
    const randomLatitude = Math.random() * 180 - 90; // -90 ~ 90 범위
    return [randomLongitude, randomLatitude];
  };

  // flyTo 호출 함수
  const flyToRandomLocation = () => {
    if (mapRef.current) {
      const [lng, lat] = getRandomCoordinates();
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 3, // 랜덤 위치에 맞게 적절한 줌 레벨 설정
        essential: true, // 애니메이션 필수
      });
      console.log(`FlyTo: [${lng}, ${lat}]`);
    }
  };

  useEffect(() => {
    // 지도 생성
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [127.0304, 37.4911], // 초기 위치
      zoom: 3, // 초기 줌 레벨
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <div
        id='map'
        style={{
          width: "100%",
          height: "100vh",
          marginBottom: "20px",
        }}
      />
      <div style={{ textAlign: "center", padding: "10px" }}>
        <button onClick={flyToRandomLocation}>
          랜덤 위치로 이동
        </button>
      </div>
    </div>
  );
};

export default FlyToRandomExample;
