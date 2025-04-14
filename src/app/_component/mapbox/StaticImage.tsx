"use client";

import React from "react";

const StaticMapImage = () => {
  const MAPBOX_TOKEN =
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  // 중심 좌표 및 스타일
  const lng = 127.0304;
  const lat = 37.4911;
  const zoom = 15;
  const bearing = 0;
  const pitch = 45;

  const width = 600;
  const height = 400;

  const style = "mapbox/streets-v11";

  const staticMapUrl = `https://api.mapbox.com/styles/v1/${style}/static/${lng},${lat},${zoom},${bearing},${pitch}/${width}x${height}@2x?access_token=${MAPBOX_TOKEN}`;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>정적 지도 이미지 (Mapbox Static Images API)</h2>
      <img
        src={staticMapUrl}
        alt='Static Map from Mapbox'
        style={{ maxWidth: "100%", borderRadius: "12px" }}
      />
    </div>
  );
};

export default StaticMapImage;
